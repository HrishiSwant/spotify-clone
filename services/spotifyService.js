const API = "/api/spotify";

async function request(action, params = {}) {
  const query = new URLSearchParams({
    action,
    ...params,
  });

  const res = await fetch(`${API}?${query.toString()}`, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
}

const spotifyService = {
  // ==========================
  // USER
  // ==========================

  me() {
    return request("me");
  },

  myPlaylists() {
    return request("myPlaylists");
  },

  savedTracks() {
    return request("savedTracks");
  },

  topTracks() {
    return request("topTracks");
  },

  topArtists() {
    return request("topArtists");
  },

  recentlyPlayed() {
    return request("recentlyPlayed");
  },

  followedArtists() {
    return request("followedArtists");
  },

  // ==========================
  // HOME
  // ==========================

  featured() {
    return request("featured");
  },

  newReleases() {
    return request("newReleases");
  },

  // ==========================
  // PLAYLIST
  // ==========================

  playlist(id) {
    return request("playlist", { id });
  },

  playlistTracks(id) {
    return request("playlistTracks", { id });
  },

  playlistCover(id) {
    return request("playlistCover", { id });
  },

  // ==========================
  // ALBUM
  // ==========================

  album(id) {
    return request("album", { id });
  },

  albumTracks(id) {
    return request("albumTracks", { id });
  },

  // ==========================
  // ARTIST
  // ==========================

  artist(id) {
    return request("artist", { id });
  },

  artistTopTracks(id) {
    return request("artistTopTracks", { id });
  },

  artistAlbums(id) {
    return request("artistAlbums", { id });
  },

  relatedArtists(id) {
    return request("relatedArtists", { id });
  },

  // ==========================
  // SEARCH
  // ==========================

  search(q) {
    return request("search", { q });
  },

  searchTracks(q) {
    return request("searchTracks", { q });
  },

  searchArtists(q) {
    return request("searchArtists", { q });
  },

  searchAlbums(q) {
    return request("searchAlbums", { q });
  },

  searchPlaylists(q) {
    return request("searchPlaylists", { q });
  },

  // ==========================
  // PLAYER
  // ==========================

  player() {
    return request("player");
  },

  currentlyPlaying() {
    return request("currentlyPlaying");
  },

  devices() {
    return request("devices");
  },
};

export default spotifyService;
