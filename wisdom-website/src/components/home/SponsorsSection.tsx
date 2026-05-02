import { useEffect, useState } from 'react';
import { dataService } from '../../services/dataService';
import type { Sponsor } from '../../types';
import { Building2 } from 'lucide-react';

export function SponsorsSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    setSponsors(dataService.getSponsors().filter((s) => s.isActive));
  }, []);

  if (sponsors.length === 0) return null;

  return (
    <section className="mt-6">
      <h2 className="text-sm font-semibold text-wisdom-text/50 uppercase tracking-wide mb-3">Our Sponsors</h2>
      <div className="flex flex-wrap gap-3">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.id}
            className="flex items-center gap-2 bg-white border border-wisdom-primary/20 rounded-lg px-4 py-2 hover:border-wisdom-primary transition-colors"
          >
            <Building2 size={16} className="text-wisdom-primary shrink-0" />
            <div>
              <p className="text-sm font-medium text-wisdom-sidebar">{sponsor.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
