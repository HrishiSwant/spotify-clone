'use client';
import Link from 'next/link';

export default function PlaylistCard({ item }) {
  if (!item) return null;
  return (
    <Link
      href={`/playlist/${item.id}`}
      className="bg-neutral-900 hover:bg-neutral-800 transition rounded-lg p-4 block"
    >
      {item.images?.[0] && (
        <img
          src={item.images[0].url}
          alt={item.name}
          className="w-full aspect-square object-cover rounded mb-3"
        />
      )}
      <p className="font-bold truncate">{item.name}</p>
      <p className="text-sm text-neutral-400 truncate">
        {item.description || item.owner?.display_name}
      </p>
    </Link>
  );
}
