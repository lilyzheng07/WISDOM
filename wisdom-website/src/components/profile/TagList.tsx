import { PREDEFINED_TAGS } from '../../data/constants';

interface TagListProps {
  tagIds: string[];
}

export function TagList({ tagIds }: TagListProps) {
  const tags = tagIds.map((id) => PREDEFINED_TAGS.find((t) => t.id === id)).filter(Boolean);

  if (tags.length === 0) {
    return <p className="text-wisdom-text/50 text-sm">No tags selected.</p>;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => tag && (
        <span key={tag.id} className="text-xs px-3 py-1 bg-wisdom-highlight/10 text-wisdom-highlight rounded-full border border-wisdom-highlight/20">
          {tag.label}
        </span>
      ))}
    </div>
  );
}
