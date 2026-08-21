'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

import useSpotify from '@/hooks/useSpotify';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function ArtistPage() {
  const { id } = useParams();

  const spotify = useSpotify();

  const [artist, setArtist] = useState(null);
  const [tracks, setTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function loadArtist() {
      try {
        setLoading(true);

        const [artistData, topTracks] =
          await Promise.all([
            spotify.artist(id),
            spotify.artistTopTracks(id),
          ]);

        setArtist(artistData);

        setTracks(topTracks.tracks || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading artist...
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PlaylistHeader
        playlist={{
          ...artist,
          owner: {
            display_name: 'Artist',
          },
          description: `${artist.followers?.total?.toLocaleString() || 0} followers`,
        }}
        trackCount={tracks.length}
      />

      <PlaylistTracks tracks={tracks} />
    </div>
  );
}
