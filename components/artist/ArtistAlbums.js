'use client';

import AlbumCard from '@/components/album/AlbumCard';

export default function ArtistAlbums({ albums = [] }) {
  if (!albums.length) {
    return (
      <div className="flex items-center justify-center py-16 text-neutral-400">
        No albums found.
      </div>
    );
  }

  return (
    <section className="px-8 py-8">

      <h2 className="mb-6 text-2xl font-bold">
        Albums
      </h2>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            album={album}
          />
        ))}
      </div>

    </section>
  );
}
