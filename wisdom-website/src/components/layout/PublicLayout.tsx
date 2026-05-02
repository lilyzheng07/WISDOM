import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-wisdom-white text-wisdom-text">
      <TopBar isPublic />
      <main className="pt-14">
        <Outlet />
      </main>
    </div>
  );
}
