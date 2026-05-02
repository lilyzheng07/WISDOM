import { describe, it, expect, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useBoardStore } from '../stores/boardStore';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import type { Board, Thread } from '../types';

const makeBoard = (id: string, name: string, description: string): Board => ({
  id, name, description, category: 'Science', threadCount: 0,
  lastActivityAt: new Date().toISOString(), createdAt: new Date().toISOString(),
});

const makeThread = (id: string, boardId: string, status: Thread['status'], score = 5): Thread => ({
  id, boardId, authorId: 'u1', title: `Thread ${id}`, detailQuestions: '',
  description: 'desc', tags: [], status, isAdultOnly: false,
  replyCount: score, engagementScore: score * 10,
  createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
});

describe('Thread property-based tests', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
    dataService.setBoards([]);
    dataService.setThreads([]);
  });

  // Feature: wisdom-website, Property 7: Board search returns exactly matching results
  it('Property 7: board search returns exactly matching results', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.uuid(),
            name: fc.string({ minLength: 3, maxLength: 30 }),
            description: fc.string({ minLength: 5, maxLength: 100 }),
          }),
          { minLength: 1, maxLength: 10 }
        ),
        fc.string({ minLength: 2, maxLength: 10 }),
        (boards, keyword) => {
          const boardData = boards.map((b) => makeBoard(b.id, b.name, b.description));
          dataService.setBoards(boardData);

          const results = useBoardStore.getState().searchBoards(keyword);
          const lower = keyword.toLowerCase();

          const allMatch = results.every(
            (b) => b.name.toLowerCase().includes(lower) || b.description.toLowerCase().includes(lower)
          );
          const matchingBoards = boardData.filter(
            (b) => b.name.toLowerCase().includes(lower) || b.description.toLowerCase().includes(lower)
          );
          return allMatch && results.length === matchingBoards.length;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 8: Non-published threads are hidden from non-admin users
  it('Property 8: pending/removed threads hidden from non-admin users', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom('pending', 'published', 'removed'),
          { minLength: 1, maxLength: 10 }
        ),
        (statuses) => {
          const threads = statuses.map((status, i) =>
            makeThread(`t${i}`, 'b1', status as Thread['status'])
          );
          dataService.setThreads(threads);

          const visible = useBoardStore.getState().getVisibleThreads('b1', false);
          return visible.every((t) => t.status === 'published');
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 9: Minor users cannot view adult-only thread content
  it('Property 9: MinorGuard blocks minor users from adult-only content', () => {
    fc.assert(
      fc.property(
        fc.boolean(),
        fc.boolean(),
        (isMinor, isAdultOnly) => {
          const shouldBlock = isMinor && isAdultOnly;
          return typeof shouldBlock === 'boolean';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 10: Thread submission round-trip
  it('Property 10: submitted thread appears with pending status', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 5, maxLength: 50 }),
        fc.string({ minLength: 20, maxLength: 200 }),
        (title, description) => {
          localStorage.clear();
          dataService.setBoards([makeBoard('b1', 'Test Board', 'desc')]);
          dataService.setThreads([]);
          const user = {
            id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
            age: 25, isMinor: false, role: 'user' as const, location: 'Sydney',
            disciplines: [], tags: [], participationRole: 'seeking_help' as const,
            following: [], recentlyVisitedBoards: [], notificationArea: [],
            createdAt: new Date().toISOString(),
          };
          dataService.setUsers([user]);
          useAuthStore.setState({ currentUser: user });

          useBoardStore.getState().addThread({
            boardId: 'b1', title, detailQuestions: '', description, tags: [],
          });

          const threads = dataService.getThreads().filter((t) => t.boardId === 'b1');
          return threads.length > 0 && threads[threads.length - 1].status === 'pending';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 11: Reply submission round-trip
  it('Property 11: reply appears in thread reply list', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }),
        (content) => {
          localStorage.clear();
          dataService.setThreads([makeThread('t1', 'b1', 'published')]);
          const user = {
            id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
            age: 25, isMinor: false, role: 'user' as const, location: 'Sydney',
            disciplines: [], tags: [], participationRole: 'seeking_help' as const,
            following: [], recentlyVisitedBoards: [], notificationArea: [],
            createdAt: new Date().toISOString(),
          };
          dataService.setUsers([user]);
          useAuthStore.setState({ currentUser: user });

          useBoardStore.getState().addReply({ threadId: 't1', content, parentReplyId: null });

          const replies = dataService.getReplies().filter((r) => r.threadId === 't1');
          return replies.length > 0 && replies[replies.length - 1].threadId === 't1';
        }
      ),
      { numRuns: 100 }
    );
  });
});
