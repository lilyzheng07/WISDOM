import { useAuthStore } from '../../stores/authStore';
import { dataService } from '../../services/dataService';
import { UserPlus, UserMinus } from 'lucide-react';

interface FollowButtonProps {
  targetUserId: string;
}

export function FollowButton({ targetUserId }: FollowButtonProps) {
  const { currentUser, updateCurrentUser } = useAuthStore();

  if (!currentUser || currentUser.id === targetUserId) return null;

  const isFollowing = currentUser.following.includes(targetUserId);

  const handleToggle = () => {
    const updated = {
      ...currentUser,
      following: isFollowing
        ? currentUser.following.filter((id) => id !== targetUserId)
        : [...currentUser.following, targetUserId],
    };
    updateCurrentUser(updated);
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        isFollowing
          ? 'bg-gray-100 text-wisdom-text hover:bg-gray-200'
          : 'bg-wisdom-highlight text-white hover:bg-wisdom-highlight/90'
      }`}
    >
      {isFollowing ? (
        <><UserMinus size={14} /> Unfollow</>
      ) : (
        <><UserPlus size={14} /> Follow</>
      )}
    </button>
  );
}
