const BASE = 'https://api.spotify.com/v1';

async function req(endpoint, token, options = {}) {
  const res = await fetch(`${BASE}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {})
    }
  });
  if (!res.ok) throw new Error(`Spotify ${res.status}: ${await res.text()}`);
  return res.json();
}

export const spotify = {
  me: (t) => req('/me', t),

  // featured-playlists is DEPRECATED (403). Use the user's own playlists
  // as the "featured" section so the homepage still populates.
  featured: (t) => req('/me/playlists?limit=20', t),

  newReleases: (t) => req('/browse/new-releases?limit=20', t),

  topTracks: (t) => req('/me/top/tracks?limit=20', t),
  topArtists: (t) => req('/me/top/artists?limit=20', t),
  recentlyPlayed: (t) => req('/me/player/recently-played?limit=20', t),
  myPlaylists: (t) => req('/me/playlists?limit=50', t),
  savedTracks: (t) => req('/me/tracks?limit=50', t),
  playlist: (t, id) => req(`/playlists/${id}?market=from_token&fields=id,name,description,images,owner,items(track(name,id,duration_ms,artists(name),album(images)))`, t),
  playlistTracks: (t, id) => req(`/playlists/${id}/tracks?market=from_token&limit=100`, t),
  album: (t, id) => req(`/albums/${id}`, t),
  artist: (t, id) => req(`/artists/${id}`, t),
  artistTopTracks: (t, id) => req(`/artists/${id}/top-tracks?market=US`, t),
  search: (t, q, types = 'track,artist,album,playlist') =>
    req(`/search?q=${encodeURIComponent(q)}&type=${types}&limit=20`, t)
};
