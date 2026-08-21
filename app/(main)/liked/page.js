'use client';

import { useEffect, useState } from 'react';

import useSpotify from '@/hooks/useSpotify';

import PlaylistHeader from '@/components/playlist/PlaylistHeader';
import PlaylistTracks from '@/components/playlist/PlaylistTracks';

export default function LikedSongsPage() {
  const spotify = useSpotify();

  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLikedSongs() {
      try {
        setLoading(true);

        const data = await spotify.savedTracks();

        setTracks(
          (data.items || [])
            .map((item) => item.track)
            .filter(Boolean)
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLikedSongs();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading liked songs...
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PlaylistHeader
        playlist={{
          name: 'Liked Songs',
          description: 'Your saved tracks',
          images: [
            {
              url: 'https://misc.scdn.co/liked-songs/liked-songs-640.png',
            },
          ],
          owner: {
            display_name: 'You',
          },
          followers: {
            total: tracks.length,
          },
        }}
        trackCount={tracks.length}
      />

      <PlaylistTracks tracks={tracks} />
    </div>
  );
}
