'use client';

import Image from 'next/image';
import Link from 'next/link';

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
    currentTrack.album?.images?.[0]?.url ||
    '/images/placeholder.png';

  const artists =
    currentTrack.artists
      ?.map((artist) => artist.name)
      .join(', ') || '';

  return (
    <div className="flex min-w-0 items-center gap-4">

      <Link
        href={`/album/${currentTrack.album?.id}`}
        className="shrink-0"
      >
        <Image
          src={image}
          alt={currentTrack.name}
          width={56}
          height={56}
          className="rounded object-cover"
          priority
        />
      </Link>

      <div className="min-w-0 flex-1">

        <Link
          href={`/track/${currentTrack.id}`}
          className="block truncate text-sm font-medium text-white transition hover:underline"
        >
          {currentTrack.name}
        </Link>

        <div className="truncate text-xs text-neutral-400">
          {currentTrack.artists?.map(
            (artist, index) => (
              <span key={artist.id}>
                <Link
                  href={`/artist/${artist.id}`}
                  className="transition hover:text-white hover:underline"
                >
                  {artist.name}
                </Link>

                {index <
                  currentTrack.artists.length -
                    1 && ', '}
              </span>
            )
          )}
        </div>

      </div>

    </div>
  );
}
