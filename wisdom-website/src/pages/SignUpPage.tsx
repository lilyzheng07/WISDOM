import { Link } from 'react-router-dom';
import { SignUpForm } from '../components/auth/SignUpForm';

export function SignUpPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-wisdom-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-wisdom-sidebar mb-2">Join WISDOM</h1>
          <p className="text-wisdom-text/70">Create your account and connect with the STEM community</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-wisdom-primary/20 p-8">
          <SignUpForm />
          <p className="text-center text-sm text-wisdom-text/60 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-wisdom-highlight font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
