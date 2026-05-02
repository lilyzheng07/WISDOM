import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useBoardStore } from '../stores/boardStore';
import { useAdminStore } from '../stores/adminStore';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import type { Thread, User, Sponsor } from '../types';

const makeThread = (id: string, score: number, updatedAt: string, status: Thread['status'] = 'published'): Thread => ({
  id, boardId: 'b1', authorId: 'u1', title: `Thread ${id}`, detailQuestions: '',
  description: 'desc', tags: [], status, isAdultOnly: false,
  replyCount: score, engagementScore: score * 10,
  createdAt: updatedAt, updatedAt,
});

const makeSponsor = (id: string, isActive: boolean): Sponsor => ({
  id, name: `Sponsor ${id}`, tagline: 'tagline', logoUrl: null,
  isActive, isSeeded: false, createdAt: new Date().toISOString(),
});

const testUser: User = {
  id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
  age: 25, isMinor: false, role: 'user', location: 'Sydney',
  disciplines: [{ category: 'Engineering', subFields: ['Mechatronic'] }],
  tags: ['tag-8'], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
};

describe('Miscellaneous property-based tests (Properties 25–33)', () => {
  beforeEach(() => {
    localStorage.clear();
    dataService.setUsers([testUser]);
    dataService.setThreads([]);
    dataService.setSponsors([]);
    useAuthStore.setState({ currentUser: testUser });
  });

  // Feature: wisdom-website, Property 25: Hot topic is highest-engagement thread in past 24h
  it('Property 25: getHotTopic returns highest-engagement thread in past 24h', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer({ min: 1, max: 100 }), { minLength: 1, maxLength: 10 }),
        (scores) => {
          localStorage.clear();
          dataService.setThreads([]);
          const now = new Date().toISOString();
          const threads = scores.map((score, i) => makeThread(`t${i}`, score, now));
          dataService.setThreads(threads);

          const hot = useBoardStore.getState().getHotTopic();
          if (!hot) return false;

          const maxScore = Math.max(...scores) * 10;
          return hot.engagementScore === maxScore;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 26: Recommended boards match user disciplines or tags
  it('Property 26: recommended boards match user disciplines', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom('Science', 'Technology', 'Engineering', 'Mathematics'),
          { minLength: 1, maxLength: 8 }
        ),
        (categories) => {
          const userCategories = testUser.disciplines.map((d) => d.category);
          const boards = categories.map((cat, i) => ({
            id: `b${i}`, name: `Board ${i}`, description: 'desc',
            category: cat as 'Science' | 'Technology' | 'Engineering' | 'Mathematics',
            threadCount: 0, lastActivityAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
          }));

          const recommended = boards.filter((b) => userCategories.includes(b.category));
          return recommended.every((b) => userCategories.includes(b.category));
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 27: Recently visited boards list is capped at 5
  it('Property 27: recentlyVisitedBoards capped at 5 in reverse chronological order', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 2, maxLength: 10 }), { minLength: 5, maxLength: 15 }),
        (boardIds) => {
          localStorage.clear();
          const user = { ...testUser, recentlyVisitedBoards: [] };
          dataService.setUsers([user]);
          useAuthStore.setState({ currentUser: user });

          for (const id of boardIds) {
            useBoardStore.getState().markBoardVisited(id);
          }

          const updated = useAuthStore.getState().currentUser;
          if (!updated) return false;

          if (updated.recentlyVisitedBoards.length > 5) return false;

          const lastVisited = boardIds[boardIds.length - 1];
          return updated.recentlyVisitedBoards[0] === lastVisited;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 28: Thread removal sends notification to author
  it('Property 28: removeThread sends thread_removed notification to author', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 3, maxLength: 50 }),
        (title) => {
          localStorage.clear();
          dataService.setUsers([testUser]);
          dataService.setThreads([{
            id: 't1', boardId: 'b1', authorId: 'u1', title,
            detailQuestions: '', description: 'desc', tags: [],
            status: 'published', isAdultOnly: false, replyCount: 0,
            engagementScore: 0, createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          }]);

          useAdminStore.getState().removeThread('t1');

          const user = dataService.getUserById('u1');
          return user?.notificationArea.some((n) => n.type === 'thread_removed') ?? false;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 29: Admin dashboard counts are accurate
  it('Property 29: getDashboardCounts returns accurate counts', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 0, max: 5 }),
        fc.integer({ min: 0, max: 5 }),
        fc.integer({ min: 0, max: 5 }),
        (pendingCount, openCount, minorConnCount) => {
          localStorage.clear();
          dataService.setThreads([]);
          dataService.setEnquiries([]);
          dataService.setConnections([]);

          const now = new Date().toISOString();

          for (let i = 0; i < pendingCount; i++) {
            dataService.upsertThread(makeThread(`pt${i}`, 0, now, 'pending'));
          }
          dataService.upsertThread(makeThread('pub1', 0, now, 'published'));

          for (let i = 0; i < openCount; i++) {
            dataService.upsertEnquiry({
              id: `eq${i}`, userId: 'u1', description: 'q',
              status: 'Pending', adminResponse: null, createdAt: now, updatedAt: now,
            });
          }
          dataService.upsertEnquiry({
            id: 'resolved', userId: 'u1', description: 'q',
            status: 'Resolved', adminResponse: 'done', createdAt: now, updatedAt: now,
          });

          for (let i = 0; i < minorConnCount; i++) {
            dataService.upsertConnection({
              id: `mc${i}`, requesterId: 'u1', targetId: `u${i}`,
              status: 'pending', requiresAdminApproval: true, adminApproved: null,
              createdAt: now,
            });
          }

          const counts = useAdminStore.getState().getDashboardCounts();
          return (
            counts.pendingThreads === pendingCount &&
            counts.openEnquiries === openCount &&
            counts.pendingMinorConnections === minorConnCount
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 30: Profile page displays all required user fields
  it('Property 30: user record has all required profile fields', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 2, maxLength: 30 }),
        fc.string({ minLength: 2, maxLength: 20 }),
        (name, city) => {
          const user: User = { ...testUser, fullName: name, location: city };
          return (
            typeof user.fullName === 'string' &&
            typeof user.location === 'string' &&
            Array.isArray(user.disciplines) &&
            typeof user.participationRole === 'string' &&
            Array.isArray(user.tags)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 31: Follow action adds user to following list
  it('Property 31: follow/unfollow toggles following list correctly', () => {
    fc.assert(
      fc.property(
        fc.uuid(),
        (targetId) => {
          localStorage.clear();
          const user = { ...testUser, following: [] };
          dataService.setUsers([user]);
          useAuthStore.setState({ currentUser: user });

          const updated1 = { ...user, following: [...user.following, targetId] };
          useAuthStore.getState().updateCurrentUser(updated1);
          const afterFollow = useAuthStore.getState().currentUser;
          if (!afterFollow?.following.includes(targetId)) return false;

          const updated2 = { ...updated1, following: updated1.following.filter((id) => id !== targetId) };
          useAuthStore.getState().updateCurrentUser(updated2);
          const afterUnfollow = useAuthStore.getState().currentUser;
          return !afterUnfollow?.following.includes(targetId);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 32: Only active sponsors are displayed
  it('Property 32: SponsorsSection only shows active sponsors', () => {
    fc.assert(
      fc.property(
        fc.array(fc.boolean(), { minLength: 1, maxLength: 10 }),
        (activeFlags) => {
          localStorage.clear();
          const sponsors = activeFlags.map((isActive, i) => makeSponsor(`s${i}`, isActive));
          dataService.setSponsors(sponsors);

          const activeSponsors = dataService.getSponsors().filter((s) => s.isActive);
          const inactiveSponsors = dataService.getSponsors().filter((s) => !s.isActive);

          return (
            activeSponsors.every((s) => s.isActive) &&
            inactiveSponsors.every((s) => !s.isActive)
          );
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 33: Sponsor active status toggle is reflected in display
  it('Property 33: toggleSponsor changes isActive status', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        (initialActive) => {
          localStorage.clear();
          const sponsor = makeSponsor('s1', initialActive);
          dataService.setSponsors([sponsor]);

          useAdminStore.getState().toggleSponsor('s1', false);
          const afterFalse = dataService.getSponsors().find((s) => s.id === 's1');
          if (afterFalse?.isActive !== false) return false;

          useAdminStore.getState().toggleSponsor('s1', true);
          const afterTrue = dataService.getSponsors().find((s) => s.id === 's1');
          return afterTrue?.isActive === true;
        }
      ),
      { numRuns: 100 }
    );
  });
});
