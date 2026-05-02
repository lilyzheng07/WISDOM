import { useState } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { DisciplineSelector } from '../auth/DisciplineSelector';
import { TagSelector } from '../auth/TagSelector';
import type { UserDiscipline } from '../../types';
import { X } from 'lucide-react';

interface EditProfileModalProps {
  onClose: () => void;
}

export function EditProfileModal({ onClose }: EditProfileModalProps) {
  const { currentUser, updateCurrentUser } = useAuthStore();
  if (!currentUser) return null;

  const [location, setLocation] = useState(currentUser.location);
  const [disciplines, setDisciplines] = useState<UserDiscipline[]>(currentUser.disciplines);
  const [tags, setTags] = useState<string[]>(currentUser.tags);
  const [participationRole, setParticipationRole] = useState(currentUser.participationRole);

  const handleSave = () => {
    updateCurrentUser({ ...currentUser, location, disciplines, tags, participationRole });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-wisdom-sidebar">Edit Profile</h2>
          <button onClick={onClose} className="text-wisdom-text/40 hover:text-wisdom-text transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">City</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
            />
          </div>

          <div>
            <p className="text-sm font-medium text-wisdom-text mb-2">STEM Disciplines</p>
            <DisciplineSelector value={disciplines} onChange={setDisciplines} />
          </div>

          <div>
            <p className="text-sm font-medium text-wisdom-text mb-2">Tags</p>
            <TagSelector value={tags} onChange={setTags} />
          </div>

          <div>
            <p className="text-sm font-medium text-wisdom-text mb-2">Participation Role</p>
            <div className="grid grid-cols-2 gap-3">
              {(['seeking_help', 'here_to_help'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setParticipationRole(role)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-colors ${
                    participationRole === role
                      ? 'bg-wisdom-highlight/10 border-wisdom-highlight text-wisdom-highlight'
                      : 'bg-white border-gray-200 text-wisdom-text hover:border-wisdom-primary'
                  }`}
                >
                  {role === 'seeking_help' ? 'Seeking Help' : 'Here to Help'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded-lg text-sm text-wisdom-text hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 py-2 bg-wisdom-highlight text-white rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
