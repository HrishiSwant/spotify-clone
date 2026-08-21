'use client';

import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
} from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [isPlaying, setIsPlaying] = useState(false);

  const [volume, setVolume] = useState(1);

  const [progress, setProgress] = useState(0);

  const [duration, setDuration] = useState(0);

  const playTrack = useCallback((track, list = []) => {
    setCurrentTrack(track);
    setQueue(list);

    const index = list.findIndex(
      (t) => t.id === track.id
    );

    setCurrentIndex(index);

    setProgress(0);
    setDuration(track.duration_ms || 0);

    setIsPlaying(true);
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  const playNext = useCallback(() => {
    if (!queue.length) return;

    const next = currentIndex + 1;

    if (next >= queue.length) return;

    setCurrentIndex(next);
    setCurrentTrack(queue[next]);
    setDuration(queue[next].duration_ms || 0);
    setProgress(0);
    setIsPlaying(true);
  }, [queue, currentIndex]);

  const playPrevious = useCallback(() => {
    if (!queue.length) return;

    const prev = currentIndex - 1;

    if (prev < 0) return;

    setCurrentIndex(prev);
    setCurrentTrack(queue[prev]);
    setDuration(queue[prev].duration_ms || 0);
    setProgress(0);
    setIsPlaying(true);
  }, [queue, currentIndex]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,

        currentTrack,
        queue,
        currentIndex,

        isPlaying,
        volume,
        progress,
        duration,

        setVolume,
        setProgress,
        setDuration,

        playTrack,
        togglePlay,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
