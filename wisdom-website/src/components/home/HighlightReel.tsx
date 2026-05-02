import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import { useBoardStore } from '../../stores/boardStore';
import type { SpotlightProfile } from '../../types';
import { SpotlightCard } from './SpotlightCard';
import { HotTopicCard } from './HotTopicCard';

export function HighlightReel() {
  const [spotlights, setSpotlights] = useState<SpotlightProfile[]>([]);
  const { getHotTopic } = useBoardStore();
  const hotTopic = getHotTopic();

  useEffect(() => {
    setSpotlights(dataService.getSpotlightProfiles());
  }, []);

  return (
    <section>
      <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Women in the Field</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin">
        {spotlights.map((profile) => (
          <SpotlightCard key={profile.id} profile={profile} />
        ))}
        {hotTopic && <HotTopicCard thread={hotTopic} />}
      </div>
    </section>
  );
}
