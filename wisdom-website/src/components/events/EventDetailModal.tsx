import type { Event } from '../../types';
import { dataService } from '../../services/dataService';
import { X, Calendar, MapPin, User } from 'lucide-react';

interface EventDetailModalProps {
  event: Event;
  onClose: () => void;
}

const TYPE_COLOURS: Record<string, string> = {
  Networking: 'bg-blue-100 text-blue-700',
  Catchup: 'bg-green-100 text-green-700',
  'Internship Opportunity': 'bg-yellow-100 text-yellow-700',
  'Mentorship Opportunity': 'bg-purple-100 text-purple-700',
};

export function EventDetailModal({ event, onClose }: EventDetailModalProps) {
  const organiser = dataService.getUserById(event.organiserId);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-wisdom-sidebar pr-4">{event.title}</h2>
          <button onClick={onClose} className="text-wisdom-text/40 hover:text-wisdom-text transition-colors shrink-0">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <span className={`inline-block text-xs px-3 py-1 rounded-full ${TYPE_COLOURS[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
            {event.type}
          </span>
          <div className="space-y-2 text-sm text-wisdom-text/70">
            <div className="flex items-center gap-2">
              <Calendar size={14} className="text-wisdom-primary shrink-0" />
              <span>{event.date} at {event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-wisdom-primary shrink-0" />
              <span>{event.location}</span>
            </div>
            {organiser && (
              <div className="flex items-center gap-2">
                <User size={14} className="text-wisdom-primary shrink-0" />
                <span>Organised by {organiser.fullName}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-wisdom-text leading-relaxed">{event.description}</p>
          <button
            onClick={onClose}
            className="w-full py-2 bg-wisdom-highlight text-white rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
