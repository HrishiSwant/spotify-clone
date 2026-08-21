import client from './client';

const artists = {
  artist(id) {
    return client.byId('artist', id);
  },

  artistTopTracks(id) {
    return client.byId('artistTopTracks', id);
  },
};

export default artists;
