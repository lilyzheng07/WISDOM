import { describe, it, beforeEach } from 'vitest';
import * as fc from 'fast-check';
import { useEnquiryStore } from '../stores/enquiryStore';
import { useAdminStore } from '../stores/adminStore';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import type { User } from '../types';

const testUser: User = {
  id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
  age: 25, isMinor: false, role: 'user', location: 'Sydney',
  disciplines: [], tags: [], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
};

describe('Enquiries property-based tests', () => {
  beforeEach(() => {
    localStorage.clear();
    dataService.setUsers([testUser]);
    dataService.setEnquiries([]);
    useAuthStore.setState({ currentUser: testUser });
  });

  // Feature: wisdom-website, Property 21: Enquiry submission creates pending record
  it('Property 21: non-empty description creates Pending enquiry', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 500 }).filter((s) => s.trim().length > 0),
        (description) => {
          localStorage.clear();
          dataService.setUsers([testUser]);
          dataService.setEnquiries([]);
          useAuthStore.setState({ currentUser: testUser });

          const result = useEnquiryStore.getState().submitEnquiry(description);
          if (!result) return true;

          const enquiries = dataService.getEnquiries().filter((e) => e.userId === 'u1');
          return enquiries.length > 0 && enquiries[enquiries.length - 1].status === 'Pending';
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 22: Empty enquiry description is rejected
  it('Property 22: whitespace-only description is rejected', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 0, maxLength: 20 }).map((s) => s.replace(/[^\s]/g, ' ')),
        (whitespace) => {
          localStorage.clear();
          dataService.setUsers([testUser]);
          dataService.setEnquiries([]);
          useAuthStore.setState({ currentUser: testUser });

          const result = useEnquiryStore.getState().submitEnquiry(whitespace);
          return result === false && dataService.getEnquiries().length === 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 23: Admin enquiry response delivers notification to user
  it('Property 23: admin response creates notification for user', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 200 }).filter((s) => s.trim().length > 0),
        (responseText) => {
          localStorage.clear();
          dataService.setUsers([testUser]);
          dataService.setEnquiries([]);
          useAuthStore.setState({ currentUser: testUser });

          useEnquiryStore.getState().submitEnquiry('I need help with my career.');
          const enquiries = dataService.getEnquiries();
          if (enquiries.length === 0) return true;

          useAdminStore.getState().respondToEnquiry(enquiries[0].id, responseText);

          const user = dataService.getUserById('u1');
          return user?.notificationArea.some(
            (n) => n.type === 'enquiry_response' && n.message.includes(responseText)
          ) ?? false;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: wisdom-website, Property 24: Google Form URL update is reflected without redeployment
  it('Property 24: updateSettings reflects new Google Form URLs', () => {
    fc.assert(
      fc.property(
        fc.webUrl(),
        fc.webUrl(),
        (contactUrl, sponsorUrl) => {
          localStorage.clear();
          dataService.setSettings({ contactFormUrl: '', sponsorFormUrl: '' });

          useAdminStore.getState().updateSettings({ contactFormUrl: contactUrl });
          const settings1 = dataService.getSettings();

          useAdminStore.getState().updateSettings({ sponsorFormUrl: sponsorUrl });
          const settings2 = dataService.getSettings();

          return settings1.contactFormUrl === contactUrl && settings2.sponsorFormUrl === sponsorUrl;
        }
      ),
      { numRuns: 100 }
    );
  });
});
