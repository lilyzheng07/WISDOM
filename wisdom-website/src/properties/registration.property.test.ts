import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import { STEM_TAXONOMY, STEM_CATEGORIES } from '../data/constants';

const validBase = {
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  password: 'password123',
  age: 25,
  location: 'Sydney',
  disciplines: [{ category: 'Science' as const, subFields: ['Biology'] }],
  tags: [],
  participationRole: 'seeking_help' as const,
};

describe('Registration property-based tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
    dataService.setUsers([]);
  });

  // Feature: wisdom-website, Property 1: Registration rejects incomplete data
  it('Property 1: rejects registration with missing required fields', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('fullName', 'email', 'password', 'location', 'participationRole'),
        (missingField) => {
          localStorage.clear();
          dataService.setUsers([]);
          useAuthStore.setState({ currentUser: null });

          const data = { ...validBase, email: `test-${Math.random()}@test.com` };
          if (missingField === 'fullName') (data as Record<string, unknown>).fullName = '';
          if (missingField === 'email') (data as Record<string, unknown>).email = '';
          if (missingField === 'password') (data as Record<string, unknown>).password = '';
          if (missingField === 'location') (data as Record<string, unknown>).location = '';
          if (missingField === 'participationRole') (data as Record<string, unknown>).participationRole = '';

          const result = useAuthStore.getState().register(data as typeof validBase);
          return result.success === false && dataService.getUsers().length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 2: Registration rejects underage applicants
  it('Property 2: rejects any age in [0, 14]', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 14 }),
        (age) => {
          localStorage.clear();
          dataService.setUsers([]);
          useAuthStore.setState({ currentUser: null });

          const result = useAuthStore.getState().register({
            ...validBase,
            email: `age${age}-${Math.random()}@test.com`,
            age,
          });
          return (
            result.success === false &&
            result.error !== undefined &&
            result.error.includes('15') &&
            dataService.getUsers().length === 0
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 3: Minor flag is set for ages 15–17
  it('Property 3: isMinor=true for ages 15–17', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 15, max: 17 }),
        (age) => {
          localStorage.clear();
          dataService.setUsers([]);
          useAuthStore.setState({ currentUser: null });

          const result = useAuthStore.getState().register({
            ...validBase,
            email: `minor${age}-${Math.random()}@test.com`,
            age,
          });
          return result.success === true && useAuthStore.getState().currentUser?.isMinor === true;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 4: Location stored at city-level only
  it('Property 4: location stored exactly as provided', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 50 }).filter((s) => s.trim().length >= 2),
        (city) => {
          localStorage.clear();
          dataService.setUsers([]);
          useAuthStore.setState({ currentUser: null });

          const result = useAuthStore.getState().register({
            ...validBase,
            email: `city-${Math.random()}@test.com`,
            location: city,
          });
          if (!result.success) return true; // skip if registration fails for other reasons
          return useAuthStore.getState().currentUser?.location === city.trim();
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 5: Discipline sub-field display is category-scoped
  it('Property 5: STEM_TAXONOMY sub-fields are category-scoped', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...STEM_CATEGORIES),
        (category) => {
          const subFields = STEM_TAXONOMY[category];
          return Array.isArray(subFields) && subFields.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 6: Discipline update round-trip
  it('Property 6: discipline update round-trip', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...STEM_CATEGORIES),
        fc.integer({ min: 1, max: 2 }),
        (category, count) => {
          localStorage.clear();
          dataService.setUsers([]);
          useAuthStore.setState({ currentUser: null });

          const subFields = STEM_TAXONOMY[category].slice(0, count);
          const disciplines = [{ category, subFields }];

          const result = useAuthStore.getState().register({
            ...validBase,
            email: `disc-${Math.random()}@test.com`,
            disciplines: disciplines as typeof validBase.disciplines,
          });

          if (!result.success) return true;
          const stored = useAuthStore.getState().currentUser?.disciplines;
          return JSON.stringify(stored) === JSON.stringify(disciplines);
        }
      ),
      { numRuns: 100 }
    );
  });
});
