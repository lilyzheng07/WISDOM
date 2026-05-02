import type { Event } from '../../types';

type EventType = Event['type'] | 'All';

const EVENT_TYPES: EventType[] = ['All', 'Networking', 'Catchup', 'Internship Opportunity', 'Mentorship Opportunity'];

interface EventFiltersProps {
  activeType: EventType;
  onChange: (type: EventType) => void;
}

export function EventFilters({ activeType, onChange }: EventFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {EVENT_TYPES.map((type) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            activeType === type
              ? 'bg-wisdom-highlight text-white'
              : 'bg-wisdom-primary/20 text-wisdom-sidebar hover:bg-wisdom-primary/30'
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
}
