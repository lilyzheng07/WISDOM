import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';
import { dataService } from '../services/dataService';

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
    dataService.setUsers([]);
  });

  describe('register', () => {
    const validData = {
      fullName: 'Jane Doe',
      email: 'jane@example.com',
      password: 'password123',
      age: 25,
      location: 'Sydney',
      disciplines: [{ category: 'Science' as const, subFields: ['Biology'] }],
      tags: [],
      participationRole: 'seeking_help' as const,
    };

    it('registers a valid user and sets currentUser', () => {
      const result = useAuthStore.getState().register(validData);
      expect(result.success).toBe(true);
      expect(useAuthStore.getState().currentUser).not.toBeNull();
      expect(useAuthStore.getState().currentUser?.fullName).toBe('Jane Doe');
    });

    it('rejects registration with age below 15', () => {
      const result = useAuthStore.getState().register({ ...validData, age: 14 });
      expect(result.success).toBe(false);
      expect(result.error).toContain('15 years old');
      expect(useAuthStore.getState().currentUser).toBeNull();
    });

    it('rejects registration with age 0', () => {
      const result = useAuthStore.getState().register({ ...validData, age: 0 });
      expect(result.success).toBe(false);
    });

    it('sets isMinor=true for age 15', () => {
      useAuthStore.getState().register({ ...validData, age: 15, email: 'minor15@test.com' });
      expect(useAuthStore.getState().currentUser?.isMinor).toBe(true);
    });

    it('sets isMinor=true for age 17', () => {
      useAuthStore.getState().register({ ...validData, age: 17, email: 'minor17@test.com' });
      expect(useAuthStore.getState().currentUser?.isMinor).toBe(true);
    });

    it('sets isMinor=false for age 18', () => {
      useAuthStore.getState().register({ ...validData, age: 18, email: 'adult18@test.com' });
      expect(useAuthStore.getState().currentUser?.isMinor).toBe(false);
    });

    it('rejects registration with missing fullName', () => {
      const result = useAuthStore.getState().register({ ...validData, fullName: '' });
      expect(result.success).toBe(false);
    });

    it('rejects registration with missing location', () => {
      const result = useAuthStore.getState().register({ ...validData, location: '' });
      expect(result.success).toBe(false);
    });

    it('rejects registration with no discipline sub-fields', () => {
      const result = useAuthStore.getState().register({
        ...validData,
        disciplines: [{ category: 'Science' as const, subFields: [] }],
      });
      expect(result.success).toBe(false);
    });

    it('stores location exactly as provided', () => {
      useAuthStore.getState().register({ ...validData, location: 'Melbourne' });
      expect(useAuthStore.getState().currentUser?.location).toBe('Melbourne');
    });
  });

  describe('login', () => {
    beforeEach(() => {
      useAuthStore.getState().register({
        fullName: 'Test User',
        email: 'test@example.com',
        password: 'pass123',
        age: 25,
        location: 'Sydney',
        disciplines: [{ category: 'Science' as const, subFields: ['Biology'] }],
        tags: [],
        participationRole: 'seeking_help',
      });
      useAuthStore.setState({ currentUser: null });
    });

    it('logs in with correct credentials', () => {
      const success = useAuthStore.getState().login('test@example.com', 'pass123');
      expect(success).toBe(true);
      expect(useAuthStore.getState().currentUser).not.toBeNull();
    });

    it('rejects login with wrong password', () => {
      const success = useAuthStore.getState().login('test@example.com', 'wrongpass');
      expect(success).toBe(false);
      expect(useAuthStore.getState().currentUser).toBeNull();
    });

    it('rejects login with unknown email', () => {
      const success = useAuthStore.getState().login('unknown@example.com', 'pass123');
      expect(success).toBe(false);
    });
  });

  describe('logout', () => {
    it('clears currentUser on logout', () => {
      useAuthStore.getState().register({
        fullName: 'Test',
        email: 'logout@test.com',
        password: 'pass',
        age: 25,
        location: 'Sydney',
        disciplines: [{ category: 'Science' as const, subFields: ['Biology'] }],
        tags: [],
        participationRole: 'seeking_help',
      });
      expect(useAuthStore.getState().currentUser).not.toBeNull();
      useAuthStore.getState().logout();
      expect(useAuthStore.getState().currentUser).toBeNull();
    });
  });
});
