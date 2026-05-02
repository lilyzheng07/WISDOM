import { useEffect, useState } from 'react';
import { dataService } from '../services/dataService';

const TEAM_MEMBERS = [
  { id: 1, name: 'Alexandra Chen', role: 'Founder & CEO', initials: 'AC' },
  { id: 2, name: 'Priya Sharma', role: 'Head of Community', initials: 'PS' },
  { id: 3, name: 'Dr. Maya Johnson', role: 'STEM Advisor', initials: 'MJ' },
  { id: 4, name: 'Zoe Williams', role: 'Platform Engineer', initials: 'ZW' },
  { id: 5, name: 'Fatima Hassan', role: 'Partnerships Lead', initials: 'FH' },
  { id: 6, name: 'Ingrid Larsson', role: 'UX Designer', initials: 'IL' },
];

export function MeetTheTeamPage() {
  const [contactFormUrl, setContactFormUrl] = useState('');

  useEffect(() => {
    const settings = dataService.getSettings();
    setContactFormUrl(settings.contactFormUrl);
  }, []);

  return (
    <div className="min-h-screen bg-wisdom-white text-wisdom-text">
      {/* Header */}
      <section className="bg-wisdom-primary py-16 px-6 text-center text-white">
        <h1 className="text-4xl font-bold mb-3">Meet the Team</h1>
        <p className="text-lg opacity-90 max-w-xl mx-auto">
          The passionate people behind WISDOM, dedicated to empowering women and allies in STEM.
        </p>
      </section>

      {/* Team Grid */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="bg-white rounded-xl p-6 shadow-sm border border-wisdom-primary/20 text-center hover:shadow-md transition-shadow">
              <div className="w-20 h-20 bg-wisdom-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">{member.initials}</span>
              </div>
              <h3 className="text-lg font-semibold text-wisdom-sidebar">{member.name}</h3>
              <p className="text-wisdom-text/70 text-sm mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4 text-wisdom-sidebar">Get in Touch</h2>
        <p className="text-center text-wisdom-text/70 mb-8">
          Have a question or want to collaborate? Reach out to the WISDOM team.
        </p>
        {contactFormUrl ? (
          <div className="rounded-xl overflow-hidden shadow-sm border border-wisdom-primary/20">
            <iframe
              src={contactFormUrl}
              title="Contact Form"
              width="100%"
              height="600"
              frameBorder="0"
              className="block"
            >
              Loading contact form…
            </iframe>
          </div>
        ) : (
          <div className="bg-wisdom-primary/10 rounded-xl p-8 text-center text-wisdom-text/60">
            <p>Contact form not yet configured. Please check back soon.</p>
          </div>
        )}
      </section>
    </div>
  );
}
