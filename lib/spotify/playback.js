import player from './player';

const playback = {
  // ===========================
  // PLAY
  // ===========================

  async playTrack(uri, deviceId) {
    console.log('STEP 15 - playback.playTrack()');
    console.log('URI:', uri);
    console.log('Device ID:', deviceId);

    if (!uri || !deviceId) {
      console.error('STEP 15 FAILED - Missing uri or deviceId');
      return;
    }

    console.log('STEP 16 - Calling player.play()');

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
    console.log('STEP 17 - playback.playContext()');
    console.log('Context URI:', contextUri);
    console.log('Device ID:', deviceId);
    console.log('Offset:', offset);

    if (!contextUri || !deviceId) {
      console.error('STEP 17 FAILED - Missing contextUri or deviceId');
      return;
    }

    console.log('STEP 18 - Calling player.play()');

    return player.play({
      device_id: deviceId,
      context_uri: contextUri,
      offset: {
        position: offset,
      },
    });
  },

  async resume(deviceId) {
    console.log('Resume Playback');

    if (!deviceId) {
      console.error('No deviceId');
      return;
    }

    return player.play({
      device_id: deviceId,
    });
  },

  // ===========================
  // TRANSPORT
  // ===========================

  async pause() {
    console.log('Pause Playback');
    return player.pause();
  },

  async next() {
    console.log('Next Track');
    return player.next();
  },

  async previous() {
    console.log('Previous Track');
    return player.previous();
  },

  // ===========================
  // SEEK
  // ===========================

  async seek(position) {
    console.log('Seek:', position);
    return player.seek(position);
  },

  // ===========================
  // VOLUME
  // ===========================

  async volume(value) {
    console.log('Volume:', value);
    return player.volume(value);
  },

  // ===========================
  // SHUFFLE
  // ===========================

  async shuffle(state = true) {
    console.log('Shuffle:', state);
    return player.shuffle(state);
  },

  // ===========================
  // REPEAT
  // ===========================

  async repeat(state = 'off') {
    console.log('Repeat:', state);
    return player.repeat(state);
  },

  // ===========================
  // QUEUE
  // ===========================

  async queue() {
    console.log('Queue');
    return player.queue();
  },

  async addToQueue(uri) {
    console.log('Add To Queue:', uri);

    if (!uri) return;

    return player.addToQueue(uri);
  },

  // ===========================
  // DEVICES
  // ===========================

  async devices() {
    console.log('Devices');
    return player.devices();
  },

  async transfer(deviceId) {
    console.log('STEP 19 - playback.transfer()');
    console.log('Device ID:', deviceId);

    if (!deviceId) {
      console.error('STEP 19 FAILED - No deviceId');
      return;
    }

    console.log('STEP 20 - Calling player.transfer()');

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
    console.log('Like:', id);

    if (!id) return;

    return player.like([id]);
  },

  async unlikeTrack(id) {
    console.log('Unlike:', id);

    if (!id) return;

    return player.unlike([id]);
  },

  async checkSaved(id) {
    console.log('Check Saved:', id);

    if (!id) return;

    return player.checkSaved(id);
  },
};

export default playback;
