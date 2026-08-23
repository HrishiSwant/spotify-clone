'use client';

import { useCallback } from 'react';
import client from '@/lib/spotify/client';

export default function useSpotify() {
  // ==========================
  // USER
  // ==========================

  const me = useCallback(() => {
    return client.get('me');
  }, []);

  const myPlaylists = useCallback(() => {
    return client.get('myPlaylists');
  }, []);

  const savedTracks = useCallback(() => {
    return client.get('savedTracks');
  }, []);

  const topTracks = useCallback(() => {
    return client.get('topTracks');
  }, []);

  const topArtists = useCallback(() => {
    return client.get('topArtists');
  }, []);

  const recentlyPlayed = useCallback(() => {
    return client.get('recentlyPlayed');
  }, []);

  // Spotify API route doesn't currently support this
  const followedArtists = useCallback(() => {
    return Promise.resolve({ artists: { items: [] } });
  }, []);

  // ==========================
  // HOME
  // ==========================

  const featured = useCallback(() => {
    return client.get('featured');
  }, []);

  const newReleases = useCallback(() => {
    return client.get('newReleases');
  }, []);

  const categories = useCallback(() => {
    return client.get('categories');
  }, []);

  // ==========================
  // PLAYLIST
  // ==========================

  const playlist = useCallback((id) => {
    return client.byId('playlist', id);
  }, []);

  // Not implemented in API route yet
  const playlistTracks = useCallback((id) => {
    return client.byId('playlist', id);
  }, []);

  // Not implemented in API route yet
  const playlistCover = useCallback((id) => {
    return client.byId('playlist', id);
  }, []);

  // ==========================
  // ALBUM
  // ==========================

  const album = useCallback((id) => {
    return client.byId('album', id);
  }, []);

  const albumTracks = useCallback((id) => {
    return client.byId('albumTracks', id);
  }, []);

  // ==========================
  // ARTIST
  // ==========================

  const artist = useCallback((id) => {
    return client.byId('artist', id);
  }, []);

  const artistTopTracks = useCallback((id) => {
    return client.byId('artistTopTracks', id);
  }, []);

  // Not implemented in API route yet
  const artistAlbums = useCallback((id) => {
    return client.byId('artist', id);
  }, []);

  // Not implemented in API route yet
  const relatedArtists = useCallback((id) => {
    return client.byId('artist', id);
  }, []);

  // ==========================
  // SEARCH
  // ==========================

  const search = useCallback((q) => {
    return client.search(q);
  }, []);

  const searchTracks = useCallback((q) => {
    return client.search(q);
  }, []);

  const searchArtists = useCallback((q) => {
    return client.search(q);
  }, []);

  const searchAlbums = useCallback((q) => {
    return client.search(q);
  }, []);

  const searchPlaylists = useCallback((q) => {
    return client.search(q);
  }, []);

  // ==========================
  // PLAYER
  // ==========================

  const player = useCallback(() => {
    return client.get('currentPlayback');
  }, []);

  const currentlyPlaying = useCallback(() => {
    return client.get('currentlyPlaying');
  }, []);

  const devices = useCallback(() => {
    return client.get('devices');
  }, []);

  return {
    me,
    myPlaylists,
    savedTracks,
    topTracks,
    topArtists,
    recentlyPlayed,
    followedArtists,

    featured,
    newReleases,
    categories,

    playlist,
    playlistTracks,
    playlistCover,

    album,
    albumTracks,

    artist,
    artistTopTracks,
    artistAlbums,
    relatedArtists,

    search,
    searchTracks,
    searchArtists,
    searchAlbums,
    searchPlaylists,

    player,
    currentlyPlaying,
    devices,
  };
}
