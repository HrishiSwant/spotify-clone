'use client';

import playback from '@/lib/spotify/playback';
import { usePlayer } from '@/context/PlayerContext';

export default function usePlayback() {
  const {
    deviceId,
    currentTrack,
    playing,
  } = usePlayer();

  async function playTrack(track) {
    if (!track?.uri || !deviceId) return;

    return playback.playTrack(
      track.uri,
      deviceId
    );
  }

  async function playPlaylist(
    playlistUri,
    offset = 0
  ) {
    if (!playlistUri || !deviceId) return;

    return playback.playContext(
      playlistUri,
      deviceId,
      offset
    );
  }

  async function resume() {
    return playback.resume(deviceId);
  }

  async function pause() {
    return playback.pause();
  }

  async function next() {
    return playback.next();
  }

  async function previous() {
    return playback.previous();
  }

  async function seek(position) {
    return playback.seek(position);
  }

  async function volume(value) {
    return playback.volume(value);
  }

  async function devices() {
    return playback.devices();
  }

  async function transfer(id) {
    return playback.transfer(id);
  }

  async function currentPlayback() {
    return playback.currentPlayback();
  }

  async function queue() {
    return playback.queue();
  }

  return {
    deviceId,

    currentTrack,
    playing,

    playTrack,
    playPlaylist,

    resume,
    pause,

    next,
    previous,

    seek,

    volume,

    devices,
    transfer,

    currentPlayback,

    queue,
  };
}
