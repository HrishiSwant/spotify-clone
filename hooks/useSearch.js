'use client';

import { useState } from 'react';

import useSpotify from './useSpotify';

export default function useSearch() {
  const spotify = useSpotify();

  const [query, setQuery] = useState('');

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] =
    useState(false);

  async function search(text) {
    if (!text.trim()) {
      setTracks([]);
      setArtists([]);
      setAlbums([]);
      setPlaylists([]);
      return;
    }

    try {
      setLoading(true);

      const result = await spotify.search(text);

      setTracks(result.tracks?.items || []);

      setArtists(result.artists?.items || []);

      setAlbums(result.albums?.items || []);

      setPlaylists(
        result.playlists?.items || []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    query,
    setQuery,

    tracks,
    artists,
    albums,
    playlists,

    loading,

    search,
  };
}
