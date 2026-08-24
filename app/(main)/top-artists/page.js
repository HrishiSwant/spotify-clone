'use client';

import { useEffect, useState } from 'react';

import ArtistCard from '@/components/artist/ArtistCard';

import user from '@/lib/spotify/user';

export default function TopArtistsPage() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopArtists() {
      try {
        const data = await user.topArtists();
        setArtists(data.items || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadTopArtists();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading top artists...
      </div>
    );
  }

  return (
    <div className="pb-10">

      <div className="bg-gradient-to-b from-green-700 to-[#121212] px-8 py-12">

        <p className="text-sm font-semibold uppercase">
          Your Music
        </p>

        <h1 className="mt-4 text-6xl font-black">
          Top Artists
        </h1>

        <p className="mt-5 text-neutral-300">
          {artists.length} artists
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 p-8 md:grid-cols-4 lg:grid-cols-6">
        {artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            artist={artist}
          />
        ))}
      </div>

    </div>
  );
}
