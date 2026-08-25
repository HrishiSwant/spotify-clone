import client from './client';

const playlists = {
  // Home page
  featured() {
    return client.get('featured');
  },

  // Single playlist
  playlist(id) {
    return client.byId('playlist', id);
  },

  // Current user's playlists
  myPlaylists() {
    return client.get('myPlaylists');
  },

  // Featured categories (Browse)
  categories() {
    return client.get('categories');
  },

  // Search playlists only
  search(query) {
    return client.search(query).then((result) => ({
      items: result?.playlists?.items || [],
    }));
  },

  // Recently played playlists (derived from recently played tracks)
  async recent() {
    const result = await client.get('recentlyPlayed');

    return result?.items || [];
  },
};

export default playlists;
