'use client';

import Link from 'next/link';
import { Play } from 'lucide-react';
import { getImage, formatArtists } from '@/lib/utils';

export default function PlaylistCard({
  item,
  type = 'playlist',
}) {
  const image =
    getImage(item.images) ||
    item.album?.images?.[0]?.url ||
    '/images/placeholder.png';

  let href = '/';

  switch (type) {
    case 'track':
      href = `/album/${item.album?.id}`;
      break;

    case 'artist':
      href = `/artist/${item.id}`;
      break;

    case 'album':
      href = `/album/${item.id}`;
      break;

    default:
      href = `/playlist/${item.id}`;
  }

  const subtitle =
    type === 'track'
      ? formatArtists(item.artists || [])
      : type === 'artist'
      ? 'Artist'
      : item.description ||
        item.owner?.display_name ||
        '';

  return (
    <Link
      href={href}
      className="group rounded-lg bg-[#181818] p-4 transition hover:bg-[#282828]"
    >
      <div className="relative">
        <img
          src={image}
          alt={item.name}
          className="aspect-square w-full rounded-md object-cover shadow-lg"
        />

        <button
          className="
            absolute
            bottom-2
            right-2
            flex
            h-12
            w-12
            translate-y-2
            items-center
            justify-center
            rounded-full
            bg-[#1ed760]
            text-black
            opacity-0
            shadow-xl
            transition-all
            group-hover:translate-y-0
            group-hover:opacity-100
            hover:scale-105
          "
        >
          <Play
            size={20}
            fill="currentColor"
          />
        </button>
      </div>

      <div className="mt-4">
        <h3 className="truncate font-bold">
          {item.name}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm text-neutral-400">
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
