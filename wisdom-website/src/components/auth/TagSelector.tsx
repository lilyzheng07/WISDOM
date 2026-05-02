import { PREDEFINED_TAGS } from '../../data/constants';

interface TagSelectorProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagSelector({ value, onChange }: TagSelectorProps) {
  const toggle = (tagId: string) => {
    onChange(value.includes(tagId) ? value.filter((t) => t !== tagId) : [...value, tagId]);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {PREDEFINED_TAGS.map((tag) => {
        const isSelected = value.includes(tag.id);
        return (
          <button
            key={tag.id}
            type="button"
            onClick={() => toggle(tag.id)}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              isSelected
                ? 'bg-wisdom-highlight text-white'
                : 'bg-wisdom-primary/20 text-wisdom-sidebar hover:bg-wisdom-primary/30'
            }`}
          >
            {tag.label}
          </button>
        );
      })}
    </div>
  );
}
