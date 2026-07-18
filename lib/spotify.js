const BASE_URL = "https://api.spotify.com/v1";

async function spotifyFetch(endpoint, token, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();

    throw {
      status: response.status,
      message: text,
    };
  }

  if (response.status === 204) return null;

  return response.json();
}

export const spotify = {
  // ==========================
  // USER
  // ==========================

  me(token) {
    return spotifyFetch("/me", token);
  },

  topTracks(token) {
    return spotifyFetch("/me/top/tracks?limit=20", token);
  },

  topArtists(token) {
    return spotifyFetch("/me/top/artists?limit=20", token);
  },

  recentlyPlayed(token) {
    return spotifyFetch("/me/player/recently-played?limit=20", token);
  },

  savedTracks(token) {
    return spotifyFetch("/me/tracks?limit=50", token);
  },

  myPlaylists(token) {
    return spotifyFetch("/me/playlists?limit=50", token);
  },

  // ==========================
  // HOME
  // ==========================

  featured(token) {
    return spotifyFetch("/me/playlists?limit=20", token);
  },

  newReleases(token) {
    return spotifyFetch("/browse/new-releases?limit=20", token);
  },

  categories(token) {
    return spotifyFetch("/browse/categories?limit=20", token);
  },

  // ==========================
  // PLAYLIST
  // ==========================

async playlist(token, id) {
  const playlist = await spotifyFetch(
    `/playlists/${id}?market=from_token`,
    token
  );

  // New Spotify response
  if (
    playlist.tracks &&
    Array.isArray(playlist.tracks.items) &&
    playlist.tracks.items.length > 0
  ) {
    return playlist;
  }

  // Alternate Spotify response
  if (
    playlist.items &&
    Array.isArray(playlist.items.items)
  ) {
    return {
      ...playlist,
      tracks: {
        items: playlist.items.items.map((x) => x.item || x.track || x),
      },
    };
  }

  // Older Spotify API fallback
  try {
    const tracks = await spotifyFetch(
      `/playlists/${id}/tracks?market=from_token&limit=100`,
      token
    );

    return {
      ...playlist,
      tracks,
    };
  } catch (e) {
    console.error(e);

    return playlist;
  }
}
  // ==========================
  // ALBUM
  // ==========================

  album(token, id) {
    return spotifyFetch(`/albums/${id}`, token);
  },

  albumTracks(token, id) {
    return spotifyFetch(`/albums/${id}/tracks?limit=50`, token);
  },

  // ==========================
  // ARTIST
  // ==========================

  artist(token, id) {
    return spotifyFetch(`/artists/${id}`, token);
  },

  artistTopTracks(token, id) {
    return spotifyFetch(
      `/artists/${id}/top-tracks?market=IN`,
      token
    );
  },

  // ==========================
  // SEARCH
  // ==========================

  search(
    token,
    query,
    type = "track,artist,album,playlist"
  ) {
    return spotifyFetch(
      `/search?q=${encodeURIComponent(
        query
      )}&type=${type}&limit=20`,
      token
    );
  },
};
