'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';

const QueueContext = createContext(null);

export function QueueProvider({ children }) {
  const [queue, setQueue] = useState([]);
  const [currentIndex, setCurrentIndex] =
    useState(-1);

  function loadQueue(
    tracks = [],
    startIndex = 0
  ) {
    setQueue(tracks);
    setCurrentIndex(startIndex);
  }

  function add(track) {
    setQueue((prev) => [...prev, track]);
  }

  function addNext(track) {
    setQueue((prev) => {
      const copy = [...prev];
      copy.splice(currentIndex + 1, 0, track);
      return copy;
    });
  }

  function remove(trackId) {
    setQueue((prev) =>
      prev.filter((t) => t.id !== trackId)
    );
  }

  function clear() {
    setQueue([]);
    setCurrentIndex(-1);
  }

  function next() {
    if (currentIndex >= queue.length - 1)
      return null;

    setCurrentIndex((i) => i + 1);

    return queue[currentIndex + 1];
  }

  function previous() {
    if (currentIndex <= 0) return null;

    setCurrentIndex((i) => i - 1);

    return queue[currentIndex - 1];
  }

  const value = useMemo(
    () => ({
      queue,
      currentIndex,

      currentTrack:
        queue[currentIndex] || null,

      loadQueue,

      add,
      addNext,
      remove,
      clear,

      next,
      previous,
    }),
    [queue, currentIndex]
  );

  return (
    <QueueContext.Provider value={value}>
      {children}
    </QueueContext.Provider>
  );
}

export function useQueue() {
  return useContext(QueueContext);
}
