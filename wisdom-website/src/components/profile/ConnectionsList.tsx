import { dataService } from '../../services/dataService';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';

interface ConnectionsListProps {
  userId: string;
}

export function ConnectionsList({ userId }: ConnectionsListProps) {
  const connections = dataService.getConnections().filter(
    (c) => (c.requesterId === userId || c.targetId === userId) && c.status === 'accepted'
  );

  if (connections.length === 0) {
    return (
      <p className="text-wisdom-text/50 text-sm">
        No connections yet. Start by exploring the Connecting Platform.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {connections.map((conn) => {
        const otherId = conn.requesterId === userId ? conn.targetId : conn.requesterId;
        const other = dataService.getUserById(otherId);
        if (!other) return null;
        return (
          <Link
            key={conn.id}
            to={`/profile/${other.id}`}
            className="flex items-center gap-3 p-3 bg-white rounded-lg border border-wisdom-primary/20 hover:border-wisdom-primary transition-colors"
          >
            <div className="w-8 h-8 bg-wisdom-primary rounded-full flex items-center justify-center shrink-0">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-wisdom-sidebar">{other.fullName}</p>
              <p className="text-xs text-wisdom-text/60">{other.location}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
