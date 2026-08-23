import PlaylistGrid from '@/components/playlist/PlaylistGrid';

import playlists from '@/lib/spotify/playlists';
import albums from '@/lib/spotify/albums';

export default async function HomePage() {
  const [featured, releases] = await Promise.all([
    playlists.featured(),
    albums.newReleases(),
  ]);

  return (
    <div className="pb-28">

      <section className="px-8 pt-8">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Good evening
        </h1>

        <PlaylistGrid
          playlists={
            featured.playlists?.items || []
          }
        />
      </section>

      <section className="mt-12 px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          New Releases
        </h2>

        <PlaylistGrid
          playlists={
            releases.albums?.items || []
          }
        />
      </section>

    </div>
  );
}
