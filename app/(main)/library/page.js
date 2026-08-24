'use client';

import { useEffect, useState } from 'react';

import PlaylistCard from '@/components/playlist/PlaylistCard';

import user from '@/lib/spotify/user';

export default function LibraryPage() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLibrary() {
      try {
        const data = await user.playlists();
        setPlaylists(data.items || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadLibrary();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading your library...
      </div>
    );
  }

  return (
    <div className="p-8 pb-28">

      <h1 className="text-4xl font-bold">
        Your Library
      </h1>

      <p className="mb-8 mt-2 text-neutral-400">
        {playlists.length} playlist{playlists.length !== 1 ? 's' : ''}
      </p>

      {playlists.length === 0 ? (
        <p className="text-neutral-400">
          No playlists found.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist.id}
              playlist={playlist}
            />
          ))}
        </div>
      )}

    </div>
  );
}
