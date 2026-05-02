import type { User } from '../../types';
import { MessageCircle, User as UserIcon } from 'lucide-react';

interface ProfessionalCardProps {
  user: User;
  onChat: (userId: string) => void;
}

export function ProfessionalCard({ user, onChat }: ProfessionalCardProps) {
  const speciality = user.disciplines.flatMap((d) => d.subFields).slice(0, 2).join(', ') || 'STEM Professional';
  const organisation = user.location;

  return (
    <div className="bg-white rounded-xl p-4 border border-wisdom-primary/20 hover:shadow-sm transition-shadow">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-wisdom-primary rounded-full flex items-center justify-center shrink-0">
          <UserIcon size={20} className="text-white" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-wisdom-sidebar text-sm truncate">{user.fullName}</h3>
          <p className="text-xs text-wisdom-text/60 truncate">{organisation}</p>
          <p className="text-xs text-wisdom-highlight mt-0.5 truncate">{speciality}</p>
        </div>
      </div>
      <button
        onClick={() => onChat(user.id)}
        className="w-full flex items-center justify-center gap-2 bg-wisdom-highlight text-white py-1.5 rounded-lg text-sm font-medium hover:bg-wisdom-highlight/90 transition-colors"
      >
        <MessageCircle size={14} /> Chat
      </button>
    </div>
  );
}
