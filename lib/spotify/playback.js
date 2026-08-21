import player from './player';

const playback = {
  async playTrack(uri, deviceId) {
    return player.play({
      device_id: deviceId,
      uris: [uri],
    });
  },

  async playContext(contextUri, deviceId, offset = 0) {
    return player.play({
      device_id: deviceId,
      context_uri: contextUri,
      offset: {
        position: offset,
      },
    });
  },

  async resume(deviceId) {
    return player.play({
      device_id: deviceId,
    });
  },

  async pause() {
    return player.pause();
  },

  async next() {
    return player.next();
  },

  async previous() {
    return player.previous();
  },

  async seek(position) {
    return player.seek(position);
  },

  async volume(volume) {
    return player.volume(volume);
  },

  async devices() {
    return player.devices();
  },

  async currentPlayback() {
    return player.currentPlayback();
  },

  async currentlyPlaying() {
    return player.currentlyPlaying();
  },

  async queue() {
    return player.queue();
  },

  async transfer(deviceId) {
    return player.transfer(deviceId);
  },
};

export default playback;
