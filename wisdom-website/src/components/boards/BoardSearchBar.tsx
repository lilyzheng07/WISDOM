import { Search } from 'lucide-react';

interface BoardSearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function BoardSearchBar({ value, onChange }: BoardSearchBarProps) {
  return (
    <div className="relative">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-wisdom-text/40" />
      <input
        type="search"
        placeholder="Search boards..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wisdom-primary bg-white"
      />
    </div>
  );
}
