import type { Enquiry } from '../../types';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface EnquiryListProps {
  enquiries: Enquiry[];
}

const STATUS_CONFIG: Record<string, { colour: string; icon: typeof Clock }> = {
  Pending: { colour: 'bg-yellow-100 text-yellow-700', icon: Clock },
  'In Progress': { colour: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  Resolved: { colour: 'bg-green-100 text-green-700', icon: CheckCircle },
};

export function EnquiryList({ enquiries }: EnquiryListProps) {
  if (enquiries.length === 0) {
    return (
      <p className="text-wisdom-text/50 text-sm py-8 text-center">
        You haven't submitted any enquiries yet.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {enquiries.map((enquiry) => {
        const config = STATUS_CONFIG[enquiry.status] ?? STATUS_CONFIG.Pending;
        const Icon = config.icon;
        return (
          <div key={enquiry.id} className="bg-white rounded-xl p-4 border border-wisdom-primary/20">
            <div className="flex items-start justify-between mb-2">
              <p className="text-sm text-wisdom-text leading-relaxed flex-1 mr-3">{enquiry.description}</p>
              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full shrink-0 ${config.colour}`}>
                <Icon size={11} />
                {enquiry.status}
              </span>
            </div>
            {enquiry.adminResponse && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs font-medium text-wisdom-sidebar mb-1">WISDOM Team Response:</p>
                <p className="text-sm text-wisdom-text/80 leading-relaxed">{enquiry.adminResponse}</p>
              </div>
            )}
            <p className="text-xs text-wisdom-text/40 mt-2">
              Submitted {new Date(enquiry.createdAt).toLocaleDateString()}
            </p>
          </div>
        );
      })}
    </div>
  );
}
