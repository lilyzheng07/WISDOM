import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { DisciplineSelector } from './DisciplineSelector';
import { TagSelector } from './TagSelector';
import type { UserDiscipline } from '../../types';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Step1Data {
  fullName: string;
  email: string;
  password: string;
  age: number;
  location: string;
}

export function SignUpForm() {
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [disciplines, setDisciplines] = useState<UserDiscipline[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [participationRole, setParticipationRole] = useState<'seeking_help' | 'here_to_help'>('seeking_help');
  const [disciplineError, setDisciplineError] = useState('');
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<Step1Data>({ mode: 'onBlur' });

  const handleNext = async () => {
    if (step === 1) {
      const valid = await trigger(['fullName', 'email', 'password', 'age', 'location']);
      if (valid) setStep(2);
    } else if (step === 2) {
      const hasSubField = disciplines.some((d) => d.subFields.length > 0);
      if (!hasSubField) {
        setDisciplineError('Please select at least one sub-field.');
        return;
      }
      setDisciplineError('');
      setStep(3);
    }
  };

  const onSubmit = (data: Step1Data) => {
    const result = registerUser({
      fullName: data.fullName,
      email: data.email,
      password: data.password,
      age: Number(data.age),
      location: data.location,
      disciplines,
      tags,
      participationRole,
    });
    if (result.success) {
      navigate('/home');
    } else {
      setSubmitError(result.error ?? 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              s === step
                ? 'bg-wisdom-highlight text-white'
                : s < step
                ? 'bg-wisdom-primary text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s}
          </div>
        ))}
      </div>

      {/* Step 1: Basic info */}
      {step === 1 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-wisdom-sidebar">Your details</h2>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-wisdom-text mb-1">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('fullName', {
                required: 'Full name is required.',
                minLength: { value: 2, message: 'Name must be at least 2 characters.' },
              })}
            />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-wisdom-text mb-1">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('email', {
                required: 'Email is required.',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
              })}
            />
            {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-wisdom-text mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('password', {
                required: 'Password is required.',
                minLength: { value: 6, message: 'Password must be at least 6 characters.' },
              })}
            />
            {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label htmlFor="age" className="block text-sm font-medium text-wisdom-text mb-1">
              Age
            </label>
            <input
              id="age"
              type="number"
              min={15}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('age', {
                required: 'Age is required.',
                min: { value: 15, message: 'You must be at least 15 years old to join WISDOM.' },
                validate: (v) => Number.isInteger(Number(v)) || 'Age must be a whole number.',
              })}
            />
            {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>}
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-wisdom-text mb-1">
              City
            </label>
            <input
              id="location"
              type="text"
              placeholder="e.g. Sydney"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
              {...register('location', { required: 'City is required.' })}
            />
            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className="w-full flex items-center justify-center gap-2 bg-wisdom-highlight text-white py-2.5 rounded-lg font-semibold hover:bg-wisdom-highlight/90 transition-colors"
          >
            Next <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* Step 2: Disciplines */}
      {step === 2 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-wisdom-sidebar">Your STEM disciplines</h2>
          <p className="text-sm text-wisdom-text/70">
            Select the categories and sub-fields that match your interests.
          </p>
          <DisciplineSelector value={disciplines} onChange={setDisciplines} />
          {disciplineError && <p className="text-red-600 text-sm">{disciplineError}</p>}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex items-center gap-1 px-4 py-2.5 border border-gray-300 rounded-lg text-wisdom-text hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-wisdom-highlight text-white py-2.5 rounded-lg font-semibold hover:bg-wisdom-highlight/90 transition-colors"
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Tags & role */}
      {step === 3 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-wisdom-sidebar">Interests & participation</h2>

          <div>
            <p className="text-sm font-medium text-wisdom-text mb-2">Tags (optional)</p>
            <TagSelector value={tags} onChange={setTags} />
          </div>

          <div>
            <p className="text-sm font-medium text-wisdom-text mb-2">I am joining WISDOM to…</p>
            <div className="grid grid-cols-2 gap-3">
              {(['seeking_help', 'here_to_help'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setParticipationRole(role)}
                  className={`py-3 px-4 rounded-lg border text-sm font-medium transition-colors ${
                    participationRole === role
                      ? 'bg-wisdom-highlight/10 border-wisdom-highlight text-wisdom-highlight'
                      : 'bg-white border-gray-200 text-wisdom-text hover:border-wisdom-primary'
                  }`}
                >
                  {role === 'seeking_help' ? '🙋 Seek help & guidance' : '🤝 Help others'}
                </button>
              ))}
            </div>
          </div>

          {submitError && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {submitError}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="flex items-center gap-1 px-4 py-2.5 border border-gray-300 rounded-lg text-wisdom-text hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={18} /> Back
            </button>
            <button
              type="submit"
              className="flex-1 bg-wisdom-highlight text-white py-2.5 rounded-lg font-semibold hover:bg-wisdom-highlight/90 transition-colors"
            >
              Create Account
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
