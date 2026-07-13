'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoId, setVideoId] = useState(null);
  const [volume, setVolume] = useState(70);

  const playTrack = useCallback(async (track, trackQueue = []) => {
    setCurrentTrack(track);
    setQueue(trackQueue);
    setIsPlaying(true);
    const q = `${track.name} ${track.artists?.map(a => a.name).join(' ')}`;
    const res = await fetch(`/api/youtube?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setVideoId(data.videoId);
  }, []);

  const togglePlay = () => setIsPlaying(p => !p);

  const nextTrack = () => {
    if (!currentTrack || !queue.length) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    if (idx >= 0 && idx < queue.length - 1) playTrack(queue[idx + 1], queue);
  };

  const prevTrack = () => {
    if (!currentTrack || !queue.length) return;
    const idx = queue.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) playTrack(queue[idx - 1], queue);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        isPlaying,
        videoId,
        volume,
        setVolume,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
