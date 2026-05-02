import { Link } from 'react-router-dom';
import { MessageSquare, Users, Calendar, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    icon: MessageSquare,
    title: 'Discussion Boards',
    description: 'Engage in STEM-focused discussions, ask questions, and share knowledge with a supportive community.',
  },
  {
    icon: Users,
    title: 'Professional Networking',
    description: 'Connect with STEM professionals, send connection requests, and seek advice from experienced mentors.',
  },
  {
    icon: Calendar,
    title: 'Events & Opportunities',
    description: 'Discover networking events, internship opportunities, and mentorship programs in your area.',
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-wisdom-white text-wisdom-text">
      {/* Hero */}
      <section className="bg-gradient-to-br from-wisdom-primary to-wisdom-sidebar text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">WISDOM</h1>
        <p className="text-2xl font-light mb-2">The future for the wise</p>
        <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
          A community platform connecting women and allies in STEM — for discussion, networking, mentorship, and career growth.
        </p>
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 bg-white text-wisdom-sidebar font-semibold px-8 py-3 rounded-lg hover:bg-wisdom-white/90 transition-colors text-lg"
        >
          Join the Community <ArrowRight size={20} />
        </Link>
        <p className="mt-4 text-sm opacity-80">
          Already a member?{' '}
          <Link to="/login" className="underline hover:opacity-100">
            Sign in
          </Link>
        </p>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-wisdom-sidebar">What WISDOM offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-xl p-6 shadow-sm border border-wisdom-primary/20 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-wisdom-primary/20 rounded-lg flex items-center justify-center mb-4">
                <Icon size={24} className="text-wisdom-sidebar" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-wisdom-sidebar">{title}</h3>
              <p className="text-wisdom-text/80 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-wisdom-sidebar text-white py-8 px-6 text-center">
        <p className="mb-2 text-sm opacity-80">WISDOM — The future for the wise</p>
        <div className="flex justify-center gap-6 text-sm">
          <Link to="/meet-the-team" className="hover:underline opacity-80 hover:opacity-100">
            Meet the Team
          </Link>
          <Link to="/signup" className="hover:underline opacity-80 hover:opacity-100">
            Join WISDOM
          </Link>
        </div>
      </footer>
    </div>
  );
}
