import type { Thread } from '../../types';
import { Link } from 'react-router-dom';
import { Flame, MessageCircle } from 'lucide-react';

interface HotTopicCardProps {
  thread: Thread;
}

export function HotTopicCard({ thread }: HotTopicCardProps) {
  return (
    <Link
      to={`/boards/${thread.boardId}/threads/${thread.id}`}
      className="min-w-[220px] bg-gradient-to-br from-wisdom-highlight to-wisdom-sidebar rounded-xl p-4 shadow-sm flex-shrink-0 text-white hover:opacity-90 transition-opacity"
    >
      <div className="flex items-center gap-1.5 mb-2">
        <Flame size={16} />
        <span className="text-xs font-semibold uppercase tracking-wide">Hot Topic</span>
      </div>
      <h3 className="font-semibold text-sm leading-tight line-clamp-2">{thread.title}</h3>
      <div className="flex items-center gap-1 mt-3 text-white/80 text-xs">
        <MessageCircle size={12} />
        <span>{thread.replyCount} replies</span>
      </div>
    </Link>
  );
}
