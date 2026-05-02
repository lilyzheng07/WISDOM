import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useUiStore } from '../../stores/uiStore';

export function AuthenticatedLayout() {
  const { sidebarOpen } = useUiStore();

  return (
    <div className="min-h-screen bg-wisdom-white text-wisdom-text">
      <TopBar />
      <Sidebar />
      <main
        className={`pt-14 transition-all duration-300 ${sidebarOpen ? 'ml-60' : 'ml-16'}`}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
