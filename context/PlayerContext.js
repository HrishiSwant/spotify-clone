'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);

  const [playing, setPlaying] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [volume, setVolumeState] = useState(80);
  const [muted, setMuted] = useState(false);

  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const [deviceId, setDeviceId] = useState(null);

  function playTrack(track, trackQueue = []) {
    setCurrentTrack(track);
    setQueue(trackQueue);

    setPlaying(true);
    setProgress(0);
    setDuration(track?.duration_ms || 0);
  }

  async function togglePlayback() {
    if (!window.spotifyPlayer) return;
    await window.spotifyPlayer.togglePlay();
  }

  async function nextTrack() {
    if (!window.spotifyPlayer) return;
    await window.spotifyPlayer.nextTrack();
  }

  async function previousTrack() {
    if (!window.spotifyPlayer) return;
    await window.spotifyPlayer.previousTrack();
  }

  async function seek(position, syncPlayer = true) {
    setProgress(position);

    if (syncPlayer && window.spotifyPlayer) {
      await window.spotifyPlayer.seek(position);
    }
  }

  async function setVolume(volume) {
    setVolumeState(volume);

    if (window.spotifyPlayer) {
      await window.spotifyPlayer.setVolume(volume / 100);
    }
  }

  async function toggleMute() {
    if (!window.spotifyPlayer) return;

    if (muted) {
      await window.spotifyPlayer.setVolume(volume / 100);
      setMuted(false);
    } else {
      await window.spotifyPlayer.setVolume(0);
      setMuted(true);
    }
  }

  function toggleShuffle() {
    setShuffle((v) => !v);
  }

  function toggleRepeat() {
    setRepeat((v) => !v);
  }

  const value = useMemo(
    () => ({
      currentTrack,
      setCurrentTrack,

      queue,
      setQueue,

      playing,
      setPlaying,

      progress,
      setProgress,

      duration,
      setDuration,

      volume,
      setVolume,

      muted,
      toggleMute,

      shuffle,
      toggleShuffle,

      repeat,
      toggleRepeat,

      deviceId,
      setDeviceId,

      playTrack,

      togglePlayback,
      nextTrack,
      previousTrack,

      seek,
    }),
    [
      currentTrack,
      queue,
      playing,
      progress,
      duration,
      volume,
      muted,
      shuffle,
      repeat,
      deviceId,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
