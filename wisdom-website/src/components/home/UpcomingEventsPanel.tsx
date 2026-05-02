import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useEventStore } from '../../stores/eventStore';
import { Calendar, MapPin } from 'lucide-react';

const TYPE_COLOURS: Record<string, string> = {
  Networking: 'bg-blue-100 text-blue-700',
  Catchup: 'bg-green-100 text-green-700',
  'Internship Opportunity': 'bg-yellow-100 text-yellow-700',
  'Mentorship Opportunity': 'bg-purple-100 text-purple-700',
};

export function UpcomingEventsPanel() {
  const { currentUser } = useAuthStore();
  const { fetchEvents, getUpcomingNearby } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const city = currentUser?.location ?? '';
  const events = getUpcomingNearby(city).slice(0, 5);

  return (
    <aside className="space-y-3">
      <h2 className="text-lg font-semibold text-wisdom-sidebar flex items-center gap-2">
        <Calendar size={18} /> Upcoming Events
      </h2>
      {events.length === 0 ? (
        <p className="text-wisdom-text/50 text-sm">No upcoming events in your area.</p>
      ) : (
        events.map((event) => (
          <Link
            key={event.id}
            to="/events"
            className="block p-3 bg-white rounded-lg border border-wisdom-primary/20 hover:border-wisdom-primary transition-colors"
          >
            <p className="text-sm font-medium text-wisdom-sidebar leading-tight">{event.title}</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-wisdom-text/60">
              <MapPin size={11} />
              <span>{event.location}</span>
              <span className="mx-1">·</span>
              <span>{event.date}</span>
            </div>
            <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full ${TYPE_COLOURS[event.type] ?? 'bg-gray-100 text-gray-600'}`}>
              {event.type}
            </span>
          </Link>
        ))
      )}
      <Link to="/events" className="block text-center text-xs text-wisdom-highlight hover:underline mt-2">
        View all events →
      </Link>
    </aside>
  );
}
