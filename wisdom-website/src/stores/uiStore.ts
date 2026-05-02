import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dataService } from '../services/dataService';
import { useAuthStore } from './authStore';
import type { Notification } from '../types';

interface UiState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  getNotifications: () => Notification[];
  markNotificationRead: (id: string) => void;
}

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      sidebarOpen: true,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      getNotifications: () => {
        const currentUser = useAuthStore.getState().currentUser;
        if (!currentUser) return [];
        const user = dataService.getUserById(currentUser.id);
        return user?.notificationArea ?? [];
      },

      markNotificationRead: (id) => {
        const currentUser = useAuthStore.getState().currentUser;
        if (!currentUser) return;
        const user = dataService.getUserById(currentUser.id);
        if (!user) return;
        const updated = {
          ...user,
          notificationArea: user.notificationArea.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        };
        dataService.upsertUser(updated);
        useAuthStore.getState().updateCurrentUser(updated);
      },
    }),
    {
      name: 'wisdom_ui',
      partialize: (state) => ({ sidebarOpen: state.sidebarOpen }),
    }
  )
);
