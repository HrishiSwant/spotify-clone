'use client';
import { Search } from 'lucide-react';

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative max-w-md">
      <Search
        size={20}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What do you want to listen to?"
        className="w-full bg-neutral-800 rounded-full py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
}
