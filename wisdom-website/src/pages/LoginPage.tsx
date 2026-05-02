import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';

export function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-wisdom-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wisdom-sidebar mb-2">Welcome back</h1>
          <p className="text-wisdom-text/70">Sign in to your WISDOM account</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-wisdom-primary/20 p-8">
          <LoginForm />
          <p className="text-center text-sm text-wisdom-text/60 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-wisdom-highlight font-medium hover:underline">
              Sign up
            </Link>
          </p>
          <div className="mt-4 p-3 bg-wisdom-primary/10 rounded-lg text-xs text-wisdom-text/60">
            <p className="font-medium mb-1">Demo accounts:</p>
            <p>Admin: admin@wisdom.org / admin123</p>
            <p>Adult: demo@wisdom.org / demo123</p>
            <p>Minor (16): demo.minor@wisdom.org / demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
