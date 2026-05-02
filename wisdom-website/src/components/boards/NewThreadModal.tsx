import { useForm } from 'react-hook-form';
import { useBoardStore } from '../../stores/boardStore';
import { X } from 'lucide-react';

interface NewThreadModalProps {
  boardId: string;
  onClose: () => void;
}

interface ThreadFormData {
  title: string;
  detailQuestions: string;
  description: string;
}

export function NewThreadModal({ boardId, onClose }: NewThreadModalProps) {
  const { addThread } = useBoardStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ThreadFormData>();

  const onSubmit = (data: ThreadFormData) => {
    addThread({ boardId, ...data, tags: [] });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-wisdom-sidebar">New Discussion</h2>
          <button onClick={onClose} className="text-wisdom-text/40 hover:text-wisdom-text transition-colors">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Topic title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('title', {
                required: 'Title is required.',
                minLength: { value: 5, message: 'Title must be at least 5 characters.' },
              })}
            />
            {errors.title && <p className="text-red-600 text-xs mt-1">{errors.title.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Detail questions</label>
            <input
              type="text"
              placeholder="What specific questions do you have?"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('detailQuestions')}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Description</label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary resize-none"
              {...register('description', {
                required: 'Description is required.',
                minLength: { value: 20, message: 'Description must be at least 20 characters.' },
              })}
            />
            {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}
          </div>
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
              Post Discussion
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
