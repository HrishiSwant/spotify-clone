'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import useSpotify from '@/hooks/useSpotify';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function AlbumPage() {
  const { id } = useParams();

  const spotify = useSpotify();

  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadAlbum() {
      try {
        setLoading(true);

        const [albumData, trackData] =
          await Promise.all([
            spotify.album(id),
            spotify.albumTracks(id),
          ]);

        setAlbum(albumData);

        setTracks(trackData.items || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadAlbum();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading album...
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PlaylistHeader
        playlist={{
          ...album,
          description: album.label,
          owner: {
            display_name: album.artists
              ?.map((a) => a.name)
              .join(', '),
          },
        }}
        trackCount={tracks.length}
      />

      <PlaylistTracks tracks={tracks} />
    </div>
  );
}
