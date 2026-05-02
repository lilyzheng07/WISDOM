import { create } from 'zustand';
import { dataService } from '../services/dataService';
import type { PlatformSettings } from '../types';

interface AdminState {
  approveThread: (threadId: string) => void;
  rejectThread: (threadId: string) => void;
  removeThread: (threadId: string) => void;
  respondToEnquiry: (enquiryId: string, response: string) => void;
  approveMinorConnection: (connectionId: string) => void;
  rejectMinorConnection: (connectionId: string) => void;
  toggleSponsor: (sponsorId: string, active: boolean) => void;
  updateSettings: (settings: Partial<PlatformSettings>) => void;
  getDashboardCounts: () => {
    pendingThreads: number;
    openEnquiries: number;
    pendingMinorConnections: number;
  };
}

export const useAdminStore = create<AdminState>()(() => ({
  approveThread: (threadId) => {
    const thread = dataService.getThreadById(threadId);
    if (!thread) return;
    dataService.upsertThread({ ...thread, status: 'published', updatedAt: new Date().toISOString() });
  },

  rejectThread: (threadId) => {
    const thread = dataService.getThreadById(threadId);
    if (!thread) return;
    dataService.upsertThread({ ...thread, status: 'removed', updatedAt: new Date().toISOString() });
  },

  removeThread: (threadId) => {
    const thread = dataService.getThreadById(threadId);
    if (!thread) return;
    dataService.upsertThread({ ...thread, status: 'removed', updatedAt: new Date().toISOString() });
    // Notify author
    dataService.addNotification({
      id: crypto.randomUUID(),
      userId: thread.authorId,
      type: 'thread_removed',
      message: `Your thread "${thread.title}" was removed for violating community guidelines.`,
      read: false,
      createdAt: new Date().toISOString(),
    });
  },

  respondToEnquiry: (enquiryId, response) => {
    const enquiry = dataService.getEnquiries().find((e) => e.id === enquiryId);
    if (!enquiry) return;
    const updated = {
      ...enquiry,
      status: 'In Progress' as const,
      adminResponse: response,
      updatedAt: new Date().toISOString(),
    };
    dataService.upsertEnquiry(updated);
    // Notify user
    dataService.addNotification({
      id: crypto.randomUUID(),
      userId: enquiry.userId,
      type: 'enquiry_response',
      message: `Your enquiry has received a response: ${response}`,
      read: false,
      createdAt: new Date().toISOString(),
    });
  },

  approveMinorConnection: (connectionId) => {
    const connections = dataService.getConnections();
    const conn = connections.find((c) => c.id === connectionId);
    if (!conn) return;
    dataService.upsertConnection({ ...conn, status: 'accepted', adminApproved: true });
    dataService.addNotification({
      id: crypto.randomUUID(),
      userId: conn.requesterId,
      type: 'connection_accepted',
      message: 'Your connection request was approved by an admin.',
      read: false,
      createdAt: new Date().toISOString(),
    });
  },

  rejectMinorConnection: (connectionId) => {
    const connections = dataService.getConnections();
    const conn = connections.find((c) => c.id === connectionId);
    if (!conn) return;
    dataService.upsertConnection({ ...conn, status: 'rejected', adminApproved: false });
  },

  toggleSponsor: (sponsorId, active) => {
    const sponsors = dataService.getSponsors();
    const sponsor = sponsors.find((s) => s.id === sponsorId);
    if (!sponsor) return;
    dataService.upsertSponsor({ ...sponsor, isActive: active });
  },

  updateSettings: (settings) => {
    const current = dataService.getSettings();
    dataService.setSettings({ ...current, ...settings });
  },

  getDashboardCounts: () => {
    const threads = dataService.getThreads();
    const enquiries = dataService.getEnquiries();
    const connections = dataService.getConnections();
    return {
      pendingThreads: threads.filter((t) => t.status === 'pending').length,
      openEnquiries: enquiries.filter((e) => e.status !== 'Resolved').length,
      pendingMinorConnections: connections.filter(
        (c) => c.requiresAdminApproval && c.status === 'pending'
      ).length,
    };
  },
}));
