'use client';

import playback from '@/lib/spotify/playback';
import { usePlayer } from '@/context/PlayerContext';

export default function usePlayback() {
  const {
    deviceId,

    currentTrack,
    playing,

    shuffle,
    repeat,

    playTrack: setCurrentTrack,
  } = usePlayer();

  async function playTrack(track) {
    if (!track?.uri || !deviceId) return;

    setCurrentTrack(track);

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

  async function togglePlayback() {
    if (playing) {
      return pause();
    }

    return resume();
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

  async function currentlyPlaying() {
    return playback.currentlyPlaying();
  }

  async function queue() {
    return playback.queue();
  }

  async function shufflePlayback(state = !shuffle) {
    return playback.shuffle(state);
  }

  async function repeatPlayback(
    state = repeat ? 'off' : 'context'
  ) {
    return playback.repeat(state);
  }

  async function likeTrack(trackId) {
    if (!trackId) return;

    return playback.like(trackId);
  }

  async function unlikeTrack(trackId) {
    if (!trackId) return;

    return playback.unlike(trackId);
  }

  async function isTrackLiked(trackId) {
    if (!trackId) return false;

    return playback.checkSaved(trackId);
  }

  return {
    deviceId,

    currentTrack,
    playing,

    playTrack,
    playPlaylist,

    resume,
    pause,
    togglePlayback,

    next,
    previous,

    seek,
    volume,

    devices,
    transfer,

    currentPlayback,
    currentlyPlaying,

    queue,

    shuffle: shufflePlayback,
    repeat: repeatPlayback,

    likeTrack,
    unlikeTrack,
    isTrackLiked,
  };
}
