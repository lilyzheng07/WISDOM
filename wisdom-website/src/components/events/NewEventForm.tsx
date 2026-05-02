import { useForm } from 'react-hook-form';
import { useEventStore } from '../../stores/eventStore';
import type { NewEventData } from '../../types';
import { X } from 'lucide-react';

interface NewEventFormProps {
  onClose: () => void;
}

export function NewEventForm({ onClose }: NewEventFormProps) {
  const { addEvent } = useEventStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<NewEventData>();

  const onSubmit = (data: NewEventData) => {
    const success = addEvent(data);
    if (success) {
      onClose();
    } else {
      setError('root', { message: 'Failed to create event. Please check all fields.' });
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-wisdom-sidebar">Create Event</h2>
          <button onClick={onClose} className="text-wisdom-text/40 hover:text-wisdom-text transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('title', { required: 'Title is required.' })}
            />
            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Type</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('type', { required: 'Type is required.' })}
            >
              <option value="">Select type...</option>
              <option value="Networking">Networking</option>
              <option value="Catchup">Catchup</option>
              <option value="Internship Opportunity">Internship Opportunity</option>
              <option value="Mentorship Opportunity">Mentorship Opportunity</option>
            </select>
            {errors.type && <p className="text-red-600 text-xs mt-1">{errors.type.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-wisdom-text mb-1">Date</label>
              <input
                type="date"
                min={today}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
                {...register('date', {
                  required: 'Date is required.',
                  validate: (v) => v > today || 'Date must be in the future.',
                })}
              />
              {errors.date && <p className="text-red-600 text-xs mt-1">{errors.date.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-wisdom-text mb-1">Time</label>
              <input
                type="time"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
                {...register('time', { required: 'Time is required.' })}
              />
              {errors.time && <p className="text-red-600 text-xs mt-1">{errors.time.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Location (city)</label>
            <input
              type="text"
              placeholder="e.g. Sydney"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('location', { required: 'Location is required.' })}
            />
            {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Description</label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary resize-none"
              {...register('description', { required: 'Description is required.' })}
            />
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}
          </div>

          {errors.root && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {errors.root.message}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-wisdom-text hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 bg-wisdom-highlight text-white rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors disabled:opacity-50"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
