'use client';

import PlaylistCard from './PlaylistCard';

export default function PlaylistGrid({
  title,
  items = [],
  type = 'playlist',
}) {
  if (!items.length) return null;

  return (
    <section className="space-y-5">
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold hover:underline cursor-pointer">
          {title}
        </h2>

        <button className="text-sm font-semibold text-neutral-400 hover:text-white">
          Show all
        </button>
      </div>

      <div className="grid gap-6 grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
        {items.map((item) => (
          <PlaylistCard
            key={item.id}
            item={item}
            type={type}
          />
        ))}
      </div>
    </section>
  );
}
