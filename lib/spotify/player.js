import client from './client';

const player = {
  // ==========================
  // GET
  // ==========================

  devices() {
    return client.get('devices');
  },

  currentPlayback() {
    return client.get('currentPlayback');
  },

  currentlyPlaying() {
    return client.get('currentlyPlaying');
  },

  queue() {
    return client.get('queue');
  },

  checkSaved(id) {
    return client.byId('checkSaved', id);
  },

  // ==========================
  // PLAYBACK
  // ==========================

  transfer(deviceId) {
    return fetch('/api/spotify?action=transfer', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId,
      }),
    }).then((r) => r.json());
  },

  play(data = {}) {
    return fetch('/api/spotify?action=play', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },

  pause() {
    return fetch('/api/spotify?action=pause', {
      method: 'PUT',
    }).then((r) => r.json());
  },

  next() {
    return fetch('/api/spotify?action=next', {
      method: 'POST',
    }).then((r) => r.json());
  },

  previous() {
    return fetch('/api/spotify?action=previous', {
      method: 'POST',
    }).then((r) => r.json());
  },

  seek(position) {
    return fetch(
      `/api/spotify?action=seek&position=${position}`,
      {
        method: 'PUT',
      }
    ).then((r) => r.json());
  },

  volume(volumePercent) {
    return fetch(
      `/api/spotify?action=volume&volume=${volumePercent}`,
      {
        method: 'PUT',
      }
    ).then((r) => r.json());
  },

  // ==========================
  // PLAYER SETTINGS
  // ==========================

  shuffle(state) {
    return fetch('/api/spotify?action=shuffle', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
      }),
    }).then((r) => r.json());
  },

  repeat(state) {
    return fetch('/api/spotify?action=repeat', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        state,
      }),
    }).then((r) => r.json());
  },

  // ==========================
  // LIKED SONGS
  // ==========================

  like(ids) {
    return fetch('/api/spotify?action=like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids,
      }),
    }).then((r) => r.json());
  },

  unlike(ids) {
    return fetch('/api/spotify?action=unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids,
      }),
    }).then((r) => r.json());
  },
};

export default player;
