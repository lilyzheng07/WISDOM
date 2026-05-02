import { describe, it, expect, beforeEach } from 'vitest';
import { useEventStore } from './eventStore';
import { useAuthStore } from './authStore';
import { dataService } from '../services/dataService';
import type { Event, User } from '../types';

const futureDate = (daysFromNow: number) => {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().split('T')[0];
};

const makeEvent = (id: string, location: string, date: string): Event => ({
  id, title: `Event ${id}`, type: 'Networking', date, time: '18:00',
  location, description: 'Test event', organiserId: 'user-1',
  createdAt: new Date().toISOString(),
});

describe('eventStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
    dataService.setEvents([]);
  });

  describe('getUpcomingNearby', () => {
    beforeEach(() => {
      dataService.setEvents([
        makeEvent('e1', 'Sydney', futureDate(3)),
        makeEvent('e2', 'Sydney', futureDate(1)),
        makeEvent('e3', 'Melbourne', futureDate(2)),
        makeEvent('e4', 'Sydney', futureDate(7)),
      ]);
    });

    it('returns only events in the specified city', () => {
      const events = useEventStore.getState().getUpcomingNearby('Sydney');
      expect(events.every((e) => e.location === 'Sydney')).toBe(true);
      expect(events).toHaveLength(3);
    });

    it('returns events sorted by date ascending', () => {
      const events = useEventStore.getState().getUpcomingNearby('Sydney');
      for (let i = 1; i < events.length; i++) {
        expect(events[i].date >= events[i - 1].date).toBe(true);
      }
    });

    it('does not include events from other cities', () => {
      const events = useEventStore.getState().getUpcomingNearby('Sydney');
      expect(events.some((e) => e.location === 'Melbourne')).toBe(false);
    });
  });

  describe('addEvent', () => {
    const user: User = {
      id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
      age: 25, isMinor: false, role: 'user', location: 'Sydney',
      disciplines: [], tags: [], participationRole: 'seeking_help',
      following: [], recentlyVisitedBoards: [], notificationArea: [],
      createdAt: new Date().toISOString(),
    };

    beforeEach(() => {
      dataService.setUsers([user]);
      useAuthStore.setState({ currentUser: user });
    });

    const validEvent = {
      title: 'Test Event',
      type: 'Networking' as const,
      date: futureDate(5),
      time: '18:00',
      location: 'Sydney',
      description: 'A test event',
    };

    it('adds a valid event and returns true', () => {
      const result = useEventStore.getState().addEvent(validEvent);
      expect(result).toBe(true);
    });

    it('rejects event with missing title', () => {
      const result = useEventStore.getState().addEvent({ ...validEvent, title: '' });
      expect(result).toBe(false);
    });

    it('rejects event with past date', () => {
      const pastDate = new Date();
      pastDate.setDate(pastDate.getDate() - 1);
      const result = useEventStore.getState().addEvent({
        ...validEvent,
        date: pastDate.toISOString().split('T')[0],
      });
      expect(result).toBe(false);
    });

    it('rejects event with invalid type', () => {
      const result = useEventStore.getState().addEvent({
        ...validEvent,
        type: 'InvalidType' as Event['type'],
      });
      expect(result).toBe(false);
    });
  });
});
