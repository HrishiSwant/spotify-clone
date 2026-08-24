'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ArtistCard({ artist }) {
  const image =
    artist?.images?.[0]?.url ||
    '/images/artist-placeholder.png';

  return (
    <Link
      href={`/artist/${artist.id}`}
      className="group"
    >
      <div className="overflow-hidden rounded-full bg-[#181818] transition group-hover:bg-[#282828]">

        <div className="relative aspect-square w-full">
          <Image
            src={image}
            alt={artist.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

      </div>

      <h3 className="mt-4 truncate text-center font-semibold">
        {artist.name}
      </h3>

      <p className="mt-1 text-center text-sm text-neutral-400">
        Artist
      </p>

    </Link>
  );
}
