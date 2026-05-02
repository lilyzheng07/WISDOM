import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dataService } from '../services/dataService';
import { useAuthStore } from '../stores/authStore';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { DisciplineDisplay } from '../components/profile/DisciplineDisplay';
import { TagList } from '../components/profile/TagList';
import { FollowButton } from '../components/profile/FollowButton';
import { ConnectionsList } from '../components/profile/ConnectionsList';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import type { User } from '../types';
import { Edit } from 'lucide-react';

export function ProfilePage() {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuthStore();
  const [user, setUser] = useState<User | null>(null);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    if (userId) {
      setUser(dataService.getUserById(userId));
    }
  }, [userId, currentUser]);

  if (!user) return <div className="text-wisdom-text/50">User not found.</div>;

  const isOwnProfile = currentUser?.id === user.id;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl p-6 border border-wisdom-primary/20 mb-6">
        <div className="flex items-start justify-between">
          <ProfileHeader user={user} />
          <div className="flex gap-2 ml-4">
            {isOwnProfile ? (
              <button
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-wisdom-text hover:bg-gray-50 transition-colors"
              >
                <Edit size={14} /> Edit
              </button>
            ) : (
              <FollowButton targetUserId={user.id} />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-wisdom-primary/20">
          <h2 className="text-base font-semibold text-wisdom-sidebar mb-3">STEM Disciplines</h2>
          <DisciplineDisplay disciplines={user.disciplines} />
        </div>

        <div className="bg-white rounded-xl p-5 border border-wisdom-primary/20">
          <h2 className="text-base font-semibold text-wisdom-sidebar mb-3">Tags</h2>
          <TagList tagIds={user.tags} />
        </div>

        <div className="bg-white rounded-xl p-5 border border-wisdom-primary/20 md:col-span-2">
          <h2 className="text-base font-semibold text-wisdom-sidebar mb-3">Connections</h2>
          <ConnectionsList userId={user.id} />
        </div>
      </div>

      {showEdit && <EditProfileModal onClose={() => { setShowEdit(false); setUser(dataService.getUserById(userId!)); }} />}
    </div>
  );
}
