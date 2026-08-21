import client from './client';

const user = {
  me() {
    return client.get('me');
  },

  topTracks() {
    return client.get('topTracks');
  },

  topArtists() {
    return client.get('topArtists');
  },

  recentlyPlayed() {
    return client.get('recentlyPlayed');
  },

  savedTracks() {
    return client.get('savedTracks');
  },

  myPlaylists() {
    return client.get('myPlaylists');
  },
};

export default user;
