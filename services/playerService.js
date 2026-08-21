class PlayerService {
  constructor() {
    this.audio = null;

    this.currentTrack = null;
    this.queue = [];

    this.listeners = {};

    this.volume = 100;
    this.muted = false;
  }

  initialize(audioElement) {
    this.audio = audioElement;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  emit(event, payload) {
    (this.listeners[event] || []).forEach((cb) =>
      cb(payload)
    );
  }

  setQueue(queue = []) {
    this.queue = queue;
  }

  getQueue() {
    return this.queue;
  }

  setCurrentTrack(track) {
    this.currentTrack = track;
    this.emit("trackchange", track);
  }

  getCurrentTrack() {
    return this.currentTrack;
  }

  play(track) {
    this.setCurrentTrack(track);
    this.emit("play", track);
  }

  pause() {
    this.emit("pause");
  }

  resume() {
    this.emit("resume");
  }

  stop() {
    this.emit("stop");
  }

  seek(ms) {
    this.emit("seek", ms);
  }

  setVolume(volume) {
    this.volume = volume;
    this.emit("volume", volume);
  }

  getVolume() {
    return this.volume;
  }

  mute() {
    this.muted = true;
    this.emit("mute", true);
  }

  unmute() {
    this.muted = false;
    this.emit("mute", false);
  }

  isMuted() {
    return this.muted;
  }

  next() {
    if (!this.currentTrack) return null;

    const index = this.queue.findIndex(
      (t) => t.id === this.currentTrack.id
    );

    if (index === -1) return null;

    const nextTrack =
      this.queue[index + 1] || null;

    if (nextTrack) {
      this.play(nextTrack);
    }

    return nextTrack;
  }

  previous() {
    if (!this.currentTrack) return null;

    const index = this.queue.findIndex(
      (t) => t.id === this.currentTrack.id
    );

    if (index <= 0) return null;

    const previousTrack =
      this.queue[index - 1];

    this.play(previousTrack);

    return previousTrack;
  }
}

const playerService = new PlayerService();

export default playerService;
