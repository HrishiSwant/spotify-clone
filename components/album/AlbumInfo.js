'use client';

export default function AlbumInfo({ album }) {
  if (!album) return null;

  return (
    <section className="px-8 py-6">

      <h2 className="mb-4 text-2xl font-bold">
        About this album
      </h2>

      <div className="space-y-2 text-neutral-300">

        <p>
          <span className="font-semibold text-white">
            Release Date:
          </span>{' '}
          {album.release_date}
        </p>

        <p>
          <span className="font-semibold text-white">
            Total Tracks:
          </span>{' '}
          {album.total_tracks}
        </p>

        <p>
          <span className="font-semibold text-white">
            Album Type:
          </span>{' '}
          {album.album_type}
        </p>

      </div>

    </section>
  );
}
