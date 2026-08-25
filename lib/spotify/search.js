import client from './client';

const search = {
  // Search everything
  async search(query) {
    if (!query?.trim()) {
      return {
        tracks: { items: [] },
        artists: { items: [] },
        albums: { items: [] },
        playlists: { items: [] },
      };
    }

    return client.search(query);
  },

  // Tracks only
  async tracks(query) {
    const result = await client.search(query);

    return {
      items: result?.tracks?.items || [],
    };
  },

  // Artists only
  async artists(query) {
    const result = await client.search(query);

    return {
      items: result?.artists?.items || [],
    };
  },

  // Albums only
  async albums(query) {
    const result = await client.search(query);

    return {
      items: result?.albums?.items || [],
    };
  },

  // Playlists only
  async playlists(query) {
    const result = await client.search(query);

    return {
      items: result?.playlists?.items || [],
    };
  },
};

export default search;
