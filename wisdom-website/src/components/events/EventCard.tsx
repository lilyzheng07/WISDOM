import type { Event } from '../../types';
import { Calendar, MapPin, User } from 'lucide-react';
import { dataService } from '../../services/dataService';

const TYPE_COLOURS: Record<string, string> = {
  Networking: 'bg-blue-100 text-blue-700',
  Catchup: 'bg-green-100 text-green-700',
  'Internship Opportunity': 'bg-yellow-100 text-yellow-700',
  'Mentorship Opportunity': 'bg-purple-100 text-purple-700',
};

interface EventCardProps {
  event: Event;
  onClick: (event: Event) => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const organiser = dataService.getUserById(event.organiserId);

  return (
    <button
      onClick={() => onClick(event)}
      className="w-full text-left bg-white rounded-xl p-4 border border-wisdom-primary/20 hover:border-wisdom-primary hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-wisdom-sidebar text-sm leading-tight flex-1 mr-2">{event.title}</h3>
        <span className={`text-xs px-2 py-0.5 rounded-full shrink-0 ${TYPE_COLOURS[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
          {event.type}
        </span>
      </div>
      <div className="space-y-1 text-xs text-wisdom-text/60">
        <div className="flex items-center gap-1">
          <Calendar size={11} />
          <span>{event.date} at {event.time}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={11} />
          <span>{event.location}</span>
        </div>
        {organiser && (
          <div className="flex items-center gap-1">
            <User size={11} />
            <span>{organiser.fullName}</span>
          </div>
        )}
      </div>
    </button>
  );
}
