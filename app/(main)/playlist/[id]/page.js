import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

import playlists from '@/lib/spotify/playlists';

export default async function PlaylistPage({
  params,
}) {
  const playlist = await playlists.playlist(
    params.id
  );

  return (
    <div className="pb-28">

      <PlaylistHeader
        playlist={playlist}
      />

      <PlaylistTracks
        tracks={
          playlist.tracks?.items || []
        }
        contextUri={playlist.uri}
      />

    </div>
  );
}
