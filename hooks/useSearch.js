'use client';

import { useState, useCallback } from 'react';

import searchApi from '@/lib/spotify/search';

export default function useSearch() {
  const [query, setQuery] = useState('');

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);

  const search = useCallback(async (text) => {
    const value = text.trim();

    if (!value) {
      setTracks([]);
      setArtists([]);
      setAlbums([]);
      setPlaylists([]);
      return;
    }

    try {
      setLoading(true);

      const result = await searchApi.search(value);

      setTracks(result?.tracks?.items || []);
      setArtists(result?.artists?.items || []);
      setAlbums(result?.albums?.items || []);
      setPlaylists(result?.playlists?.items || []);
    } catch (err) {
      console.error(err);

      setTracks([]);
      setArtists([]);
      setAlbums([]);
      setPlaylists([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
