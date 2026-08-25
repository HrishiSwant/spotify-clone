import client from './client';

const albums = {
  // Home page
  newReleases() {
    return client.get('newReleases');
  },

  // Single album
  album(id) {
    return client.byId('album', id);
  },

  // Album tracks
  albumTracks(id) {
    return client.byId('albumTracks', id);
  },

  // Search albums only
  search(query) {
    return client.search(query).then((result) => ({
      items: result?.albums?.items || [],
    }));
  },

  // Convenience method
  async getAlbumWithTracks(id) {
    const [album, tracks] = await Promise.all([
      this.album(id),
      this.albumTracks(id),
    ]);

    return {
      ...album,
      tracks: tracks?.items || [],
    };
  },
};

export default albums;
