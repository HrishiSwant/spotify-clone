'use client';

import { usePlayer } from '@/context/PlayerContext';

export default function usePlayerHook() {
  const player = usePlayer();

  return {
    currentTrack: player.currentTrack,

    queue: player.queue,

    playing: player.playing,

    progress: player.progress,
    duration: player.duration,

    volume: player.volume,
    muted: player.muted,

    shuffle: player.shuffle,
    repeat: player.repeat,

    playTrack: player.playTrack,

    togglePlayback: player.togglePlayback,

    nextTrack: player.nextTrack,
    previousTrack: player.previousTrack,

    seek: player.seek,

    setVolume: player.setVolume,
    toggleMute: player.toggleMute,

    toggleShuffle: player.toggleShuffle,
    toggleRepeat: player.toggleRepeat,
  };
}
