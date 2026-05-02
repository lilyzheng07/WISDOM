import type { UserDiscipline } from '../../types';

interface DisciplineDisplayProps {
  disciplines: UserDiscipline[];
}

export function DisciplineDisplay({ disciplines }: DisciplineDisplayProps) {
  if (disciplines.length === 0) {
    return <p className="text-wisdom-text/50 text-sm">No disciplines selected.</p>;
  }

  return (
    <div className="space-y-3">
      {disciplines.map((d) => (
        <div key={d.category}>
          <p className="text-sm font-medium text-wisdom-sidebar mb-1">{d.category}</p>
          <div className="flex flex-wrap gap-1.5">
            {d.subFields.map((sf) => (
              <span key={sf} className="text-xs px-2 py-1 bg-wisdom-primary/20 text-wisdom-sidebar rounded-full">
                {sf}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
