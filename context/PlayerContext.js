'use client';

import {
  createContext,
  useContext,
  useEffect,
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
  const [repeat, setRepeat] = useState('off');

  const [deviceId, setDeviceId] = useState(null);
  const [playerReady, setPlayerReady] = useState(false);

  // ===========================
  // Track Helpers
  // ===========================

  function playTrack(track, trackQueue = []) {
    if (!track) return;

    setCurrentTrack(track);
    setQueue(trackQueue);

    setPlaying(true);
    setProgress(0);
    setDuration(track.duration_ms || 0);
  }

  function stopTrack() {
    setPlaying(false);
  }

  // ===========================
  // Spotify SDK Controls
  // ===========================

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

  async function setVolume(value) {
    setVolumeState(value);

    if (window.spotifyPlayer) {
      await window.spotifyPlayer.setVolume(value / 100);
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
    setRepeat((prev) => {
      if (prev === 'off') return 'context';
      if (prev === 'context') return 'track';
      return 'off';
    });
  }

  // ===========================
  // Listen for SDK State Changes
  // ===========================

  useEffect(() => {
    if (!window.spotifyPlayer) return;

    const player = window.spotifyPlayer;

    player.addListener('ready', ({ device_id }) => {
      console.log('Spotify Ready:', device_id);
      setDeviceId(device_id);
      setPlayerReady(true);
    });

    player.addListener(
      'player_state_changed',
      (state) => {
        if (!state) return;

        setPlaying(!state.paused);

        setProgress(state.position);

        setDuration(state.duration);

        if (state.track_window?.current_track) {
          setCurrentTrack(
            state.track_window.current_track
          );
        }

        if (
          state.track_window?.next_tracks
        ) {
          setQueue(
            state.track_window.next_tracks
          );
        }
      }
    );

    return () => {
      player.removeListener('ready');
      player.removeListener(
        'player_state_changed'
      );
    };
  }, []);

  // ===========================
  // Auto Progress
  // ===========================

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= duration) return duration;

        return prev + 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, duration]);

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

      playerReady,

      playTrack,
      stopTrack,

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
      playerReady,
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      'usePlayer must be used inside PlayerProvider'
    );
  }

  return context;
}
