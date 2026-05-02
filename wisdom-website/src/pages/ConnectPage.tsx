import { useEffect, useState } from 'react';
import { useConnectStore } from '../stores/connectStore';
import { useAuthStore } from '../stores/authStore';
import { ProfessionalCard } from '../components/connect/ProfessionalCard';
import { ChatOptionsModal } from '../components/connect/ChatOptionsModal';
import type { User } from '../types';
import { MapPin, Users } from 'lucide-react';

export function ConnectPage() {
  const { professionals, fetchProfessionals } = useConnectStore();
  const { currentUser } = useAuthStore();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchProfessionals();
  }, [fetchProfessionals]);

  const handleChat = (userId: string) => {
    const user = professionals.find((p) => p.id === userId);
    if (user) setSelectedUser(user);
  };

  const nearby = professionals.filter(
    (p) => p.location.toLowerCase() === (currentUser?.location ?? '').toLowerCase()
  );
  const others = professionals.filter(
    (p) => p.location.toLowerCase() !== (currentUser?.location ?? '').toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-wisdom-sidebar mb-6">Connecting Platform</h1>

      {/* Nearby professionals */}
      {nearby.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3 flex items-center gap-2">
            <MapPin size={18} /> Professionals Near You ({currentUser?.location})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {nearby.map((user) => (
              <ProfessionalCard key={user.id} user={user} onChat={handleChat} />
            ))}
          </div>
        </section>
      )}

      {/* All professionals */}
      <section>
        <h2 className="text-lg font-semibold text-wisdom-sidebar mb-3 flex items-center gap-2">
          <Users size={18} /> All Professionals
        </h2>
        {professionals.length === 0 ? (
          <p className="text-wisdom-text/50 text-sm">No connections yet. Start by exploring the Connecting Platform.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(nearby.length > 0 ? others : professionals).map((user) => (
              <ProfessionalCard key={user.id} user={user} onChat={handleChat} />
            ))}
          </div>
        )}
      </section>

      {selectedUser && (
        <ChatOptionsModal
          targetUserId={selectedUser.id}
          targetUserName={selectedUser.fullName}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
}
