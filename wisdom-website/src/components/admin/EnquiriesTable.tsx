import { useState } from 'react';
import { dataService } from '../../services/dataService';
import { useAdminStore } from '../../stores/adminStore';
import { MessageSquare } from 'lucide-react';

export function EnquiriesTable() {
  const { respondToEnquiry } = useAdminStore();
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [response, setResponse] = useState('');
  const [refresh, setRefresh] = useState(0);

  const enquiries = dataService.getEnquiries().filter((e) => e.status !== 'Resolved');

  const handleRespond = (enquiryId: string) => {
    if (!response.trim()) return;
    respondToEnquiry(enquiryId, response.trim());
    setRespondingTo(null);
    setResponse('');
    setRefresh((r) => r + 1);
  };

  if (enquiries.length === 0) {
    return <p className="text-wisdom-text/50 text-sm py-4">No open enquiries.</p>;
  }

  return (
    <div className="space-y-3">
      {enquiries.map((enquiry) => {
        const user = dataService.getUserById(enquiry.userId);
        return (
          <div key={enquiry.id} className="bg-white rounded-lg border border-blue-200 p-4">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1 mr-4">
                <p className="text-sm text-wisdom-text">{enquiry.description}</p>
                <p className="text-xs text-wisdom-text/50 mt-1">
                  from {user?.fullName ?? 'Unknown'} · {new Date(enquiry.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full shrink-0">
                {enquiry.status}
              </span>
            </div>
            {respondingTo === enquiry.id ? (
              <div className="mt-3 space-y-2">
                <textarea
                  rows={3}
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write your response..."
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setRespondingTo(null); setResponse(''); }}
                    className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs text-wisdom-text hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleRespond(enquiry.id)}
                    className="px-3 py-1.5 bg-wisdom-highlight text-white rounded-lg text-xs font-medium hover:bg-wisdom-highlight/90 transition-colors"
                  >
                    Send Response
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setRespondingTo(enquiry.id)}
                className="flex items-center gap-1 mt-2 text-xs text-wisdom-highlight hover:underline"
              >
                <MessageSquare size={12} /> Respond
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
