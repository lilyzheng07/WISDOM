import { Link } from 'react-router-dom';
import type { Thread, User } from '../../types';
import { MessageCircle, Clock } from 'lucide-react';

interface ThreadRowProps {
  thread: Thread;
  author?: User | null;
}

const STATUS_BADGE: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  published: '',
  removed: 'bg-red-100 text-red-700',
};

export function ThreadRow({ thread, author }: ThreadRowProps) {
  return (
    <Link
      to={`/boards/${thread.boardId}/threads/${thread.id}`}
      className="flex items-center justify-between p-4 bg-white rounded-lg border border-wisdom-primary/20 hover:border-wisdom-primary transition-colors"
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-medium text-wisdom-sidebar truncate">{thread.title}</h3>
          {thread.status !== 'published' && (
            <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${STATUS_BADGE[thread.status]}`}>
              {thread.status}
            </span>
          )}
        </div>
        <p className="text-xs text-wisdom-text/60 mt-0.5">
          by {author?.fullName ?? 'Unknown'}
        </p>
      </div>
      <div className="flex items-center gap-4 ml-4 shrink-0 text-xs text-wisdom-text/50">
        <span className="flex items-center gap-1">
          <MessageCircle size={12} />
          {thread.replyCount}
        </span>
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {new Date(thread.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </Link>
  );
}
