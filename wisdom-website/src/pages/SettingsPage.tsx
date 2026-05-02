import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';

export function SettingsPage() {
  const { currentUser, updateCurrentUser } = useAuthStore();
  const [fullName, setFullName] = useState(currentUser?.fullName ?? '');
  const [location, setLocation] = useState(currentUser?.location ?? '');
  const [saved, setSaved] = useState(false);

  if (!currentUser) return null;

  const handleSave = () => {
    updateCurrentUser({ ...currentUser, fullName: fullName.trim(), location: location.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-wisdom-sidebar mb-6">Settings</h1>

      <div className="bg-white rounded-xl p-6 border border-wisdom-primary/20 mb-6">
        <h2 className="text-base font-semibold text-wisdom-sidebar mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-wisdom-text mb-1">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
            />
          </div>
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
            <label className="block text-sm font-medium text-wisdom-text mb-1">Email</label>
            <input
              type="email"
              value={currentUser.email}
              disabled
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-wisdom-text/50 cursor-not-allowed"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-wisdom-highlight text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-wisdom-highlight/90 transition-colors"
          >
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 border border-wisdom-primary/20">
        <h2 className="text-base font-semibold text-wisdom-sidebar mb-4">Account Info</h2>
        <div className="space-y-2 text-sm text-wisdom-text/70">
          <p>Role: <span className="font-medium text-wisdom-sidebar capitalize">{currentUser.role}</span></p>
          <p>Age: <span className="font-medium text-wisdom-sidebar">{currentUser.age}</span></p>
          {currentUser.isMinor && (
            <p className="text-yellow-600 text-xs bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
              Your account has minor-safe content restrictions applied.
            </p>
          )}
          <p>Member since: <span className="font-medium text-wisdom-sidebar">{new Date(currentUser.createdAt).toLocaleDateString()}</span></p>
        </div>
      </div>
    </div>
  );
}
