class PlayerService {
  constructor() {
    this.audio = null;
    this.queue = [];
    this.currentIndex = -1;
    this.currentTrack = null;
  }

  setAudio(audio) {
    this.audio = audio;
  }

  loadQueue(queue = [], startIndex = 0) {
    this.queue = queue;
    this.currentIndex = startIndex;
    this.currentTrack = queue[startIndex] || null;

    return this.currentTrack;
  }

  play(track = null) {
    if (track) {
      this.currentTrack = track;
    }

    if (this.audio) {
      this.audio.play();
    }

    return this.currentTrack;
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  toggle() {
    if (!this.audio) return;

    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }

  next() {
    if (this.currentIndex + 1 >= this.queue.length) {
      return null;
    }

    this.currentIndex++;

    this.currentTrack = this.queue[this.currentIndex];

    return this.currentTrack;
  }

  previous() {
    if (this.currentIndex <= 0) {
      return null;
    }

    this.currentIndex--;

    this.currentTrack = this.queue[this.currentIndex];

    return this.currentTrack;
  }

  seek(seconds) {
    if (!this.audio) return;

    this.audio.currentTime = seconds;
  }

  setVolume(volume) {
    if (!this.audio) return;

    this.audio.volume = volume;
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  getQueue() {
    return this.queue;
  }

  getCurrentIndex() {
    return this.currentIndex;
  }
}

const playerService = new PlayerService();

export default playerService;
