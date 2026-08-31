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
    if (!id) return Promise.resolve([false]);
    return client.byId('checkSaved', id).catch(() => [false]);
  },

  // ==========================
  // PLAYBACK
  // ==========================

  transfer(deviceId) {
    if (!deviceId) return Promise.resolve({ success: false });

    return fetch('/api/spotify?action=transfer', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceId,
      }),
    }).then(async (r) => {
      // 204 / empty body is success from Spotify
      if (r.status === 204 || r.ok) {
        return { success: true };
      }
      const data = await r.json().catch(() => ({}));
      // Treat 404 as soft failure (no active device yet)
      if (r.status === 404) {
        return { success: false, soft: true };
      }
      throw data;
    });
  },

  play(data = {}) {
    const deviceId = data.device_id;
    delete data.device_id;

    const url = `/api/spotify?action=play${
      deviceId
        ? `&device_id=${encodeURIComponent(deviceId)}`
        : ''
    }`;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      const err = await r.json().catch(() => ({}));
      throw err;
    });
  },

  pause(deviceId) {
    const url = `/api/spotify?action=pause${
      deviceId ? `&device_id=${encodeURIComponent(deviceId)}` : ''
    }`;
    return fetch(url, { method: 'PUT' }).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  next(deviceId) {
    const url = `/api/spotify?action=next${
      deviceId ? `&device_id=${encodeURIComponent(deviceId)}` : ''
    }`;
    return fetch(url, { method: 'POST' }).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  previous(deviceId) {
    const url = `/api/spotify?action=previous${
      deviceId ? `&device_id=${encodeURIComponent(deviceId)}` : ''
    }`;
    return fetch(url, { method: 'POST' }).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  seek(position) {
    return fetch(
      `/api/spotify?action=seek&position=${position}`,
      { method: 'PUT' }
    ).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  volume(volumePercent) {
    return fetch(
      `/api/spotify?action=volume&volume=${volumePercent}`,
      { method: 'PUT' }
    ).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  shuffle(state) {
    return fetch('/api/spotify?action=shuffle', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    }).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  repeat(state) {
    return fetch('/api/spotify?action=repeat', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state }),
    }).then(async (r) => {
      if (r.status === 204 || r.ok) return { success: true };
      return r.json().catch(() => ({}));
    });
  },

  like(ids) {
    return fetch('/api/spotify?action=like', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.isArray(ids) ? ids : [ids] }),
    }).then((r) => r.json().catch(() => ({})));
  },

  unlike(ids) {
    return fetch('/api/spotify?action=unlike', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: Array.isArray(ids) ? ids : [ids] }),
    }).then((r) => r.json().catch(() => ({})));
  },

  addToQueue(uri) {
    return fetch(
      `/api/spotify?action=addToQueue&uri=${encodeURIComponent(uri)}`,
      { method: 'POST' }
    ).then((r) => r.json().catch(() => ({})));
  },
};

export default player;
