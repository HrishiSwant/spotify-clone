class QueueService {
  constructor() {
    this.queue = [];
    this.history = [];
    this.currentIndex = -1;

    this.shuffle = false;
    this.repeat = false;
  }

  setQueue(queue = []) {
    this.queue = [...queue];
    this.currentIndex = 0;
  }

  getQueue() {
    return this.queue;
  }

  setCurrentTrack(track) {
    const index = this.queue.findIndex(
      (t) => t.id === track.id
    );

    if (index !== -1) {
      this.currentIndex = index;
    }
  }

  getCurrentTrack() {
    return this.queue[this.currentIndex] || null;
  }

  next() {
    if (!this.queue.length) return null;

    if (this.shuffle) {
      this.currentIndex = Math.floor(
        Math.random() * this.queue.length
      );

      return this.getCurrentTrack();
    }

    if (
      this.currentIndex <
      this.queue.length - 1
    ) {
      this.currentIndex++;
      return this.getCurrentTrack();
    }

    if (this.repeat) {
      this.currentIndex = 0;
      return this.getCurrentTrack();
    }

    return null;
  }

  previous() {
    if (!this.queue.length) return null;

    if (this.currentIndex > 0) {
      this.currentIndex--;
    }

    return this.getCurrentTrack();
  }

  add(track) {
    this.queue.push(track);
  }

  addNext(track) {
    this.queue.splice(
      this.currentIndex + 1,
      0,
      track
    );
  }

  remove(trackId) {
    this.queue = this.queue.filter(
      (t) => t.id !== trackId
    );

    if (
      this.currentIndex >=
      this.queue.length
    ) {
      this.currentIndex =
        this.queue.length - 1;
    }
  }

  clear() {
    this.queue = [];
    this.currentIndex = -1;
  }

  toggleShuffle() {
    this.shuffle = !this.shuffle;
    return this.shuffle;
  }

  toggleRepeat() {
    this.repeat = !this.repeat;
    return this.repeat;
  }

  isShuffleEnabled() {
    return this.shuffle;
  }

  isRepeatEnabled() {
    return this.repeat;
  }
}

const queueService = new QueueService();

export default queueService;
