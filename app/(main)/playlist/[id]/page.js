import { notFound } from 'next/navigation';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

import playlists from '@/lib/spotify/playlists';

export default async function PlaylistPage({
  params,
}) {
  const { id } = await params;

  const playlist = await playlists.playlist(id);

  if (!playlist || playlist.error) {
    notFound();
  }

  return (
    <div className="pb-28">
      <PlaylistHeader playlist={playlist} />

      <PlaylistTracks
        tracks={playlist.tracks?.items || []}
        contextUri={playlist.uri}
      />
    </div>
  );
}
