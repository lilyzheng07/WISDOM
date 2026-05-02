import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const onSubmit = (data: LoginFormData) => {
    const success = login(data.email, data.password);
    if (success) {
      navigate('/home');
    } else {
      setError('root', { message: 'Invalid email or password. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-wisdom-text mb-1">
          Email address
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
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
          autoComplete="current-password"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-wisdom-text focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
          {...register('password', { required: 'Password is required.' })}
        />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
      </div>

      {errors.root && (
        <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {errors.root.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-wisdom-highlight text-white py-2.5 rounded-lg font-semibold hover:bg-wisdom-highlight/90 transition-colors disabled:opacity-50"
      >
        Sign In
      </button>
    </form>
  );
}
