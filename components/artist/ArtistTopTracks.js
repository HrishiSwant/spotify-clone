'use client';

import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function ArtistTopTracks({ tracks = [] }) {
  if (!tracks.length) {
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400">
        No top tracks found.
      </div>
    );
  }

  return (
    <section className="px-8 py-8">
      <h2 className="mb-6 text-2xl font-bold">
        Popular
      </h2>

      <PlaylistTracks
        tracks={tracks}
      />
    </section>
  );
}
