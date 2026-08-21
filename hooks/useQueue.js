'use client';

import { useQueue as useQueueContext } from '@/context/QueueContext';

export default function useQueue() {
  const queue = useQueueContext();

  return {
    queue: queue.queue,
    currentTrack: queue.currentTrack,
    currentIndex: queue.currentIndex,

    loadQueue: queue.loadQueue,
    clearQueue: queue.clearQueue,

    nextTrack: queue.nextTrack,
    previousTrack: queue.previousTrack,

    addToQueue: queue.addToQueue,
    removeFromQueue: queue.removeFromQueue,
  };
}
