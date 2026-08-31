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
    playTrack: updateCurrentTrack,
  } = usePlayer();

  async function ensureDevice() {
    console.log('STEP 8 - ensureDevice()');
    console.log('Device ID:', deviceId);

    if (!deviceId) {
      console.error('STEP 8 FAILED - No deviceId');
      throw new Error('Spotify device is not ready');
    }

    console.log('STEP 9 - Calling playback.transfer()');

    await playback.transfer(deviceId);

    console.log('STEP 10 - Transfer finished');

    // Give Spotify a moment to activate the device
    await new Promise((resolve) =>
      setTimeout(resolve, 400)
    );

    console.log('STEP 11 - Device ready');
  }

  async function playTrack(track) {
    console.log('STEP 12 - usePlayback.playTrack()');
    console.log(track);

    if (!track?.uri) {
      console.error('STEP 12 FAILED - No track URI');
      return;
    }

    await ensureDevice();

    console.log('STEP 13 - Updating Player Context');

    updateCurrentTrack(track);

    console.log('STEP 14 - Calling playback.playTrack()');

    return playback.playTrack(
      track.uri,
      deviceId
    );
  }

  async function playPlaylist(
    playlistUri,
    offset = 0
  ) {
    console.log('STEP 15 - playPlaylist()');

    if (!playlistUri) {
      console.error('No playlist URI');
      return;
    }

    await ensureDevice();

    console.log('STEP 16 - Calling playback.playContext()');

    return playback.playContext(
      playlistUri,
      deviceId,
      offset
    );
  }

  async function resume() {
    console.log('Resume');

    await ensureDevice();

    return playback.resume(deviceId);
  }

  async function pause() {
    console.log('Pause');

    return playback.pause();
  }

  async function togglePlayback() {
    console.log('togglePlayback');

    if (playing) {
      return pause();
    }

    return resume();
  }

  async function next() {
    console.log('Next');

    return playback.next();
  }

  async function previous() {
    console.log('Previous');

    return playback.previous();
  }

  async function seek(position) {
    console.log('Seek', position);

    return playback.seek(position);
  }

  async function volume(value) {
    console.log('Volume', value);

    return playback.volume(value);
  }

  async function devices() {
    console.log('Devices');

    return playback.devices();
  }

  async function transfer(id) {
    console.log('Transfer()', id);

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

  async function shufflePlayback(
    state = !shuffle
  ) {
    console.log('Shuffle', state);

    return playback.shuffle(state);
  }

  async function repeatPlayback(
    state = repeat ? 'off' : 'context'
  ) {
    console.log('Repeat', state);

    return playback.repeat(state);
  }

  async function likeTrack(trackId) {
    console.log('Like', trackId);

    if (!trackId) return;

    return playback.like(trackId);
  }

  async function unlikeTrack(trackId) {
    console.log('Unlike', trackId);

    if (!trackId) return;

    return playback.unlike(trackId);
  }

  async function isTrackLiked(trackId) {
    console.log('Check Saved', trackId);

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
