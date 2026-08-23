'use client';

import { useEffect, useState } from 'react';

import PlaylistTracks from '@/components/playlist/PlaylistTracks';

import user from '@/lib/spotify/user';

export default function TopTracksPage() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopTracks() {
      try {
        const data = await user.topTracks();
        setTracks(data.items || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTopTracks();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading top tracks...
      </div>
    );
  }

  return (
    <div className="pb-28">

      <div className="bg-gradient-to-b from-orange-700 to-[#121212] px-8 py-12">

        <p className="text-sm font-semibold uppercase">
          Your Music
        </p>

        <h1 className="mt-4 text-6xl font-black">
          Top Tracks
        </h1>

        <p className="mt-5 text-neutral-300">
          {tracks.length} tracks
        </p>

      </div>

      <PlaylistTracks
        tracks={tracks}
      />

    </div>
  );
}