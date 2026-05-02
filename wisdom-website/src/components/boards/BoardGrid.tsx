import type { Board, STEMCategory } from '../../types';
import { BoardCard } from './BoardCard';

const CATEGORIES: STEMCategory[] = ['Science', 'Technology', 'Engineering', 'Mathematics'];

interface BoardGridProps {
  boards: Board[];
}

export function BoardGrid({ boards }: BoardGridProps) {
  if (boards.length === 0) {
    return <p className="text-wisdom-text/50 text-sm py-8 text-center">No boards found. Try a different search term.</p>;
  }

  const grouped = CATEGORIES.reduce<Record<STEMCategory, Board[]>>(
    (acc, cat) => {
      acc[cat] = boards.filter((b) => b.category === cat);
      return acc;
    },
    { Science: [], Technology: [], Engineering: [], Mathematics: [] }
  );

  return (
    <div className="space-y-8">
      {CATEGORIES.map((cat) => {
        const catBoards = grouped[cat];
        if (catBoards.length === 0) return null;
        return (
          <section key={cat}>
            <h2 className="text-base font-semibold text-wisdom-sidebar mb-3">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {catBoards.map((board) => (
                <BoardCard key={board.id} board={board} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
