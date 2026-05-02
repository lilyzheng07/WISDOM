import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="min-h-screen bg-wisdom-white flex flex-col items-center justify-center text-wisdom-text">
      <h1 className="text-6xl font-bold text-wisdom-primary mb-4">404</h1>
      <p className="text-xl mb-6">Page not found</p>
      <Link to="/home" className="bg-wisdom-highlight text-white px-6 py-2 rounded hover:bg-wisdom-highlight/90 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
