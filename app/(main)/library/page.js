'use client';

import { useEffect, useState } from 'react';

import PlaylistGrid from '@/components/playlist/PlaylistGrid';

import playlists from '@/lib/spotify/playlists';

export default function LibraryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLibrary() {
      try {
        const data =
          await playlists.myPlaylists();

        setItems(data.items || []);
      } catch (err) {
        console.error(err);
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
    <div className="px-8 pt-8 pb-28">

      <h1 className="mb-8 text-3xl font-bold">
        Your Library
      </h1>

      <PlaylistGrid
        playlists={items}
      />

    </div>
  );
}
