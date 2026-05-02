import type { User } from '../../types';
import { MapPin, User as UserIcon } from 'lucide-react';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-16 h-16 bg-wisdom-primary rounded-full flex items-center justify-center shrink-0">
        <UserIcon size={32} className="text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-wisdom-sidebar">{user.fullName}</h1>
        <div className="flex items-center gap-1 text-sm text-wisdom-text/60 mt-1">
          <MapPin size={14} />
          <span>{user.location}</span>
        </div>
        <span className="inline-block mt-2 text-xs px-3 py-1 bg-wisdom-primary/20 text-wisdom-sidebar rounded-full">
          {user.participationRole === 'seeking_help' ? 'Seeking Help' : 'Here to Help'}
        </span>
      </div>
    </div>
  );
}
