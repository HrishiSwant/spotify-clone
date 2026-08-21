'use client';

import TrackItem from '@/components/TrackItem';

export default function PlaylistTracks({
  tracks = [],
}) {
  if (!tracks.length) {
    return (
      <div className="py-20 text-center text-neutral-500">
        No tracks found.
      </div>
    );
  }

  return (
    <div className="mt-8">
      {/* Header */}

      <div className="grid grid-cols-[50px_5fr_3fr_1fr] gap-4 px-6 py-3 text-sm text-neutral-400 border-b border-neutral-800 sticky top-0 bg-[#121212] z-20">
        <span>#</span>

        <span>Title</span>

        <span>Album</span>

        <span className="text-right">
          Time
        </span>
      </div>

      {/* Tracks */}

      <div className="mt-2">
        {tracks.map((track, index) => (
          <TrackItem
            key={`${track.id}-${index}`}
            track={track}
            index={index}
            queue={tracks}
          />
        ))}
      </div>
    </div>
  );
}
