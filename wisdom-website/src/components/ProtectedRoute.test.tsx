import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './guards/ProtectedRoute';
import { useAuthStore } from '../stores/authStore';
import type { User } from '../types';

const testUser: User = {
  id: 'u1', fullName: 'Test', email: 'test@test.com', passwordHash: 'p',
  age: 25, isMinor: false, role: 'user', location: 'Sydney',
  disciplines: [], tags: [], participationRole: 'seeking_help',
  following: [], recentlyVisitedBoards: [], notificationArea: [],
  createdAt: new Date().toISOString(),
};

describe('ProtectedRoute', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({ currentUser: null });
  });

  it('redirects unauthenticated users to /login', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeTruthy();
    expect(screen.queryByText('Home Page')).toBeNull();
  });

  it('renders protected content for authenticated users', () => {
    useAuthStore.setState({ currentUser: testUser });
    render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<div>Home Page</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText('Home Page')).toBeTruthy();
    expect(screen.queryByText('Login Page')).toBeNull();
  });
});
