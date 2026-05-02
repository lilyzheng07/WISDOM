import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { dataService } from '../../services/dataService';
import { Clock } from 'lucide-react';

export function RecentlyVisitedBoards() {
  const { currentUser } = useAuthStore();
  const recentIds = currentUser?.recentlyVisitedBoards ?? [];
  const boards = recentIds
    .map((id) => dataService.getBoardById(id))
    .filter(Boolean);

  if (boards.length === 0) {
    return (
      <section>
        <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3 flex items-center gap-2">
          <Clock size={18} /> Recently Visited
        </h2>
        <p className="text-wisdom-text/50 text-sm">No boards visited yet. Start exploring!</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3 flex items-center gap-2">
        <Clock size={18} /> Recently Visited
      </h2>
      <div className="space-y-2">
        {boards.map((board) => board && (
          <Link
            key={board.id}
            to={`/boards/${board.id}`}
            className="flex items-center justify-between p-3 bg-white rounded-lg border border-wisdom-primary/20 hover:border-wisdom-primary transition-colors"
          >
            <div>
              <p className="text-sm font-medium text-wisdom-sidebar">{board.name}</p>
              <p className="text-xs text-wisdom-text/60">{board.category}</p>
            </div>
            <span className="text-xs text-wisdom-text/40">{board.threadCount} threads</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
