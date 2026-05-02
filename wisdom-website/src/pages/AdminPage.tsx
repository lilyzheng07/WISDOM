import { AdminDashboard } from '../components/admin/AdminDashboard';
import { PendingThreadsTable } from '../components/admin/PendingThreadsTable';
import { EnquiriesTable } from '../components/admin/EnquiriesTable';
import { MinorConnectionsTable } from '../components/admin/MinorConnectionsTable';
import { SponsorManagement } from '../components/admin/SponsorManagement';

export function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-wisdom-sidebar mb-6">Admin Dashboard</h1>

      <AdminDashboard />

      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Pending Threads</h2>
          <PendingThreadsTable />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Open Enquiries</h2>
          <EnquiriesTable />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Minor Connection Requests</h2>
          <MinorConnectionsTable />
        </section>

        <section>
          <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3">Sponsor Management</h2>
          <SponsorManagement />
        </section>
      </div>
    </div>
  );
}
