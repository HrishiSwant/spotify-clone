'use client';

import Image from 'next/image';

export default function AlbumHeader({ album }) {
  if (!album) return null;

  const image =
    album.images?.[0]?.url ||
    '/images/album-placeholder.png';

  return (
    <div className="flex items-end gap-6 bg-gradient-to-b from-indigo-700 to-[#121212] px-8 py-12">

      <div className="relative h-60 w-60 overflow-hidden rounded-lg shadow-2xl">
        <Image
          src={image}
          alt={album.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <div>

        <p className="text-sm font-semibold uppercase">
          Album
        </p>

        <h1 className="mt-3 text-6xl font-black">
          {album.name}
        </h1>

        <p className="mt-4 text-neutral-300">
          {album.artists?.map((artist) => artist.name).join(', ')}
        </p>

        <p className="mt-2 text-sm text-neutral-400">
          {album.release_date}
        </p>

      </div>

    </div>
  );
}
