'use client';

import AlbumGrid from './AlbumGrid';

export default function AlbumSection({
  title,
  albums = [],
}) {
  if (!albums.length) return null;

  return (
    <section className="px-8 py-8">

      <h2 className="mb-6 text-2xl font-bold">
        {title}
      </h2>

      <AlbumGrid albums={albums} />

    </section>
  );
}
