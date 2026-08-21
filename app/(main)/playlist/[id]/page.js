'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import useSpotify from '@/hooks/useSpotify';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function PlaylistPage() {
  const { id } = useParams();

  const spotify = useSpotify();

  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadPlaylist() {
      try {
        setLoading(true);

        const data = await spotify.playlist(id);

        setPlaylist(data);

        const list =
          data?.tracks?.items
            ?.map((item) => item.track || item)
            .filter(Boolean) || [];

        setTracks(list);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadPlaylist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-neutral-400">
        Loading playlist...
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PlaylistHeader
        playlist={playlist}
        trackCount={tracks.length}
      />

      <PlaylistTracks tracks={tracks} />
    </div>
  );
}
