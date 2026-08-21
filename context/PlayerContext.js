'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

import playerService from '@/services/playerService';
import queueService from '@/services/queueService';

const PlayerContext = createContext(null);

export function PlayerProvider({
  children,
}) {
  const [currentTrack, setCurrentTrack] =
    useState(null);

  const [queue, setQueue] = useState([]);

  const [playing, setPlaying] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [duration, setDuration] =
    useState(0);

  const [volume, setVolumeState] =
    useState(100);

  const [muted, setMuted] =
    useState(false);

  const [shuffle, setShuffle] =
    useState(false);

  const [repeat, setRepeat] =
    useState(false);

  function playTrack(track, trackQueue = []) {
    if (!track) return;

    queueService.setQueue(trackQueue);
    queueService.setCurrentTrack(track);

    playerService.setQueue(trackQueue);
    playerService.play(track);

    setQueue(trackQueue);
    setCurrentTrack(track);
    setPlaying(true);

    setProgress(0);
    setDuration(track.duration_ms || 0);
  }

  function togglePlayback() {
    if (playing) {
      playerService.pause();
    } else {
      playerService.resume();
    }

    setPlaying(!playing);
  }

  function nextTrack() {
    const next = queueService.next();

    if (!next) return;

    playTrack(next, queue);
  }

  function previousTrack() {
    const previous =
      queueService.previous();

    if (!previous) return;

    playTrack(previous, queue);
  }

  function seek(ms) {
    playerService.seek(ms);
    setProgress(ms);
  }

  function setVolume(volume) {
    playerService.setVolume(volume);

    setMuted(false);
    setVolumeState(volume);
  }

  function toggleMute() {
    if (muted) {
      playerService.unmute();
    } else {
      playerService.mute();
    }

    setMuted(!muted);
  }

  function toggleShuffle() {
    setShuffle(
      queueService.toggleShuffle()
    );
  }

  function toggleRepeat() {
    setRepeat(
      queueService.toggleRepeat()
    );
  }

  const value = useMemo(
    () => ({
      currentTrack,
      queue,

      playing,
      progress,
      duration,

      volume,
      muted,

      shuffle,
      repeat,

      playTrack,
      togglePlayback,

      nextTrack,
      previousTrack,

      seek,

      setVolume,
      toggleMute,

      toggleShuffle,
      toggleRepeat,
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
