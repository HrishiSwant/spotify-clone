import player from './player';

const playback = {
  // ===========================
  // PLAY
  // ===========================

  async playTrack(uri, deviceId) {
    if (!uri || !deviceId) return;

    return player.play({
      device_id: deviceId,
      uris: [uri],
    });
  },

  async playContext(
    contextUri,
    deviceId,
    offset = 0
  ) {
    if (!contextUri || !deviceId) return;

    return player.play({
      device_id: deviceId,
      context_uri: contextUri,
      offset: {
        position: offset,
      },
    });
  },

  async resume(deviceId) {
    if (!deviceId) return;

    return player.play({
      device_id: deviceId,
    });
  },

  // ===========================
  // TRANSPORT
  // ===========================

  async pause() {
    return player.pause();
  },

  async next() {
    return player.next();
  },

  async previous() {
    return player.previous();
  },

  // ===========================
  // SEEK
  // ===========================

  async seek(position) {
    return player.seek(position);
  },

  // ===========================
  // VOLUME
  // ===========================

  async volume(value) {
    return player.volume(value);
  },

  // ===========================
  // SHUFFLE
  // ===========================

  async shuffle(state = true) {
    return player.shuffle(state);
  },

  // ===========================
  // REPEAT
  // ===========================

  async repeat(state = 'off') {
    return player.repeat(state);
  },

  // ===========================
  // QUEUE
  // ===========================

  async queue() {
    return player.queue();
  },

  async addToQueue(uri) {
    if (!uri) return;

    return player.addToQueue(uri);
  },

  // ===========================
  // DEVICES
  // ===========================

  async devices() {
    return player.devices();
  },

  async transfer(deviceId) {
    if (!deviceId) return;

    return player.transfer(deviceId);
  },

  // ===========================
  // PLAYER STATE
  // ===========================

  async currentPlayback() {
    return player.currentPlayback();
  },

  async currentlyPlaying() {
    return player.currentlyPlaying();
  },

  // ===========================
  // LIKED SONGS
  // ===========================

  async likeTrack(id) {
    if (!id) return;

    return player.likeTrack(id);
  },

  async unlikeTrack(id) {
    if (!id) return;

    return player.unlikeTrack(id);
  },

  async checkSaved(id) {
    if (!id) return;

    return player.checkSaved(id);
  },
};

export default playback;
