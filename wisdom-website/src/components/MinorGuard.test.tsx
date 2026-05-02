import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MinorGuard } from './guards/MinorGuard';
import { useAuthStore } from '../stores/authStore';
import type { User } from '../types';

const makeUser = (isMinor: boolean): User => ({
  id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
  age: isMinor ? 16 : 25, isMinor, role: 'user', location: 'Sydney',
  disciplines: [], tags: [], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
});

describe('MinorGuard', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
  });

  it('renders children for non-adult-only content', () => {
    useAuthStore.setState({ currentUser: makeUser(true) });
    render(
      <MinorGuard isAdultOnly={false}>
        <div>Visible content</div>
      </MinorGuard>
    );
    expect(screen.getByText('Visible content')).toBeTruthy();
  });

  it('renders placeholder for minor user on adult-only content', () => {
    useAuthStore.setState({ currentUser: makeUser(true) });
    render(
      <MinorGuard isAdultOnly={true}>
        <div>Adult content</div>
      </MinorGuard>
    );
    expect(screen.queryByText('Adult content')).toBeNull();
    expect(screen.getByText(/not available for your account/i)).toBeTruthy();
  });

  it('renders children for adult user on adult-only content', () => {
    useAuthStore.setState({ currentUser: makeUser(false) });
    render(
      <MinorGuard isAdultOnly={true}>
        <div>Adult content</div>
      </MinorGuard>
    );
    expect(screen.getByText('Adult content')).toBeTruthy();
  });

  it('renders children when no user is logged in', () => {
    useAuthStore.setState({ currentUser: null });
    render(
      <MinorGuard isAdultOnly={true}>
        <div>Content</div>
      </MinorGuard>
    );
    expect(screen.getByText('Content')).toBeTruthy();
  });
});
