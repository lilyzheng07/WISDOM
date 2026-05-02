import { create } from 'zustand';
import { dataService } from '../services/dataService';
import { useAuthStore } from './authStore';
import type { User, Connection, AdviceQuestion } from '../types';

interface ConnectState {
  professionals: User[];
  connections: Connection[];
  adviceQuestions: AdviceQuestion[];
  fetchProfessionals: () => void;
  fetchConnections: () => void;
  sendConnectionRequest: (targetId: string) => void;
  sendAdviceQuestion: (targetId: string, question: string) => void;
  acceptConnection: (connectionId: string) => void;
}

export const useConnectStore = create<ConnectState>()((set) => ({
  professionals: [],
  connections: [],
  adviceQuestions: [],

  fetchProfessionals: () => {
    const currentUser = useAuthStore.getState().currentUser;
    const users = dataService.getUsers().filter((u) => u.id !== currentUser?.id);
    set({ professionals: users });
  },

  fetchConnections: () => {
    set({ connections: dataService.getConnections() });
  },

  sendConnectionRequest: (targetId) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return;
    const target = dataService.getUserById(targetId);
    if (!target) return;
    const requiresAdminApproval = currentUser.isMinor || target.isMinor;
    const connection: Connection = {
      id: crypto.randomUUID(),
      requesterId: currentUser.id,
      targetId,
      status: 'pending',
      requiresAdminApproval,
      adminApproved: null,
      createdAt: new Date().toISOString(),
    };
    dataService.upsertConnection(connection);
    set((state) => ({ connections: [...state.connections, connection] }));
  },

  sendAdviceQuestion: (targetId, question) => {
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return;
    const aq: AdviceQuestion = {
      id: crypto.randomUUID(),
      fromUserId: currentUser.id,
      toUserId: targetId,
      question,
      createdAt: new Date().toISOString(),
    };
    dataService.addAdviceQuestion(aq);
    set((state) => ({ adviceQuestions: [...state.adviceQuestions, aq] }));
  },

  acceptConnection: (connectionId) => {
    const connections = dataService.getConnections();
    const conn = connections.find((c) => c.id === connectionId);
    if (!conn) return;
    const updated: Connection = { ...conn, status: 'accepted' };
    dataService.upsertConnection(updated);
    set((state) => ({
      connections: state.connections.map((c) => (c.id === connectionId ? updated : c)),
    }));
    // Notify requester
    dataService.addNotification({
      id: crypto.randomUUID(),
      userId: conn.requesterId,
      type: 'connection_accepted',
      message: 'Your connection request was accepted.',
      read: false,
      createdAt: new Date().toISOString(),
    });
  },
}));
