import type { SpotlightProfile } from '../../types';
import { User } from 'lucide-react';

interface SpotlightCardProps {
  profile: SpotlightProfile;
}

export function SpotlightCard({ profile }: SpotlightCardProps) {
  return (
    <div className="min-w-[220px] bg-white rounded-xl p-4 shadow-sm border border-wisdom-primary/20 flex-shrink-0">
      <div className="w-12 h-12 bg-wisdom-primary rounded-full flex items-center justify-center mb-3">
        <User size={24} className="text-white" />
      </div>
      <h3 className="font-semibold text-wisdom-sidebar text-sm leading-tight">{profile.name}</h3>
      <p className="text-xs text-wisdom-highlight mt-0.5">{profile.field}</p>
      <p className="text-xs text-wisdom-text/60 mt-0.5">{profile.organisation}</p>
      <p className="text-xs text-wisdom-text/80 mt-2 leading-relaxed">{profile.bio}</p>
    </div>
  );
}
