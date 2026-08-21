class QueueService {
  constructor() {
    this.queue = [];
    this.currentIndex = -1;
  }

  load(tracks = [], startIndex = 0) {
    this.queue = tracks;
    this.currentIndex = startIndex;
  }

  clear() {
    this.queue = [];
    this.currentIndex = -1;
  }

  add(track) {
    this.queue.push(track);
  }

  addMany(tracks = []) {
    this.queue.push(...tracks);
  }

  remove(trackId) {
    this.queue = this.queue.filter(
      (track) => track.id !== trackId
    );

    if (this.currentIndex >= this.queue.length) {
      this.currentIndex = this.queue.length - 1;
    }
  }

  next() {
    if (this.currentIndex + 1 >= this.queue.length) {
      return null;
    }

    this.currentIndex++;

    return this.queue[this.currentIndex];
  }

  previous() {
    if (this.currentIndex <= 0) {
      return null;
    }

    this.currentIndex--;

    return this.queue[this.currentIndex];
  }

  current() {
    return this.queue[this.currentIndex] || null;
  }

  getQueue() {
    return this.queue;
  }

  getIndex() {
    return this.currentIndex;
  }

  setIndex(index) {
    if (
      index >= 0 &&
      index < this.queue.length
    ) {
      this.currentIndex = index;
    }

    return this.current();
  }

  hasNext() {
    return this.currentIndex < this.queue.length - 1;
  }

  hasPrevious() {
    return this.currentIndex > 0;
  }

  size() {
    return this.queue.length;
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const queueService = new QueueService();

export default queueService;
