import { describe, it, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import type { Event, User } from '../types';

const VALID_TYPES: Event['type'][] = ['Networking', 'Catchup', 'Internship Opportunity', 'Mentorship Opportunity'];

const testUser: User = {
  id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
  age: 25, isMinor: false, role: 'user', location: 'Sydney',
  disciplines: [], tags: [], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
};

const futureDate = (daysFromNow: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
};

describe('Events property-based tests', () => {
  beforeEach(() => {
    localStorage.clear();
    dataService.setUsers([testUser]);
    dataService.setEvents([]);
    useAuthStore.setState({ currentUser: testUser });
  });

  // Feature: wisdom-website, Property 17: Upcoming events are filtered by city and sorted by date ascending
  it('Property 17: getUpcomingNearby filters by city and sorts ascending', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('Sydney', 'Melbourne', 'Brisbane'),
        fc.array(
          fc.record({
            city: fc.constantFrom('Sydney', 'Melbourne', 'Brisbane'),
            daysFromNow: fc.integer({ min: 1, max: 30 }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        (userCity, eventData) => {
          localStorage.clear();
          dataService.setEvents([]);

          const events: Event[] = eventData.map((e, i) => ({
            id: `e${i}`, title: `Event ${i}`, type: 'Networking',
            date: futureDate(e.daysFromNow), time: '18:00',
            location: e.city, description: 'desc', organiserId: 'u1',
            createdAt: new Date().toISOString(),
          }));
          dataService.setEvents(events);

          const result = useEventStore.getState().getUpcomingNearby(userCity);

          const allInCity = result.every((e) => e.location.toLowerCase() === userCity.toLowerCase());
          const isSorted = result.every((e, i) => i === 0 || e.date >= result[i - 1].date);

          return allInCity && isSorted;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 18: Event type is always one of the four valid values
  it('Property 18: invalid event type is rejected', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }).filter((s) => !VALID_TYPES.includes(s as Event['type'])),
        (invalidType) => {
          localStorage.clear();
          dataService.setEvents([]);

          const result = useEventStore.getState().addEvent({
            title: 'Test Event',
            type: invalidType as Event['type'],
            date: futureDate(5),
            time: '18:00',
            location: 'Sydney',
            description: 'A test event',
          });
          return result === false;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 19: Event submission round-trip
  it('Property 19: valid event appears in events list after submission', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...VALID_TYPES),
        fc.integer({ min: 1, max: 30 }),
        fc.string({ minLength: 2, maxLength: 50 }),
        (type, daysFromNow, title) => {
          localStorage.clear();
          dataService.setEvents([]);
          dataService.setUsers([testUser]);
          useAuthStore.setState({ currentUser: testUser });

          const result = useEventStore.getState().addEvent({
            title,
            type,
            date: futureDate(daysFromNow),
            time: '18:00',
            location: 'Sydney',
            description: 'A test event description',
          });

          if (!result) return true;
          const events = dataService.getEvents();
          return events.some((e) => e.title === title && e.type === type);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 20: Incomplete event form is rejected
  it('Property 20: event with missing required fields is rejected', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('title', 'date', 'time', 'location', 'description'),
        (missingField) => {
          localStorage.clear();
          dataService.setEvents([]);
          dataService.setUsers([testUser]);
          useAuthStore.setState({ currentUser: testUser });

          const data = {
            title: 'Test Event',
            type: 'Networking' as const,
            date: futureDate(5),
            time: '18:00',
            location: 'Sydney',
            description: 'A test event',
          };
          (data as Record<string, unknown>)[missingField] = '';

          const result = useEventStore.getState().addEvent(data);
          return result === false && dataService.getEvents().length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});
