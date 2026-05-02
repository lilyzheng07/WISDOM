import { useState } from 'react';
import { STEM_TAXONOMY, STEM_CATEGORIES } from '../../data/constants';
import type { STEMCategory, UserDiscipline } from '../../types';
import { Check } from 'lucide-react';

interface DisciplineSelectorProps {
  value: UserDiscipline[];
  onChange: (disciplines: UserDiscipline[]) => void;
}

export function DisciplineSelector({ value, onChange }: DisciplineSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<STEMCategory>(STEM_CATEGORIES[0]);

  const getSelectedSubFields = (category: STEMCategory): string[] => {
    return value.find((d) => d.category === category)?.subFields ?? [];
  };

  const toggleSubField = (category: STEMCategory, subField: string) => {
    const current = getSelectedSubFields(category);
    const updated = current.includes(subField)
      ? current.filter((sf) => sf !== subField)
      : [...current, subField];

    const newDisciplines = value.filter((d) => d.category !== category);
    if (updated.length > 0) {
      newDisciplines.push({ category, subFields: updated });
    }
    onChange(newDisciplines);
  };

  return (
    <div className="space-y-3">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {STEM_CATEGORIES.map((cat) => {
          const selectedCount = getSelectedSubFields(cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-wisdom-sidebar text-white'
                  : 'bg-wisdom-primary/20 text-wisdom-sidebar hover:bg-wisdom-primary/30'
              }`}
            >
              {cat}
              {selectedCount > 0 && (
                <span className="ml-1.5 bg-wisdom-highlight text-white text-xs rounded-full px-1.5 py-0.5">
                  {selectedCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-fields for active category */}
      <div className="grid grid-cols-2 gap-2">
        {STEM_TAXONOMY[activeCategory].map((subField) => {
          const isSelected = getSelectedSubFields(activeCategory).includes(subField);
          return (
            <button
              key={subField}
              type="button"
              onClick={() => toggleSubField(activeCategory, subField)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm border transition-colors ${
                isSelected
                  ? 'bg-wisdom-highlight/10 border-wisdom-highlight text-wisdom-highlight font-medium'
                  : 'bg-white border-gray-200 text-wisdom-text hover:border-wisdom-primary'
              }`}
            >
              {isSelected && <Check size={14} />}
              {subField}
            </button>
          );
        })}
      </div>

      {value.length === 0 && (
        <p className="text-sm text-wisdom-text/50">Select at least one sub-field to continue.</p>
      )}
    </div>
  );
}
