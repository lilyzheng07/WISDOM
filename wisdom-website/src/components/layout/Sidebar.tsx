import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Users, Calendar, HelpCircle, User, Settings, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { useUiStore } from '../../stores/uiStore';
import { useAuthStore } from '../../stores/authStore';

const NAV_ITEMS = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/boards', icon: MessageSquare, label: 'Discussion Boards' },
  { to: '/connect', icon: Users, label: 'Connecting Platform' },
  { to: '/events', icon: Calendar, label: 'Events' },
  { to: '/enquiries', icon: HelpCircle, label: 'Enquiries' },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUiStore();
  const { currentUser } = useAuthStore();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside
      className={`fixed left-0 top-14 bottom-0 bg-wisdom-sidebar text-white flex flex-col transition-all duration-300 z-40 ${
        sidebarOpen ? 'w-60' : 'w-16'
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="flex items-center justify-center h-10 hover:bg-white/10 transition-colors"
        aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      <nav className="flex-1 overflow-y-auto py-2">
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
              isActive(to) ? 'bg-white/20' : ''
            }`}
          >
            <Icon size={20} className="shrink-0" />
            {sidebarOpen && <span className="text-sm truncate">{label}</span>}
          </Link>
        ))}

        <Link
          to={`/profile/${currentUser?.id}`}
          className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
            isActive('/profile') ? 'bg-white/20' : ''
          }`}
        >
          <User size={20} className="shrink-0" />
          {sidebarOpen && <span className="text-sm truncate">Profile</span>}
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
            isActive('/settings') ? 'bg-white/20' : ''
          }`}
        >
          <Settings size={20} className="shrink-0" />
          {sidebarOpen && <span className="text-sm truncate">Settings</span>}
        </Link>

        {currentUser?.role === 'admin' && (
          <Link
            to="/admin"
            className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors ${
              isActive('/admin') ? 'bg-white/20' : ''
            }`}
          >
            <Shield size={20} className="shrink-0" />
            {sidebarOpen && <span className="text-sm truncate">Admin</span>}
          </Link>
        )}
      </nav>
    </aside>
  );
}
