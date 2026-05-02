import { useForm } from 'react-hook-form';
import { useEnquiryStore } from '../../stores/enquiryStore';

interface EnquiryFormProps {
  onSuccess?: () => void;
}

interface EnquiryFormData {
  description: string;
}

export function EnquiryForm({ onSuccess }: EnquiryFormProps) {
  const { submitEnquiry } = useEnquiryStore();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormData>();

  const onSubmit = (data: EnquiryFormData) => {
    const success = submitEnquiry(data.description);
    if (success) {
      reset();
      onSuccess?.();
    } else {
      setError('description', { message: 'Please enter a description for your enquiry.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-wisdom-text mb-1">
          Describe your need or question
        </label>
        <textarea
          rows={5}
          placeholder="Tell us what you need help with..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary resize-none"
          {...register('description', {
            required: 'Please enter a description.',
            minLength: { value: 10, message: 'Description must be at least 10 characters.' },
            validate: (v) => v.trim().length > 0 || 'Description cannot be empty.',
          })}
        />
        {errors.description && <p className="text-red-600 text-xs mt-1">{errors.description.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-wisdom-highlight text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors disabled:opacity-50"
      >
        Submit Enquiry
      </button>
    </form>
  );
}
