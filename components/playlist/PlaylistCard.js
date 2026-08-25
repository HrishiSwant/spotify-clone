'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Play, Loader2 } from 'lucide-react';

import usePlayback from '@/hooks/usePlayback';

import {
  getImage,
} from '@/lib/utils';

export default function PlaylistCard({
  playlist,
}) {
  const playback = usePlayback();

  const [loading, setLoading] =
    useState(false);

  async function handlePlay(e) {
    e.preventDefault();
    e.stopPropagation();

    if (loading) return;

    try {
      setLoading(true);

      await playback.playPlaylist(
        playlist.uri,
        0
      );
    } catch (err) {
      console.error(
        'Unable to play playlist',
        err
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="group rounded-lg bg-[#181818] p-4 transition hover:bg-[#282828]"
    >
      <div className="relative">

        <img
          src={getImage(playlist.images)}
          alt={playlist.name}
          className="aspect-square w-full rounded-md object-cover shadow-xl"
        />

        <button
          onClick={handlePlay}
          disabled={loading}
          className="absolute bottom-2 right-2 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-[#1DB954] text-black opacity-0 shadow-xl transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-100"
        >
          {loading ? (
            <Loader2
              size={20}
              className="animate-spin"
            />
          ) : (
            <Play
              size={20}
              fill="currentColor"
            />
          )}
        </button>

      </div>

      <h3 className="mt-4 truncate font-semibold text-white">
        {playlist.name}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
        {playlist.description ||
          'Spotify Playlist'}
      </p>
    </Link>
  );
}
