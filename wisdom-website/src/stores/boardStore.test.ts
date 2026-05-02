import { describe, it, expect, beforeEach } from 'vitest';
import { useBoardStore } from './boardStore';
import { useAuthStore } from './authStore';
import { dataService } from '../services/dataService';
import type { Board, Thread } from '../types';

const makeBoard = (id: string, name: string, description: string): Board => ({
  id, name, description, category: 'Science', threadCount: 0,
  lastActivityAt: new Date().toISOString(), createdAt: new Date().toISOString(),
});

const makeThread = (id: string, boardId: string, score: number, updatedAt: string): Thread => ({
  id, boardId, authorId: 'user-1', title: `Thread ${id}`, detailQuestions: '',
  description: 'desc', tags: [], status: 'published', isAdultOnly: false,
  replyCount: score, engagementScore: score * 10, createdAt: updatedAt, updatedAt,
});

describe('boardStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
    dataService.setBoards([]);
    dataService.setThreads([]);
  });

  describe('searchBoards', () => {
    beforeEach(() => {
      dataService.setBoards([
        makeBoard('b1', 'Biology Q&A', 'Discuss biology topics'),
        makeBoard('b2', 'Chemistry Lab', 'Chemistry experiments'),
        makeBoard('b3', 'Mechatronic Minds', 'Engineering discussions'),
      ]);
    });

    it('returns all boards for empty keyword', () => {
      const results = useBoardStore.getState().searchBoards('');
      expect(results).toHaveLength(3);
    });

    it('returns boards matching name (case-insensitive)', () => {
      const results = useBoardStore.getState().searchBoards('biology');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('b1');
    });

    it('returns boards matching description', () => {
      const results = useBoardStore.getState().searchBoards('experiments');
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('b2');
    });

    it('does not return boards that do not match', () => {
      const results = useBoardStore.getState().searchBoards('mathematics');
      expect(results).toHaveLength(0);
    });
  });

  describe('getHotTopic', () => {
    it('returns null when no threads in past 24h', () => {
      const old = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
      dataService.setThreads([makeThread('t1', 'b1', 10, old)]);
      expect(useBoardStore.getState().getHotTopic()).toBeNull();
    });

    it('returns thread with highest engagement score in past 24h', () => {
      const now = new Date().toISOString();
      dataService.setThreads([
        makeThread('t1', 'b1', 5, now),
        makeThread('t2', 'b1', 15, now),
        makeThread('t3', 'b1', 8, now),
      ]);
      const hot = useBoardStore.getState().getHotTopic();
      expect(hot?.id).toBe('t2');
    });
  });

  describe('markBoardVisited', () => {
    it('caps recently visited boards at 5', () => {
      const user = {
        id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
        age: 25, isMinor: false, role: 'user' as const, location: 'Sydney',
        disciplines: [], tags: [], participationRole: 'seeking_help' as const,
        following: [], recentlyVisitedBoards: ['b1', 'b2', 'b3', 'b4', 'b5'],
        notificationArea: [], createdAt: new Date().toISOString(),
      };
      dataService.setUsers([user]);
      useAuthStore.setState({ currentUser: user });

      useBoardStore.getState().markBoardVisited('b6');
      const updated = useAuthStore.getState().currentUser;
      expect(updated?.recentlyVisitedBoards).toHaveLength(5);
      expect(updated?.recentlyVisitedBoards[0]).toBe('b6');
    });

    it('moves existing board to front without duplicating', () => {
      const user = {
        id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
        age: 25, isMinor: false, role: 'user' as const, location: 'Sydney',
        disciplines: [], tags: [], participationRole: 'seeking_help' as const,
        following: [], recentlyVisitedBoards: ['b1', 'b2', 'b3'],
        notificationArea: [], createdAt: new Date().toISOString(),
      };
      dataService.setUsers([user]);
      useAuthStore.setState({ currentUser: user });

      useBoardStore.getState().markBoardVisited('b2');
      const updated = useAuthStore.getState().currentUser;
      expect(updated?.recentlyVisitedBoards[0]).toBe('b2');
      expect(updated?.recentlyVisitedBoards).toHaveLength(3);
    });
  });

  describe('getVisibleThreads', () => {
    beforeEach(() => {
      const now = new Date().toISOString();
      dataService.setThreads([
        { ...makeThread('t1', 'b1', 5, now), status: 'published' },
        { ...makeThread('t2', 'b1', 3, now), status: 'pending' },
        { ...makeThread('t3', 'b1', 2, now), status: 'removed' },
      ]);
    });

    it('shows only published threads to non-admin users', () => {
      const threads = useBoardStore.getState().getVisibleThreads('b1', false);
      expect(threads).toHaveLength(1);
      expect(threads[0].status).toBe('published');
    });

    it('shows all threads to admin users', () => {
      const threads = useBoardStore.getState().getVisibleThreads('b1', true);
      expect(threads).toHaveLength(3);
    });
  });
});
