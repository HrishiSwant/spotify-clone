import client from './client';

const user = {
  profile() {
    return client.get('me');
  },

  playlists() {
    return client.get('myPlaylists');
  },

  savedTracks() {
    return client.get('savedTracks');
  },

  recentlyPlayed() {
    return client.get('recentlyPlayed');
  },

  topTracks() {
    return client.get('topTracks');
  },

  topArtists() {
    return client.get('topArtists');
  },

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

  isTrackLiked(id) {
    return client.byId('checkSaved', id);
  },

  async likeTrack(id) {
    const response = await fetch('/api/spotify?action=like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: [id],
      }),
    });

    return response.json();
  },

  async unlikeTrack(id) {
    const response = await fetch('/api/spotify?action=unlike', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: [id],
      }),
    });

    return response.json();
  },
};

export default user;
