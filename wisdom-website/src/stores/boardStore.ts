import { create } from 'zustand';
import { dataService } from '../services/dataService';
import { useAuthStore } from './authStore';
import type { Board, Thread, Reply, NewThreadData, NewReplyData } from '../types';

interface BoardState {
  boards: Board[];
  threads: Thread[];
  replies: Reply[];
  fetchBoards: () => void;
  fetchThreads: (boardId: string) => void;
  addThread: (data: NewThreadData) => void;
  addReply: (data: NewReplyData) => void;
  searchBoards: (keyword: string) => Board[];
  getHotTopic: () => Thread | null;
  markBoardVisited: (boardId: string) => void;
  getVisibleThreads: (boardId: string, isAdmin: boolean) => Thread[];
}

export const useBoardStore = create<BoardState>()((set, get) => ({
  boards: [],
  threads: [],
  replies: [],

  fetchBoards: () => {
    set({ boards: dataService.getBoards() });
  },

  fetchThreads: (boardId) => {
    const threads = dataService.getThreads().filter((t) => t.boardId === boardId);
    set({ threads: threads });
  },

  addThread: (data) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return;
    const thread: Thread = {
      id: crypto.randomUUID(),
      boardId: data.boardId,
      authorId: currentUser.id,
      title: data.title,
      detailQuestions: data.detailQuestions,
      description: data.description,
      tags: data.tags,
      status: 'pending',
      isAdultOnly: false,
      replyCount: 0,
      engagementScore: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dataService.upsertThread(thread);
    // Update board thread count
    const board = dataService.getBoardById(data.boardId);
    if (board) {
      dataService.upsertBoard({
        ...board,
        threadCount: board.threadCount + 1,
        lastActivityAt: new Date().toISOString(),
      });
    }
    set((state) => ({ threads: [...state.threads, thread] }));
  },

  addReply: (data) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return;
    const reply: Reply = {
      id: crypto.randomUUID(),
      threadId: data.threadId,
      authorId: currentUser.id,
      content: data.content,
      parentReplyId: data.parentReplyId,
      createdAt: new Date().toISOString(),
    };
    dataService.addReply(reply);
    // Update thread reply count and engagement
    const thread = dataService.getThreadById(data.threadId);
    if (thread) {
      dataService.upsertThread({
        ...thread,
        replyCount: thread.replyCount + 1,
        engagementScore: thread.engagementScore + 10,
        updatedAt: new Date().toISOString(),
      });
    }
    set((state) => ({ replies: [...state.replies, reply] }));
  },

  searchBoards: (keyword) => {
    const boards = dataService.getBoards();
    if (!keyword.trim()) return boards;
    const lower = keyword.toLowerCase();
    return boards.filter(
      (b) => b.name.toLowerCase().includes(lower) || b.description.toLowerCase().includes(lower)
    );
  },

  getHotTopic: () => {
    const threads = dataService.getThreads();
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const recent = threads.filter((t) => t.status === 'published' && t.updatedAt >= cutoff);
    if (recent.length === 0) return null;
    return recent.reduce((best, t) => (t.engagementScore > best.engagementScore ? t : best));
  },

  markBoardVisited: (boardId) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return;
    const visited = [boardId, ...currentUser.recentlyVisitedBoards.filter((id) => id !== boardId)].slice(0, 5);
    const updated = { ...currentUser, recentlyVisitedBoards: visited };
    dataService.upsertUser(updated);
    useAuthStore.getState().updateCurrentUser(updated);
  },

  getVisibleThreads: (boardId, isAdmin) => {
    const threads = dataService.getThreads().filter((t) => t.boardId === boardId);
    if (isAdmin) return threads;
    return threads.filter((t) => t.status === 'published');
  },
}));
