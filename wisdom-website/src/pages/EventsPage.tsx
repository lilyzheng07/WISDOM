import { useEffect, useState } from 'react';
import { useEventStore } from '../stores/eventStore';
import { useAuthStore } from '../stores/authStore';
import { EventCard } from '../components/events/EventCard';
import { EventFilters } from '../components/events/EventFilters';
import { EventDetailModal } from '../components/events/EventDetailModal';
import { NewEventForm } from '../components/events/NewEventForm';
import type { Event } from '../types';
import { Plus } from 'lucide-react';

type EventType = Event['type'] | 'All';

export function EventsPage() {
  const { events, fetchEvents } = useEventStore();
  const { currentUser } = useAuthStore();
  const [activeType, setActiveType] = useState<EventType>('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const city = currentUser?.location ?? '';
  const filtered = events
    .filter((e) => !city || e.location.toLowerCase() === city.toLowerCase())
    .filter((e) => activeType === 'All' || e.type === activeType)
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-wisdom-sidebar">Events</h1>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center gap-2 bg-wisdom-highlight text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors"
        >
          <Plus size={16} /> Create Event
        </button>
      </div>

      <div className="mb-6">
        <EventFilters activeType={activeType} onChange={setActiveType} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-wisdom-text/50 text-sm py-8 text-center">No upcoming events in your area.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
          ))}
        </div>
      )}

      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
      {showNewForm && <NewEventForm onClose={() => setShowNewForm(false)} />}
    </div>
  );
}
