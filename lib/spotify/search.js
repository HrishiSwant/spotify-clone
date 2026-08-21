import client from './client';

const search = {
  search(query) {
    return client.search(query);
  },

  tracks(query) {
    return client.search(`${query}&type=track`);
  },

  artists(query) {
    return client.search(`${query}&type=artist`);
  },

  albums(query) {
    return client.search(`${query}&type=album`);
  },

  playlists(query) {
    return client.search(`${query}&type=playlist`);
  },
};

export default search;
