'use client';

import { useEffect, useState } from 'react';
import useSpotify from '@/hooks/useSpotify';

import PlaylistGrid from '@/components/playlist/PlaylistGrid';

export default function HomePage() {
  const spotify = useSpotify();

  const [featured, setFeatured] = useState([]);
  const [recent, setRecent] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function loadHome() {
      try {
        const [
          featuredData,
          recentData,
          topTracksData,
          topArtistsData,
        ] = await Promise.all([
          spotify.featured(),
          spotify.myPlaylists(),
          spotify.topTracks(),
          spotify.topArtists(),
        ]);

        setFeatured(featuredData.items || []);
        setRecent(recentData.items || []);
        setTopTracks(topTracksData.items || []);
        setTopArtists(topArtistsData.items || []);
      } catch (err) {
        console.error(err);
      }
    }

    loadHome();
  }, []);

  return (
    <div className="space-y-12">
      <PlaylistGrid
        title="Featured Playlists"
        items={featured}
      />

      <PlaylistGrid
        title="Your Playlists"
        items={recent}
      />

      <PlaylistGrid
        title="Top Tracks"
        items={topTracks}
        type="track"
      />

      <PlaylistGrid
        title="Top Artists"
        items={topArtists}
        type="artist"
      />
    </div>
  );
}
