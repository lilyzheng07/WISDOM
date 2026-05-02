import { useState } from 'react';
import { dataService } from '../../services/dataService';
import { useAdminStore } from '../../stores/adminStore';
import { Check, X } from 'lucide-react';

export function MinorConnectionsTable() {
  const { approveMinorConnection, rejectMinorConnection } = useAdminStore();
  const [refresh, setRefresh] = useState(0);

  const connections = dataService.getConnections().filter(
    (c) => c.requiresAdminApproval && c.status === 'pending'
  );

  const handleApprove = (id: string) => {
    approveMinorConnection(id);
    setRefresh((r) => r + 1);
  };

  const handleReject = (id: string) => {
    rejectMinorConnection(id);
    setRefresh((r) => r + 1);
  };

  if (connections.length === 0) {
    return <p className="text-wisdom-text/50 text-sm py-4">No pending minor connection requests.</p>;
  }

  return (
    <div className="space-y-2">
      {connections.map((conn) => {
        const requester = dataService.getUserById(conn.requesterId);
        const target = dataService.getUserById(conn.targetId);
        return (
          <div key={conn.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-purple-200">
            <div className="flex-1 min-w-0 mr-4">
              <p className="text-sm text-wisdom-sidebar">
                <span className="font-medium">{requester?.fullName ?? 'Unknown'}</span>
                {requester?.isMinor && <span className="ml-1 text-xs text-purple-600">(minor)</span>}
                {' → '}
                <span className="font-medium">{target?.fullName ?? 'Unknown'}</span>
                {target?.isMinor && <span className="ml-1 text-xs text-purple-600">(minor)</span>}
              </p>
              <p className="text-xs text-wisdom-text/50">{new Date(conn.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => handleApprove(conn.id)}
                className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-xs font-medium hover:bg-green-200 transition-colors"
              >
                <Check size={12} /> Approve
              </button>
              <button
                onClick={() => handleReject(conn.id)}
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
