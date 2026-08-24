'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AlbumCard({ album }) {
  if (!album) return null;

  const image =
    album.images?.[0]?.url ||
    '/images/album-placeholder.png';

  return (
    <Link
      href={`/album/${album.id}`}
      className="group"
    >
      <div className="overflow-hidden rounded-lg bg-[#181818] p-4 transition-all duration-300 hover:bg-[#282828]">

        <div className="relative aspect-square w-full overflow-hidden rounded-md">
          <Image
            src={image}
            alt={album.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        <h3 className="mt-4 truncate font-semibold">
          {album.name}
        </h3>

        <p className="mt-1 truncate text-sm text-neutral-400">
          {album.artists?.map((artist) => artist.name).join(', ')}
        </p>

      </div>
    </Link>
  );
}
