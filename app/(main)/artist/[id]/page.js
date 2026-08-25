'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';

import artists from '@/lib/spotify/artists';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function ArtistPage() {
  const { id } = useParams();

  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function loadArtist() {
      try {
        setLoading(true);

        const [artistData, topTracks] =
          await Promise.all([
            artists.artist(id),
            artists.artistTopTracks(id),
          ]);

        if (!artistData || artistData.error) {
          setError(true);
          return;
        }

        setArtist(artistData);
        setTracks(topTracks?.tracks || []);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    loadArtist();
  }, [id]);

  if (error) {
    notFound();
  }

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading artist...
      </div>
    );
  }

  return (
    <div className="pb-28">
      <PlaylistHeader
        playlist={{
          ...artist,
          owner: {
            display_name: 'Artist',
          },
          description: `${(
            artist.followers?.total || 0
          ).toLocaleString()} followers`,
          followers: {
            total: artist.followers?.total || 0,
          },
          tracks: {
            total: tracks.length,
            items: tracks,
          },
        }}
      />

      <PlaylistTracks
        tracks={tracks}
      />
    </div>
  );
}
