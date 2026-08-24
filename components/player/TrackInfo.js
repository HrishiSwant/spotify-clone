'use client';

import Image from 'next/image';

import { usePlayer } from '@/context/PlayerContext';

export default function TrackInfo() {
  const { currentTrack } = usePlayer();

  if (!currentTrack) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-14 w-14 rounded bg-neutral-800" />
        <div>
          <p className="text-sm text-white">
            Nothing playing
          </p>
          <p className="text-xs text-neutral-400">
            Start a song
          </p>
        </div>
      </div>
    );
  }

  const image =
    currentTrack.album?.images?.[0]?.url || '';

  const artists =
    currentTrack.artists
      ?.map((artist) => artist.name)
      .join(', ') || '';

  return (
    <div className="flex items-center gap-4">

      {image && (
        <Image
          src={image}
          alt={currentTrack.name}
          width={56}
          height={56}
          className="rounded"
        />
      )}

      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-white">
          {currentTrack.name}
        </p>

        <p className="truncate text-xs text-neutral-400">
          {artists}
        </p>
      </div>

    </div>
  );
}
