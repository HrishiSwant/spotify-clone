'use client';

import { usePlayer as usePlayerContext } from '@/context/PlayerContext';

export default function usePlayer() {
  const player = usePlayerContext();

  return {
    currentTrack: player.currentTrack,
    queue: player.queue,
    currentIndex: player.currentIndex,

    isPlaying: player.isPlaying,

    volume: player.volume,
    progress: player.progress,
    duration: player.duration,

    playTrack: player.playTrack,
    togglePlay: player.togglePlay,

    playNext: player.playNext,
    playPrevious: player.playPrevious,

    setVolume: player.setVolume,
    setProgress: player.setProgress,
    setDuration: player.setDuration,

    audioRef: player.audioRef,
  };
}
