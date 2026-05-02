import { useState, useCallback } from 'react';
import { dataService } from '../../services/dataService';
import { useAdminStore } from '../../stores/adminStore';
import { Check, X } from 'lucide-react';

export function PendingThreadsTable() {
  const { approveThread, rejectThread } = useAdminStore();
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick((n) => n + 1), []);

  const threads = dataService.getThreads().filter((t) => t.status === 'pending');

  const handleApprove = (id: string) => { approveThread(id); refresh(); };
  const handleReject = (id: string) => { rejectThread(id); refresh(); };

  if (threads.length === 0) {
    return <p className="text-wisdom-text/50 text-sm py-4">No pending threads.</p>;
  }

  return (
    <div className="space-y-2">
      {threads.map((thread) => {
        const author = dataService.getUserById(thread.authorId);
        return (
          <div key={thread.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm font-medium text-wisdom-sidebar truncate">{thread.title}</p>
              <p className="text-xs text-wisdom-text/60">by {author?.fullName ?? 'Unknown'} · {new Date(thread.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleApprove(thread.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
              >
                <Check size={12} /> Approve
              </button>
              <button
                onClick={() => handleReject(thread.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-xs font-medium hover:bg-red-200 transition-colors"
              >
                <X size={12} /> Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
