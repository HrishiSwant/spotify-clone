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

  const followedArtists = useCallback(() => {
    return Promise.resolve({
      artists: {
        items: [],
      },
    });
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

  const playlistTracks = useCallback((id) => {
    return client.byId('playlist', id);
  }, []);

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

  const artistAlbums = useCallback((id) => {
    return client.byId('artist', id);
  }, []);

  const relatedArtists = useCallback((id) => {
    return client.byId('artist', id);
  }, []);

  // ==========================
  // SEARCH
  // ==========================

  const search = useCallback((query) => {
    return client.search(query);
  }, []);

  const searchTracks = useCallback((query) => {
    return client.search(query);
  }, []);

  const searchArtists = useCallback((query) => {
    return client.search(query);
  }, []);

  const searchAlbums = useCallback((query) => {
    return client.search(query);
  }, []);

  const searchPlaylists = useCallback((query) => {
    return client.search(query);
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

  const queue = useCallback(() => {
    return client.get('queue');
  }, []);

  return {
    // User
    me,
    myPlaylists,
    savedTracks,
    topTracks,
    topArtists,
    recentlyPlayed,
    followedArtists,

    // Home
    featured,
    newReleases,
    categories,

    // Playlist
    playlist,
    playlistTracks,
    playlistCover,

    // Album
    album,
    albumTracks,

    // Artist
    artist,
    artistTopTracks,
    artistAlbums,
    relatedArtists,

    // Search
    search,
    searchTracks,
    searchArtists,
    searchAlbums,
    searchPlaylists,

    // Player
    player,
    currentlyPlaying,
    devices,
    queue,
  };
}
