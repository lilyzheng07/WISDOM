import { describe, it, expect, beforeEach } from 'vitest';
import { useEnquiryStore } from './enquiryStore';
import { useAuthStore } from './authStore';
import { dataService } from '../services/dataService';
import type { User } from '../types';

const testUser: User = {
  id: 'u1', fullName: 'Test User', email: 'test@test.com', passwordHash: 'p',
  age: 25, isMinor: false, role: 'user', location: 'Sydney',
  disciplines: [], tags: [], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
};

describe('enquiryStore', () => {
  beforeEach(() => {
    localStorage.clear();
    dataService.setUsers([testUser]);
    dataService.setEnquiries([]);
    useAuthStore.setState({ currentUser: testUser });
  });

  describe('submitEnquiry', () => {
    it('creates a Pending enquiry for valid description', () => {
      const result = useEnquiryStore.getState().submitEnquiry('I need help with my STEM career path.');
      expect(result).toBe(true);
      const enquiries = dataService.getEnquiries();
      expect(enquiries).toHaveLength(1);
      expect(enquiries[0].status).toBe('Pending');
      expect(enquiries[0].userId).toBe('u1');
    });

    it('rejects empty description', () => {
      const result = useEnquiryStore.getState().submitEnquiry('');
      expect(result).toBe(false);
      expect(dataService.getEnquiries()).toHaveLength(0);
    });

    it('rejects whitespace-only description', () => {
      const result = useEnquiryStore.getState().submitEnquiry('   ');
      expect(result).toBe(false);
      expect(dataService.getEnquiries()).toHaveLength(0);
    });
  });

  describe('getUserEnquiries', () => {
    it('returns only enquiries for the specified user', () => {
      useEnquiryStore.getState().submitEnquiry('Question 1');
      useEnquiryStore.getState().submitEnquiry('Question 2');

      // Add enquiry for another user
      dataService.upsertEnquiry({
        id: 'other-enquiry', userId: 'other-user', description: 'Other question',
        status: 'Pending', adminResponse: null,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      });

      const userEnquiries = useEnquiryStore.getState().getUserEnquiries('u1');
      expect(userEnquiries).toHaveLength(2);
      expect(userEnquiries.every((e) => e.userId === 'u1')).toBe(true);
    });
  });
});
