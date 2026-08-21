import client from './client';

const albums = {
  newReleases() {
    return client.get('newReleases');
  },

  album(id) {
    return client.byId('album', id);
  },

  albumTracks(id) {
    return client.byId('albumTracks', id);
  },
};

export default albums;
