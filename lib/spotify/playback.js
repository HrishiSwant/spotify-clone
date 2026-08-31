import player from './player';

const playback = {
  // ===========================
  // PLAY
  // ===========================

  async playTrack(uri, deviceId) {
    if (!uri || !deviceId) {
      console.error('playTrack: missing uri or deviceId');
      return;
    }

    return player.play({
      device_id: deviceId,
      uris: [uri],
    });
  },

  async playContext(contextUri, deviceId, offset = 0) {
    if (!contextUri || !deviceId) {
      console.error('playContext: missing contextUri or deviceId');
      return;
    }

    return player.play({
      device_id: deviceId,
      context_uri: contextUri,
      offset: {
        position: offset,
      },
    });
  },

  async resume(deviceId) {
    if (!deviceId) {
      console.error('resume: no deviceId');
      return;
    }

    return player.play({
      device_id: deviceId,
    });
  },

  // ===========================
  // TRANSPORT
  // ===========================

  async pause(deviceId) {
    return player.pause(deviceId);
  },

  async next(deviceId) {
    return player.next(deviceId);
  },

  async previous(deviceId) {
    return player.previous(deviceId);
  },

  // ===========================
  // SEEK / VOLUME
  // ===========================

  async seek(position) {
    return player.seek(position);
  },

  async volume(value) {
    return player.volume(value);
  },

  // ===========================
  // SHUFFLE / REPEAT
  // ===========================

  async shuffle(state = true) {
    return player.shuffle(state);
  },

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

  async like(id) {
    if (!id) return;
    return player.like([id]);
  },

  async unlike(id) {
    if (!id) return;
    return player.unlike([id]);
  },

  async checkSaved(id) {
    if (!id) return [false];
    try {
      return await player.checkSaved(id);
    } catch {
      return [false];
    }
  },
};

export default playback;
