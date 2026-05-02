import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { dataService } from '../../services/dataService';
import { Sparkles } from 'lucide-react';

export function RecommendedBoards() {
  const { currentUser } = useAuthStore();
  const allBoards = dataService.getBoards();

  const recommended = allBoards.filter((board) => {
    if (!currentUser) return true;
    const userCategories = currentUser.disciplines.map((d) => d.category);
    return userCategories.includes(board.category);
  }).slice(0, 6);

  return (
    <section>
      <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3 flex items-center gap-2">
        <Sparkles size={18} /> Recommended for You
      </h2>
      {recommended.length === 0 ? (
        <p className="text-wisdom-text/50 text-sm">No boards found. Try a different search term.</p>
      ) : (
        <div className="space-y-2">
          {recommended.map((board) => (
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
      )}
    </section>
  );
}
