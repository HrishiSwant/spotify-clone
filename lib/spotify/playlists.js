import client from './client';

const playlists = {
  featured() {
    return client.get('featured');
  },

  playlist(id) {
    return client.byId('playlist', id);
  },

  myPlaylists() {
    return client.get('myPlaylists');
  },
};

export default playlists;
