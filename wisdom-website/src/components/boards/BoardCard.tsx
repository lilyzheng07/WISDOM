import { Link } from 'react-router-dom';
import type { Board } from '../../types';
import { MessageSquare } from 'lucide-react';

const CATEGORY_COLOURS: Record<string, string> = {
  Science: 'bg-green-100 text-green-700',
  Technology: 'bg-blue-100 text-blue-700',
  Engineering: 'bg-orange-100 text-orange-700',
  Mathematics: 'bg-purple-100 text-purple-700',
};

interface BoardCardProps {
  board: Board;
}

export function BoardCard({ board }: BoardCardProps) {
  return (
    <Link
      to={`/boards/${board.id}`}
      className="block bg-white rounded-xl p-4 border border-wisdom-primary/20 hover:border-wisdom-primary hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-wisdom-sidebar text-sm leading-tight">{board.name}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ml-2 ${CATEGORY_COLOURS[board.category] ?? 'bg-gray-100 text-gray-600'}`}>
          {board.category}
        </span>
      </div>
      <p className="text-xs text-wisdom-text/70 leading-relaxed line-clamp-2">{board.description}</p>
      <div className="flex items-center gap-1 mt-3 text-xs text-wisdom-text/50">
        <MessageSquare size={12} />
        <span>{board.threadCount} threads</span>
      </div>
    </Link>
  );
}
