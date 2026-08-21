'use client';

import { useCallback } from 'react';
import spotifyService from '@/services/spotifyService';

export default function useSpotify() {
  // ==========================
  // USER
  // ==========================

  const me = useCallback(() => {
    return spotifyService.me();
  }, []);

  const myPlaylists = useCallback(() => {
    return spotifyService.myPlaylists();
  }, []);

  const savedTracks = useCallback(() => {
    return spotifyService.savedTracks();
  }, []);

  const topTracks = useCallback(() => {
    return spotifyService.topTracks();
  }, []);

  const topArtists = useCallback(() => {
    return spotifyService.topArtists();
  }, []);

  const recentlyPlayed = useCallback(() => {
    return spotifyService.recentlyPlayed();
  }, []);

  const followedArtists = useCallback(() => {
    return spotifyService.followedArtists();
  }, []);

  // ==========================
  // HOME
  // ==========================

  const featured = useCallback(() => {
    return spotifyService.featured();
  }, []);

  const newReleases = useCallback(() => {
    return spotifyService.newReleases();
  }, []);

  // ==========================
  // PLAYLIST
  // ==========================

  const playlist = useCallback((id) => {
    return spotifyService.playlist(id);
  }, []);

  const playlistTracks = useCallback((id) => {
    return spotifyService.playlistTracks(id);
  }, []);

  const playlistCover = useCallback((id) => {
    return spotifyService.playlistCover(id);
  }, []);

  // ==========================
  // ALBUM
  // ==========================

  const album = useCallback((id) => {
    return spotifyService.album(id);
  }, []);

  const albumTracks = useCallback((id) => {
    return spotifyService.albumTracks(id);
  }, []);

  // ==========================
  // ARTIST
  // ==========================

  const artist = useCallback((id) => {
    return spotifyService.artist(id);
  }, []);

  const artistTopTracks = useCallback((id) => {
    return spotifyService.artistTopTracks(id);
  }, []);

  const artistAlbums = useCallback((id) => {
    return spotifyService.artistAlbums(id);
  }, []);

  const relatedArtists = useCallback((id) => {
    return spotifyService.relatedArtists(id);
  }, []);

  // ==========================
  // SEARCH
  // ==========================

  const search = useCallback((q) => {
    return spotifyService.search(q);
  }, []);

  const searchTracks = useCallback((q) => {
    return spotifyService.searchTracks(q);
  }, []);

  const searchArtists = useCallback((q) => {
    return spotifyService.searchArtists(q);
  }, []);

  const searchAlbums = useCallback((q) => {
    return spotifyService.searchAlbums(q);
  }, []);

  const searchPlaylists = useCallback((q) => {
    return spotifyService.searchPlaylists(q);
  }, []);

  // ==========================
  // PLAYER
  // ==========================

  const player = useCallback(() => {
    return spotifyService.player();
  }, []);

  const currentlyPlaying = useCallback(() => {
    return spotifyService.currentlyPlaying();
  }, []);

  const devices = useCallback(() => {
    return spotifyService.devices();
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
