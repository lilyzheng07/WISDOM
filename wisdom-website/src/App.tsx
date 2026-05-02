import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { seedData } from './data/seed';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PublicLayout } from './components/layout/PublicLayout';
import { AuthenticatedLayout } from './components/layout/AuthenticatedLayout';
import { ProtectedRoute } from './components/guards/ProtectedRoute';
import { AdminRoute } from './components/guards/AdminRoute';
import { NotFoundPage } from './components/NotFoundPage';

// Pages — lazy imports would be ideal for production; direct imports for prototype
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { MeetTheTeamPage } from './pages/MeetTheTeamPage';
import { HomePage } from './pages/HomePage';
import { BoardsPage } from './pages/BoardsPage';
import { BoardDetailPage } from './pages/BoardDetailPage';
import { ThreadDetailPage } from './pages/ThreadDetailPage';
import { ConnectPage } from './pages/ConnectPage';
import { EventsPage } from './pages/EventsPage';
import { EnquiriesPage } from './pages/EnquiriesPage';
import { ProfilePage } from './pages/ProfilePage';
import { SettingsPage } from './pages/SettingsPage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  useEffect(() => {
    seedData();
  }, []);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/meet-the-team" element={<MeetTheTeamPage />} />
          </Route>

          {/* Authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/boards" element={<BoardsPage />} />
              <Route path="/boards/:boardId" element={<BoardDetailPage />} />
              <Route path="/boards/:boardId/threads/:threadId" element={<ThreadDetailPage />} />
              <Route path="/connect" element={<ConnectPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/enquiries" element={<EnquiriesPage />} />
              <Route path="/profile/:userId" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Admin routes */}
          <Route element={<AdminRoute />}>
            <Route element={<AuthenticatedLayout />}>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/admin/threads" element={<AdminPage />} />
              <Route path="/admin/enquiries" element={<AdminPage />} />
              <Route path="/admin/connections" element={<AdminPage />} />
              <Route path="/admin/sponsors" element={<AdminPage />} />
            </Route>
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
