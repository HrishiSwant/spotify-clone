'use client';

import PlaylistCard from './PlaylistCard';

export default function PlaylistGrid({
  playlists = [],
}) {
  if (!playlists.length) {
    return (
      <div className="py-16 text-center text-neutral-500">
        No playlists found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-6">
      {playlists.map((playlist) => (
        <PlaylistCard
          key={playlist.id}
          playlist={playlist}
        />
      ))}
    </div>
  );
}
