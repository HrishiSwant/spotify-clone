import client from './client';

const player = {
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
};

export default player;
