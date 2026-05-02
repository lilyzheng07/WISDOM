import { useEffect } from 'react';
import { useBoardStore } from '../stores/boardStore';
import { HighlightReel } from '../components/home/HighlightReel';
import { RecentlyVisitedBoards } from '../components/home/RecentlyVisitedBoards';
import { RecommendedBoards } from '../components/home/RecommendedBoards';
import { UpcomingEventsPanel } from '../components/home/UpcomingEventsPanel';
import { SponsorsSection } from '../components/home/SponsorsSection';

export function HomePage() {
  const { fetchBoards } = useBoardStore();

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Highlight Reel — full width */}
      <HighlightReel />

      {/* Main content + right panel */}
      <div className="mt-6 flex gap-6">
        {/* Main column */}
        <div className="flex-1 min-w-0 space-y-6">
          <RecentlyVisitedBoards />
          <RecommendedBoards />
          <SponsorsSection />
        </div>

        {/* Right panel */}
        <div className="w-72 shrink-0">
          <UpcomingEventsPanel />
        </div>
      </div>
    </div>
  );
}
