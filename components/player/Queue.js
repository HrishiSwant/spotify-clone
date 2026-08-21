'use client';

import { usePlayer } from '@/context/PlayerContext';
import { formatArtists } from '@/lib/utils';

export default function Queue() {
  const {
    queue = [],
    currentTrack,
    playTrack,
  } = usePlayer();

  if (!queue.length) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-500">
        Queue is empty
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b border-neutral-800 p-5">
        <h2 className="text-lg font-bold">
          Queue
        </h2>
      </div>

      <div className="divide-y divide-neutral-900">
        {queue.map((track, index) => {
          const active =
            currentTrack?.id === track.id;

          return (
            <button
              key={`${track.id}-${index}`}
              onClick={() =>
                playTrack(track, queue)
              }
              className={`flex w-full items-center gap-3 p-3 text-left transition ${
                active
                  ? 'bg-neutral-800'
                  : 'hover:bg-neutral-900'
              }`}
            >
              <img
                src={
                  track.album?.images?.[0]?.url ||
                  '/images/placeholder.png'
                }
                alt={track.name}
                className="h-12 w-12 rounded object-cover"
              />

              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    active
                      ? 'text-[#1DB954]'
                      : 'text-white'
                  }`}
                >
                  {track.name}
                </p>

                <p className="truncate text-xs text-neutral-400">
                  {formatArtists(track.artists)}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
