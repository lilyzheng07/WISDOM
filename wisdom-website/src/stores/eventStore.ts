import { create } from 'zustand';
import { dataService } from '../services/dataService';
import { useAuthStore } from './authStore';
import type { Event, NewEventData } from '../types';

const EVENT_TYPES = ['Networking', 'Catchup', 'Internship Opportunity', 'Mentorship Opportunity'] as const;

interface EventState {
  events: Event[];
  fetchEvents: () => void;
  addEvent: (data: NewEventData) => boolean;
  getUpcomingNearby: (city: string) => Event[];
}

export const useEventStore = create<EventState>()((set) => ({
  events: [],

  fetchEvents: () => {
    set({ events: dataService.getEvents() });
  },

  addEvent: (data) => {
    // Validate required fields
    if (!data.title?.trim()) return false;
    if (!data.type || !EVENT_TYPES.includes(data.type)) return false;
    if (!data.date?.trim()) return false;
    if (!data.time?.trim()) return false;
    if (!data.location?.trim()) return false;
    if (!data.description?.trim()) return false;
    // Validate future date
    if (new Date(data.date) <= new Date()) return false;

    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return false;

    const event: Event = {
      id: crypto.randomUUID(),
      ...data,
      organiserId: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    dataService.addEvent(event);
    set((state) => ({ events: [...state.events, event] }));
    return true;
  },

  getUpcomingNearby: (city) => {
    const events = dataService.getEvents();
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter((e) => e.location.toLowerCase() === city.toLowerCase() && e.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date));
  },
}));
