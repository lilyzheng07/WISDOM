import { useEffect, useState } from 'react';
import { useBoardStore } from '../stores/boardStore';
import { BoardSearchBar } from '../components/boards/BoardSearchBar';
import { BoardGrid } from '../components/boards/BoardGrid';

export function BoardsPage() {
  const { fetchBoards, searchBoards } = useBoardStore();
  const [keyword, setKeyword] = useState('');
  const [results, setResults] = useState(searchBoards(''));

  useEffect(() => {
    fetchBoards();
    setResults(searchBoards(''));
  }, [fetchBoards]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(searchBoards(keyword));
    }, 300);
    return () => clearTimeout(timer);
  }, [keyword, searchBoards]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-wisdom-sidebar">Discussion Boards</h1>
      </div>
      <div className="mb-6">
        <BoardSearchBar value={keyword} onChange={setKeyword} />
      </div>
      <BoardGrid boards={results} />
    </div>
  );
}
