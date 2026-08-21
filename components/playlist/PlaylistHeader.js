'use client';

import { Play, Clock3 } from 'lucide-react';

import usePlayback from '@/hooks/usePlayback';

import {
  getImage,
  formatFollowers,
  formatDuration,
} from '@/lib/utils';

export default function PlaylistHeader({
  playlist,
}) {
  const playback = usePlayback();

  if (!playlist) return null;

  const tracks =
    playlist.tracks?.items || [];

  const totalDuration = tracks.reduce(
    (sum, item) =>
      sum + (item.track?.duration_ms || 0),
    0
  );

  async function handlePlay() {
    await playback.playPlaylist(
      playlist.uri,
      0
    );
  }

  return (
    <div>

      <div className="flex items-end gap-6 p-8">

        <img
          src={getImage(playlist.images)}
          alt={playlist.name}
          className="h-60 w-60 rounded shadow-2xl object-cover"
        />

        <div>

          <p className="text-sm font-semibold uppercase">
            Playlist
          </p>

          <h1 className="mt-3 text-6xl font-black">
            {playlist.name}
          </h1>

          {playlist.description && (
            <p className="mt-5 text-neutral-300">
              {playlist.description}
            </p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-neutral-300">

            <span className="font-semibold text-white">
              {playlist.owner?.display_name}
            </span>

            <span>•</span>

            <span>
              {formatFollowers(
                playlist.followers?.total
              )}{' '}
              likes
            </span>

            <span>•</span>

            <span>
              {playlist.tracks?.total} songs
            </span>

            <span>•</span>

            <Clock3 size={14} />

            <span>
              {formatDuration(
                totalDuration
              )}
            </span>

          </div>

        </div>

      </div>

      <div className="px-8 pb-6">

        <button
          onClick={handlePlay}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1DB954] text-black transition hover:scale-105"
        >
          <Play
            fill="currentColor"
            size={26}
          />
        </button>

      </div>

    </div>
  );
}
