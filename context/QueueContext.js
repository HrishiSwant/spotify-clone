'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
} from 'react';

const QueueContext = createContext(null);

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const loadQueue = useCallback((tracks, startIndex = 0) => {
    setQueue(tracks || []);
    setCurrentIndex(startIndex);
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
    setCurrentIndex(0);
  }, []);

  const nextTrack = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= queue.length) return prev;
      return prev + 1;
    });
  }, [queue]);

  const previousTrack = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return 0;
      return prev - 1;
    });
  }, []);

  const addToQueue = useCallback((track) => {
    setQueue((prev) => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((id) => {
    setQueue((prev) =>
      prev.filter((track) => track.id !== id)
    );
  }, []);

  const currentTrack =
    queue[currentIndex] || null;

  return (
    <QueueContext.Provider
      value={{
        queue,
        currentTrack,
        currentIndex,

        loadQueue,
        clearQueue,
        nextTrack,
        previousTrack,
        addToQueue,
        removeFromQueue,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}
