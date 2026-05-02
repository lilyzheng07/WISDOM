import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dataService } from '../services/dataService';
import type { User, RegistrationData } from '../types';

interface AuthState {
  currentUser: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (data: RegistrationData) => { success: boolean; error?: string };
  updateCurrentUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,

      login: (email, password) => {
        const users = dataService.getUsers();
        const user = users.find(
          (u) => u.email.toLowerCase() === email.toLowerCase() && u.passwordHash === password
        );
        if (user) {
          set({ currentUser: user });
          return true;
        }
        return false;
      },

      logout: () => set({ currentUser: null }),

      register: (data) => {
        // Validate required fields
        if (!data.fullName?.trim()) return { success: false, error: 'Full name is required.' };
        if (!data.email?.trim()) return { success: false, error: 'Email is required.' };
        if (!data.password?.trim()) return { success: false, error: 'Password is required.' };
        if (data.age === undefined || data.age === null) return { success: false, error: 'Age is required.' };
        if (!data.location?.trim()) return { success: false, error: 'Location is required.' };
        if (!data.participationRole) return { success: false, error: 'Participation role is required.' };
        const hasSubField = data.disciplines?.some((d) => d.subFields.length > 0);
        if (!hasSubField) return { success: false, error: 'At least one discipline sub-field is required.' };

        // Age validation
        const age = Number(data.age);
        if (!Number.isInteger(age) || age < 15) {
          return { success: false, error: 'You must be at least 15 years old to join WISDOM.' };
        }

        // Check email uniqueness
        const existing = dataService.getUsers().find(
          (u) => u.email.toLowerCase() === data.email.toLowerCase()
        );
        if (existing) return { success: false, error: 'An account with this email already exists.' };

        const newUser: User = {
          id: crypto.randomUUID(),
          fullName: data.fullName.trim(),
          email: data.email.trim().toLowerCase(),
          passwordHash: data.password,
          age,
          isMinor: age >= 15 && age <= 17,
          role: 'user',
          location: data.location.trim(),
          disciplines: data.disciplines,
          tags: data.tags ?? [],
          participationRole: data.participationRole,
          following: [],
          recentlyVisitedBoards: [],
          notificationArea: [],
          createdAt: new Date().toISOString(),
        };

        dataService.upsertUser(newUser);
        set({ currentUser: newUser });
        return { success: true };
      },

      updateCurrentUser: (user) => {
        dataService.upsertUser(user);
        set({ currentUser: user });
      },
    }),
    {
      name: 'wisdom_auth',
      partialize: (state) => ({ currentUser: state.currentUser }),
    }
  )
);
