# Implementation Plan: WISDOM Website

## Tasks

- [x] 1. Project setup and configuration
  - [x] 1.1 Install required dependencies (react-router-dom, zustand, tailwindcss, lucide-react, react-hook-form, fast-check, @testing-library/react, vitest)
  - [x] 1.2 Configure Tailwind CSS with WISDOM colour tokens (wisdom-primary, wisdom-white, wisdom-text, wisdom-sidebar, wisdom-highlight)
  - [x] 1.3 Set up Vitest configuration for unit and property-based tests

- [x] 2. TypeScript data models and constants
  - [x] 2.1 Create `src/types/index.ts` with all TypeScript interfaces (User, UserDiscipline, Board, Thread, Reply, Connection, AdviceQuestion, Event, Enquiry, Sponsor, SpotlightProfile, Notification, Tag, PlatformSettings)
  - [x] 2.2 Create `src/data/constants.ts` with STEM_TAXONOMY constant and predefined tags list

- [x] 3. Data layer — dataService and seedService
  - [x] 3.1 Create `src/services/dataService.ts` with typed localStorage getters/setters for all entity collections
  - [x] 3.2 Create `src/data/seed.ts` with all seeded fixture data (spotlight profiles, sponsors, boards, threads, admin user, demo users) guarded by `wisdom_seeded` flag

- [x] 4. Zustand stores
  - [x] 4.1 Create `src/stores/authStore.ts` with login, logout, register actions and localStorage persistence
  - [x] 4.2 Create `src/stores/boardStore.ts` with fetchBoards, fetchThreads, addThread, addReply, searchBoards, getHotTopic, markBoardVisited
  - [x] 4.3 Create `src/stores/connectStore.ts` with sendConnectionRequest, sendAdviceQuestion, acceptConnection
  - [x] 4.4 Create `src/stores/eventStore.ts` with fetchEvents, addEvent, getUpcomingNearby
  - [x] 4.5 Create `src/stores/enquiryStore.ts` with submitEnquiry, getUserEnquiries
  - [x] 4.6 Create `src/stores/adminStore.ts` with thread moderation, enquiry response, minor connection approval, sponsor management, updateSettings, getDashboardCounts
  - [x] 4.7 Create `src/stores/uiStore.ts` with sidebarOpen toggle and notification management

- [x] 5. Application shell and routing
  - [x] 5.1 Create `src/components/layout/TopBar.tsx` (public and authenticated variants)
  - [x] 5.2 Create `src/components/layout/Sidebar.tsx` with collapsible behaviour, navigation links, admin link guard
  - [x] 5.3 Create `src/components/layout/PublicLayout.tsx` and `src/components/layout/AuthenticatedLayout.tsx`
  - [x] 5.4 Create `src/components/guards/ProtectedRoute.tsx` and `src/components/guards/AdminRoute.tsx`
  - [x] 5.5 Create `src/components/guards/MinorGuard.tsx`
  - [x] 5.6 Set up React Router v6 routing in `src/App.tsx` with all routes and layout wrappers
  - [x] 5.7 Create `src/components/NotFoundPage.tsx` and `src/components/ErrorBoundary.tsx`

- [x] 6. Landing page and public pages
  - [x] 6.1 Create `src/pages/LandingPage.tsx` with hero section, feature highlights, and footer
  - [x] 6.2 Create `src/pages/MeetTheTeamPage.tsx` with team grid and Google Form iframe embed

- [x] 7. Authentication pages
  - [x] 7.1 Create `src/components/auth/LoginForm.tsx` with email/password fields and authStore integration
  - [x] 7.2 Create `src/pages/LoginPage.tsx`
  - [x] 7.3 Create `src/components/auth/DisciplineSelector.tsx` — two-level STEM category → sub-field picker
  - [x] 7.4 Create `src/components/auth/TagSelector.tsx` — multi-select chip list
  - [x] 7.5 Create `src/components/auth/SignUpForm.tsx` — multi-step form (name/age/location → disciplines → tags/role) with age validation
  - [x] 7.6 Create `src/pages/SignUpPage.tsx`

- [x] 8. Home page
  - [x] 8.1 Create `src/components/home/SpotlightCard.tsx` and `src/components/home/HotTopicCard.tsx`
  - [x] 8.2 Create `src/components/home/HighlightReel.tsx` — horizontally scrollable row
  - [x] 8.3 Create `src/components/home/RecentlyVisitedBoards.tsx` and `src/components/home/RecommendedBoards.tsx`
  - [x] 8.4 Create `src/components/home/UpcomingEventsPanel.tsx` — right-side panel filtered by user city
  - [x] 8.5 Create `src/components/home/SponsorsSection.tsx` — active sponsors only
  - [x] 8.6 Create `src/pages/HomePage.tsx` assembling all home sub-components in the three-column layout

- [x] 9. Discussion boards
  - [x] 9.1 Create `src/components/boards/BoardCard.tsx` and `src/components/boards/BoardSearchBar.tsx`
  - [x] 9.2 Create `src/components/boards/BoardGrid.tsx` grouped by STEM category
  - [x] 9.3 Create `src/pages/BoardsPage.tsx` (index)
  - [x] 9.4 Create `src/components/boards/ThreadRow.tsx` and `src/components/boards/ThreadList.tsx` (hides pending/removed from non-admins)
  - [x] 9.5 Create `src/components/boards/NewThreadModal.tsx` with React Hook Form validation
  - [x] 9.6 Create `src/pages/BoardDetailPage.tsx`
  - [x] 9.7 Create `src/components/boards/ReplyForm.tsx` and `src/components/boards/ReplyList.tsx`
  - [x] 9.8 Create `src/pages/ThreadDetailPage.tsx` with MinorGuard wrapping adult-only content

- [x] 10. Connecting platform
  - [x] 10.1 Create `src/components/connect/ProfessionalCard.tsx` with name, organisation, speciality, Chat button
  - [x] 10.2 Create `src/components/connect/ChatOptionsModal.tsx` with connection request / advice options
  - [x] 10.3 Create `src/components/connect/AdviceForm.tsx`
  - [x] 10.4 Create `src/pages/ConnectPage.tsx` with nearby and all-professionals sections

- [x] 11. Events
  - [x] 11.1 Create `src/components/events/EventCard.tsx` and `src/components/events/EventFilters.tsx`
  - [x] 11.2 Create `src/components/events/EventDetailModal.tsx`
  - [x] 11.3 Create `src/components/events/NewEventForm.tsx` with React Hook Form validation (future date, required fields)
  - [x] 11.4 Create `src/pages/EventsPage.tsx`

- [x] 12. Enquiries
  - [x] 12.1 Create `src/components/enquiries/EnquiryForm.tsx` with description validation
  - [x] 12.2 Create `src/components/enquiries/EnquiryList.tsx` with status badges
  - [x] 12.3 Create `src/pages/EnquiriesPage.tsx`

- [x] 13. Profile and settings
  - [x] 13.1 Create `src/components/profile/ProfileHeader.tsx`, `src/components/profile/DisciplineDisplay.tsx`, `src/components/profile/TagList.tsx`
  - [x] 13.2 Create `src/components/profile/EditProfileModal.tsx` for editing disciplines, tags, role, location
  - [x] 13.3 Create `src/components/profile/ConnectionsList.tsx` and `src/components/profile/FollowButton.tsx`
  - [x] 13.4 Create `src/pages/ProfilePage.tsx`
  - [x] 13.5 Create `src/pages/SettingsPage.tsx` with account and notification settings

- [x] 14. Admin dashboard
  - [x] 14.1 Create `src/components/admin/AdminDashboard.tsx` with summary count cards
  - [x] 14.2 Create `src/components/admin/PendingThreadsTable.tsx` with approve/reject actions
  - [x] 14.3 Create `src/components/admin/EnquiriesTable.tsx` and `src/components/admin/EnquiryResponseModal.tsx`
  - [x] 14.4 Create `src/components/admin/MinorConnectionsTable.tsx` with approve/reject actions
  - [x] 14.5 Create `src/components/admin/SponsorManagement.tsx` with active toggle and Google Form URL update
  - [x] 14.6 Create `src/pages/AdminPage.tsx` assembling all admin sub-components

- [x] 15. Unit tests
  - [x] 15.1 Write `src/stores/authStore.test.ts` — login, logout, registration validation (age gate, required fields, minor flag)
  - [x] 15.2 Write `src/stores/boardStore.test.ts` — search, hot topic, recently visited capping
  - [x] 15.3 Write `src/stores/eventStore.test.ts` — upcoming events filter, validation
  - [x] 15.4 Write `src/stores/enquiryStore.test.ts` — submission, status transitions
  - [x] 15.5 Write `src/components/MinorGuard.test.tsx` — renders placeholder for minors on adult-only content
  - [x] 15.6 Write `src/components/ProtectedRoute.test.tsx` — redirects unauthenticated users

- [x] 16. Property-based tests
  - [x] 16.1 Write `src/properties/registration.property.test.ts` — Properties 1–6 (registration validation, minor flag, location, disciplines)
  - [x] 16.2 Write `src/properties/threads.property.test.ts` — Properties 7–11 (board search, thread visibility, minor guard, thread/reply round-trips)
  - [x] 16.3 Write `src/properties/connections.property.test.ts` — Properties 12–16 (professional cards, nearby filter, connection request/accept, minor approval)
  - [x] 16.4 Write `src/properties/events.property.test.ts` — Properties 17–20 (events filter/sort, type validation, submission, incomplete rejection)
  - [x] 16.5 Write `src/properties/enquiries.property.test.ts` — Properties 21–24 (enquiry submission, empty rejection, admin response notification, Google Form URL)
  - [x] 16.6 Write remaining property tests covering Properties 25–33 (hot topic, recommendations, recently visited, thread removal notification, admin counts, profile display, follow, sponsors)
