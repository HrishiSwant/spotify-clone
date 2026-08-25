import client from './client';

const artists = {
  // Get artist details
  artist(id) {
    return client.byId('artist', id);
  },

  // Get artist's top tracks
  artistTopTracks(id) {
    return client.byId('artistTopTracks', id);
  },

  // Alias for consistency
  topTracks(id) {
    return this.artistTopTracks(id);
  },

  // Search artists only
  search(query) {
    return client.search(query).then((result) => ({
      items: result?.artists?.items || [],
    }));
  },

  // Fetch artist + top tracks together
  async getArtistWithTopTracks(id) {
    const [artist, topTracks] = await Promise.all([
      this.artist(id),
      this.artistTopTracks(id),
    ]);

    return {
      ...artist,
      topTracks: topTracks?.tracks || [],
    };
  },
};

export default artists;
