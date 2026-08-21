'use client';

import { useEffect, useState } from 'react';

import useSpotify from '@/hooks/useSpotify';

import PlaylistGrid from '@/components/playlist/PlaylistGrid';

export default function LibraryPage() {
  const spotify = useSpotify();

  const [playlists, setPlaylists] = useState([]);
  const [savedTracks, setSavedTracks] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLibrary() {
      try {
        setLoading(true);

        const [playlistData, likedData] =
          await Promise.all([
            spotify.myPlaylists(),
            spotify.savedTracks(),
          ]);

        setPlaylists(
          playlistData.items || []
        );

        setSavedTracks(
          likedData.items
            ?.map((item) => item.track)
            .filter(Boolean) || []
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadLibrary();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-neutral-400">
        Loading library...
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <PlaylistGrid
        title="Your Playlists"
        items={playlists}
      />

      <PlaylistGrid
        title="Liked Songs"
        items={savedTracks}
        type="track"
      />
    </div>
  );
}
