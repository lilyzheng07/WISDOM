import { useState, useCallback } from 'react';
import { dataService } from '../../services/dataService';
import { useAdminStore } from '../../stores/adminStore';
import { ToggleLeft, ToggleRight, Save } from 'lucide-react';

export function SponsorManagement() {
  const { toggleSponsor, updateSettings } = useAdminStore();
  const [, setTick] = useState(0);
  const refresh = useCallback(() => setTick((n) => n + 1), []);
  const [settings, setSettings] = useState(dataService.getSettings());
  const [saved, setSaved] = useState(false);

  const sponsors = dataService.getSponsors();

  const handleToggle = (id: string, active: boolean) => { toggleSponsor(id, active); refresh(); };

  const handleSaveSettings = () => {
    updateSettings(settings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Google Form URLs */}
      <div className="bg-white rounded-xl p-5 border border-wisdom-primary/20">
        <h3 className="text-sm font-semibold text-wisdom-sidebar mb-3">Google Form URLs</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-wisdom-text mb-1">Contact Form URL (Meet the Team)</label>
            <input
              type="url"
              value={settings.contactFormUrl}
              onChange={(e) => setSettings({ ...settings, contactFormUrl: e.target.value })}
              placeholder="https://docs.google.com/forms/..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-wisdom-text mb-1">Sponsor Enquiry Form URL</label>
            <input
              type="url"
              value={settings.sponsorFormUrl}
              onChange={(e) => setSettings({ ...settings, sponsorFormUrl: e.target.value })}
              placeholder="https://docs.google.com/forms/..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary"
            />
          </div>
          <button
            onClick={handleSaveSettings}
            className="flex items-center gap-2 bg-wisdom-highlight text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-wisdom-highlight/90 transition-colors"
          >
            <Save size={14} /> {saved ? 'Saved!' : 'Save URLs'}
          </button>
        </div>
      </div>

      {/* Sponsors list */}
      <div className="space-y-2">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-wisdom-primary/20">
            <div>
              <p className="text-sm font-medium text-wisdom-sidebar">{sponsor.name}</p>
              <p className="text-xs text-wisdom-text/60 mt-0.5">{sponsor.tagline}</p>
            </div>
            <button
              onClick={() => handleToggle(sponsor.id, !sponsor.isActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                sponsor.isActive
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {sponsor.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
              {sponsor.isActive ? 'Active' : 'Inactive'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
