import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { useAuthStore } from '../stores/authStore';
import { MinorGuard } from '../components/guards/MinorGuard';
import { ReplyList } from '../components/boards/ReplyList';
import { ReplyForm } from '../components/boards/ReplyForm';
import type { Thread, Reply } from '../types';
import { ArrowLeft, User } from 'lucide-react';

export function ThreadDetailPage() {
  const { boardId, threadId } = useParams<{ boardId: string; threadId: string }>();
  const { currentUser } = useAuthStore();
  const [thread, setThread] = useState<Thread | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);

  const loadReplies = () => {
    setReplies(dataService.getReplies().filter((r) => r.threadId === threadId));
  };

  useEffect(() => {
    if (threadId) {
      setThread(dataService.getThreadById(threadId));
      loadReplies();
    }
  }, [threadId]);

  if (!thread) return <div className="text-wisdom-text/50">Thread not found.</div>;

  const author = dataService.getUserById(thread.authorId);
  const canReply = !currentUser?.isMinor || !thread.isAdultOnly;

  return (
    <div className="max-w-3xl mx-auto">
      <Link to={`/boards/${boardId}`} className="flex items-center gap-1 text-sm text-wisdom-highlight hover:underline mb-4">
        <ArrowLeft size={14} /> Back to board
      </Link>

      {/* Thread post */}
      <MinorGuard isAdultOnly={thread.isAdultOnly}>
        <div className="bg-white rounded-xl p-6 border border-wisdom-primary/20 mb-6">
          <h1 className="text-xl font-bold text-wisdom-sidebar mb-2">{thread.title}</h1>
          {thread.detailQuestions && (
            <p className="text-sm text-wisdom-highlight italic mb-3">{thread.detailQuestions}</p>
          )}
          <p className="text-wisdom-text leading-relaxed">{thread.description}</p>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100 text-xs text-wisdom-text/50">
            <User size={12} />
            <span>{author?.fullName ?? 'Unknown'}</span>
            <span>·</span>
            <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Replies */}
        <section className="mb-6">
          <h2 className="text-base font-semibold text-wisdom-sidebar mb-3">
            Replies ({thread.replyCount})
          </h2>
          <ReplyList replies={replies} />
        </section>

        {/* Reply form */}
        {canReply && (
          <section>
            <h2 className="text-base font-semibold text-wisdom-sidebar mb-3">Add a Reply</h2>
            <ReplyForm threadId={thread.id} onSuccess={loadReplies} />
          </section>
        )}
      </MinorGuard>
    </div>
  );
}
