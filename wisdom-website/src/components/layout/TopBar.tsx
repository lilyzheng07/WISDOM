import { Bell, LogOut, User, Settings } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useUiStore } from '../../stores/uiStore';

interface TopBarProps {
  isPublic?: boolean;
}

export function TopBar({ isPublic = false }: TopBarProps) {
  const { currentUser, logout } = useAuthStore();
  const { getNotifications } = useUiStore();
  const navigate = useNavigate();

  const notifications = currentUser ? getNotifications() : [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-14 bg-wisdom-primary flex items-center justify-between px-4 shadow-sm z-50 fixed top-0 left-0 right-0">
      <Link to={currentUser ? '/home' : '/'} className="text-white font-bold text-xl tracking-wide">
        WISDOM
      </Link>
      <div className="flex items-center gap-3">
        {isPublic || !currentUser ? (
          <>
            <Link to="/login" className="text-white text-sm hover:text-wisdom-white/80 transition-colors">
              Sign In
            </Link>
            <Link
              to="/signup"
              className="bg-wisdom-highlight text-white text-sm px-3 py-1.5 rounded hover:bg-wisdom-highlight/90 transition-colors"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <div className="relative">
              <button className="text-white hover:text-wisdom-white/80 transition-colors relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
            <Link to={`/profile/${currentUser.id}`} className="text-white hover:text-wisdom-white/80 transition-colors">
              <User size={20} />
            </Link>
            <Link to="/settings" className="text-white hover:text-wisdom-white/80 transition-colors">
              <Settings size={20} />
            </Link>
            <button onClick={handleLogout} className="text-white hover:text-wisdom-white/80 transition-colors">
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
