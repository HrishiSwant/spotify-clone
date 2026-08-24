'use client';

import AlbumCard from './AlbumCard';

export default function AlbumGrid({ albums = [] }) {
  if (!albums.length) {
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400">
        No albums available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
        />
      ))}
    </div>
  );
}
