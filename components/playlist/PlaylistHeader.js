'use client';

import { Clock3 } from 'lucide-react';

export default function PlaylistHeader({
  playlist,
  trackCount = 0,
}) {
  if (!playlist) return null;

  return (
    <section className="relative">
      <div className="flex items-end gap-6 pb-8">
        <img
          src={
            playlist.images?.[0]?.url ||
            '/images/placeholder.png'
          }
          alt={playlist.name}
          className="w-60 h-60 rounded-md shadow-2xl object-cover"
        />

        <div className="flex flex-col gap-3">
          <span className="uppercase text-xs font-bold tracking-wider">
            Playlist
          </span>

          <h1 className="text-6xl font-black tracking-tight">
            {playlist.name}
          </h1>

          {playlist.description && (
            <p className="text-neutral-300 max-w-3xl">
              {playlist.description}
            </p>
          )}

          <div className="flex items-center gap-2 text-sm text-neutral-400">
            <span className="font-semibold text-white">
              {playlist.owner?.display_name}
            </span>

            <span>•</span>

            <span>{trackCount} songs</span>

            <span>•</span>

            <Clock3 size={14} />

            <span>
              {playlist.followers?.total?.toLocaleString?.() || 0}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
