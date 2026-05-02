import { useForm } from 'react-hook-form';
import { useBoardStore } from '../../stores/boardStore';

interface ReplyFormProps {
  threadId: string;
  parentReplyId?: string | null;
  onSuccess?: () => void;
}

interface ReplyFormData {
  content: string;
}

export function ReplyForm({ threadId, parentReplyId = null, onSuccess }: ReplyFormProps) {
  const { addReply } = useBoardStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReplyFormData>();

  const onSubmit = (data: ReplyFormData) => {
    addReply({ threadId, content: data.content, parentReplyId });
    reset();
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <textarea
        rows={3}
        placeholder="Write your reply..."
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary resize-none"
        {...register('content', { required: 'Reply cannot be empty.' })}
      />
      {errors.content && <p className="text-red-600 text-xs">{errors.content.message}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-wisdom-highlight text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors disabled:opacity-50"
      >
        Post Reply
      </button>
    </form>
  );
}
