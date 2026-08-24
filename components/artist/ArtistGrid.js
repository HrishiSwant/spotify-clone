'use client';

import ArtistCard from './ArtistCard';

export default function ArtistGrid({ artists = [] }) {
  if (!artists.length) {
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400">
        No artists found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
      {artists.map((artist) => (
        <ArtistCard
          key={artist.id}
          artist={artist}
        />
      ))}
    </div>
  );
}
