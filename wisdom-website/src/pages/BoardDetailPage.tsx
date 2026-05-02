import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBoardStore } from '../stores/boardStore';
import { useAuthStore } from '../stores/authStore';
import { dataService } from '../services/dataService';
import { ThreadList } from '../components/boards/ThreadList';
import { NewThreadModal } from '../components/boards/NewThreadModal';
import { Plus } from 'lucide-react';
import type { Board } from '../types';

export function BoardDetailPage() {
  const { boardId } = useParams<{ boardId: string }>();
  const { getVisibleThreads, markBoardVisited } = useBoardStore();
  const { currentUser } = useAuthStore();
  const [board, setBoard] = useState<Board | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (boardId) {
      setBoard(dataService.getBoardById(boardId));
      markBoardVisited(boardId);
    }
  }, [boardId, markBoardVisited]);

  if (!board) return <div className="text-wisdom-text/50">Board not found.</div>;

  const isAdmin = currentUser?.role === 'admin';
  const threads = getVisibleThreads(boardId!, isAdmin);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-wisdom-sidebar">{board.name}</h1>
          <p className="text-wisdom-text/60 text-sm mt-1">{board.description}</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-wisdom-highlight text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors"
        >
          <Plus size={16} /> Add New Discussion
        </button>
      </div>
      <ThreadList threads={threads} />
      {showModal && <NewThreadModal boardId={boardId!} onClose={() => setShowModal(false)} />}
    </div>
  );
}
