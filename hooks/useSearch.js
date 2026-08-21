'use client';

import { useState, useCallback } from 'react';
import spotifyService from '@/services/spotifyService';

export default function useSearch() {
  const [query, setQuery] = useState('');

  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [playlists, setPlaylists] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const search = useCallback(async (q) => {
    if (!q?.trim()) {
      setTracks([]);
      setArtists([]);
      setAlbums([]);
      setPlaylists([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await spotifyService.search(q);

      setTracks(data.tracks?.items || []);
      setArtists(data.artists?.items || []);
      setAlbums(data.albums?.items || []);
      setPlaylists(data.playlists?.items || []);
    } catch (err) {
      setError(err);
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
    error,

    search,
  };
}
