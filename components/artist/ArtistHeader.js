'use client';

import Image from 'next/image';

export default function ArtistHeader({ artist }) {
  if (!artist) return null;

  const image =
    artist.images?.[0]?.url ||
    '/images/artist-placeholder.png';

  return (
    <div className="relative flex items-end gap-6 bg-gradient-to-b from-blue-700 to-[#121212] px-8 py-12">

      <div className="relative h-60 w-60 overflow-hidden rounded-full shadow-2xl">

        <Image
          src={image}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />

      </div>

      <div>

        <p className="text-sm font-semibold uppercase">
          Artist
        </p>

        <h1 className="mt-3 text-6xl font-black">
          {artist.name}
        </h1>

        <p className="mt-5 text-neutral-300">
          {artist.followers?.total?.toLocaleString() || 0} followers
        </p>

      </div>

    </div>
  );
}
