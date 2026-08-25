import PlaylistGrid from '@/components/playlist/PlaylistGrid';

import playlists from '@/lib/spotify/playlists';
import user from '@/lib/spotify/user';

export default async function HomePage() {
  const results = await Promise.allSettled([
    playlists.featured(),
    user.recentlyPlayed(),
    user.topTracks(),
    user.topArtists(),
  ]);

  const featured =
    results[0].status === 'fulfilled'
      ? results[0].value
      : { playlists: { items: [] } };

  const recentlyPlayed =
    results[1].status === 'fulfilled'
      ? results[1].value
      : { items: [] };

  const topTracks =
    results[2].status === 'fulfilled'
      ? results[2].value
      : { items: [] };

  const topArtists =
    results[3].status === 'fulfilled'
      ? results[3].value
      : { items: [] };

  return (
    <div className="pb-28">

      <section className="px-8 pt-8">
        <h1 className="mb-6 text-3xl font-bold text-white">
          Good evening
        </h1>

        <PlaylistGrid
          playlists={featured.playlists?.items || []}
        />
      </section>

      <section className="mt-12 px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Recently Played
        </h2>

        <PlaylistGrid
          playlists={
            (recentlyPlayed.items || [])
              .map((item) => item.track)
              .filter(Boolean)
          }
        />
      </section>

      <section className="mt-12 px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Your Top Tracks
        </h2>

        <PlaylistGrid
          playlists={topTracks.items || []}
        />
      </section>

      <section className="mt-12 px-8">
        <h2 className="mb-6 text-2xl font-bold text-white">
          Your Top Artists
        </h2>

        <PlaylistGrid
          playlists={topArtists.items || []}
        />
      </section>

    </div>
  );
}
