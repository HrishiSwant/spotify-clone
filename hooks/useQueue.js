'use client';

import { useQueue } from '@/context/QueueContext';

export default function useQueueHook() {
  const queue = useQueue();

  return {
    queue: queue.queue,

    currentIndex: queue.currentIndex,

    currentTrack: queue.currentTrack,

    loadQueue: queue.loadQueue,

    add: queue.add,
    addNext: queue.addNext,

    remove: queue.remove,

    clear: queue.clear,

    next: queue.next,
    previous: queue.previous,
  };
}
