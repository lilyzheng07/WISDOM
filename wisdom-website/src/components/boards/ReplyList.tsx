import type { Reply } from '../../types';
import { dataService } from '../../services/dataService';
import { User } from 'lucide-react';

interface ReplyListProps {
  replies: Reply[];
}

export function ReplyList({ replies }: ReplyListProps) {
  const topLevel = replies.filter((r) => r.parentReplyId === null);
  const nested = replies.filter((r) => r.parentReplyId !== null);

  const renderReply = (reply: Reply, depth = 0) => {
    const author = dataService.getUserById(reply.authorId);
    const children = nested.filter((r) => r.parentReplyId === reply.id);
    return (
      <div key={reply.id} className={`${depth > 0 ? 'ml-6 border-l-2 border-wisdom-primary/20 pl-4' : ''}`}>
        <div className="bg-white rounded-lg p-3 border border-gray-100">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-wisdom-primary rounded-full flex items-center justify-center">
              <User size={12} className="text-white" />
            </div>
            <span className="text-xs font-medium text-wisdom-sidebar">{author?.fullName ?? 'Unknown'}</span>
            <span className="text-xs text-wisdom-text/40">{new Date(reply.createdAt).toLocaleDateString()}</span>
          </div>
          <p className="text-sm text-wisdom-text leading-relaxed">{reply.content}</p>
        </div>
        {children.map((child) => renderReply(child, depth + 1))}
      </div>
    );
  };

  if (replies.length === 0) {
    return <p className="text-wisdom-text/50 text-sm py-4">No replies yet. Be the first to reply!</p>;
  }

  return <div className="space-y-3">{topLevel.map((r) => renderReply(r))}</div>;
}
