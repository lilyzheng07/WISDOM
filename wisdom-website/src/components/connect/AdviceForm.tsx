import { useForm } from 'react-hook-form';
import { useConnectStore } from '../../stores/connectStore';

interface AdviceFormProps {
  targetUserId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

interface AdviceFormData {
  question: string;
}

export function AdviceForm({ targetUserId, onSuccess, onCancel }: AdviceFormProps) {
  const { sendAdviceQuestion } = useConnectStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AdviceFormData>();

  const onSubmit = (data: AdviceFormData) => {
    sendAdviceQuestion(targetUserId, data.question);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-wisdom-text mb-1">Your question</label>
        <textarea
          rows={4}
          placeholder="What would you like to ask?"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary resize-none"
          {...register('question', {
            required: 'Question is required.',
            minLength: { value: 10, message: 'Question must be at least 10 characters.' },
          })}
        />
        {errors.question && <p className="text-red-600 text-xs mt-1">{errors.question.message}</p>}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-wisdom-text hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 py-2 bg-wisdom-highlight text-white rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors disabled:opacity-50"
        >
          Send Question
        </button>
      </div>
    </form>
  );
}
