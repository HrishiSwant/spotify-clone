'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';

import albums from '@/lib/spotify/albums';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function AlbumPage() {
  const { id } = useParams();

  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadAlbum() {
      try {
        setLoading(true);

        const [albumData, trackData] =
          await Promise.all([
            albums.album(id),
            albums.albumTracks(id),
          ]);

        if (!albumData || albumData.error) {
          setError(true);
          return;
        }

        setAlbum(albumData);
        setTracks(trackData?.items || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadAlbum();
  }, [id]);

  if (error) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading album...
      </div>
    );
  }

  return (
    <div className="pb-28">
      <PlaylistHeader
        playlist={{
          ...album,
          description: album.label,
          owner: {
            display_name:
              album.artists
                ?.map((artist) => artist.name)
                .join(', ') || 'Spotify',
          },
          followers: {
            total: 0,
          },
          tracks: {
            total: tracks.length,
            items: tracks,
          },
        }}
      />

      <PlaylistTracks
        tracks={tracks}
        contextUri={album.uri}
      />
    </div>
  );
}
