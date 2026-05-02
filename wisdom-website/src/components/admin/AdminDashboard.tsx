import { useAdminStore } from '../../stores/adminStore';
import { MessageSquare, HelpCircle, Users } from 'lucide-react';

export function AdminDashboard() {
  const { getDashboardCounts } = useAdminStore();
  const counts = getDashboardCounts();

  const cards = [
    { label: 'Pending Threads', value: counts.pendingThreads, icon: MessageSquare, colour: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    { label: 'Open Enquiries', value: counts.openEnquiries, icon: HelpCircle, colour: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'Pending Minor Connections', value: counts.pendingMinorConnections, icon: Users, colour: 'bg-purple-50 text-purple-700 border-purple-200' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map(({ label, value, icon: Icon, colour }) => (
        <div key={label} className={`rounded-xl p-5 border ${colour}`}>
          <div className="flex items-center gap-3">
            <Icon size={24} />
            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-sm">{label}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
