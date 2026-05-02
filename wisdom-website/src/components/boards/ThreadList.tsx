import type { Thread } from '../../types';
import { ThreadRow } from './ThreadRow';
import { dataService } from '../../services/dataService';

interface ThreadListProps {
  threads: Thread[];
}

export function ThreadList({ threads }: ThreadListProps) {
  if (threads.length === 0) {
    return <p className="text-wisdom-text/50 text-sm py-8 text-center">No threads yet. Be the first to start a discussion!</p>;
  }

  return (
    <div className="space-y-2">
      {threads.map((thread) => {
        const author = dataService.getUserById(thread.authorId);
        return <ThreadRow key={thread.id} thread={thread} author={author} />;
      })}
    </div>
  );
}
