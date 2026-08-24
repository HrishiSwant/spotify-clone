'use client';

import { useEffect, useState } from 'react';

import PlaylistTracks from '@/components/playlist/PlaylistTracks';

import user from '@/lib/spotify/user';

export default function RecentlyPlayedPage() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecentlyPlayed() {
      try {
        const data = await user.recentlyPlayed();

        setTracks(
          (data.items || [])
            .map((item) => item.track)
            .filter(Boolean)
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadRecentlyPlayed();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading recently played...
      </div>
    );
  }

  return (
    <div className="pb-28">

      <div className="bg-gradient-to-b from-emerald-700 to-[#121212] px-8 py-12">

        <p className="text-sm font-semibold uppercase">
          History
        </p>

        <h1 className="mt-4 text-6xl font-black">
          Recently Played
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
