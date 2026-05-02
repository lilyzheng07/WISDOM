import { create } from 'zustand';
import { dataService } from '../services/dataService';
import { useAuthStore } from './authStore';
import type { Enquiry } from '../types';

interface EnquiryState {
  enquiries: Enquiry[];
  fetchEnquiries: () => void;
  submitEnquiry: (description: string) => boolean;
  getUserEnquiries: (userId: string) => Enquiry[];
}

export const useEnquiryStore = create<EnquiryState>()((set) => ({
  enquiries: [],

  fetchEnquiries: () => {
    set({ enquiries: dataService.getEnquiries() });
  },

  submitEnquiry: (description) => {
    if (!description?.trim()) return false;
    const currentUser = useAuthStore.getState().currentUser;
    if (!currentUser) return false;
    const enquiry: Enquiry = {
      id: crypto.randomUUID(),
      userId: currentUser.id,
      description: description.trim(),
      status: 'Pending',
      adminResponse: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dataService.upsertEnquiry(enquiry);
    set((state) => ({ enquiries: [...state.enquiries, enquiry] }));
    return true;
  },

  getUserEnquiries: (userId) => {
    return dataService.getEnquiries().filter((e) => e.userId === userId);
  },
}));
