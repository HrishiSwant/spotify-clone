import api from "./client";

const user = {
  profile: () =>
    api.get("/api/spotify?action=me"),

  playlists: () =>
    api.get("/api/spotify?action=myPlaylists"),

  savedTracks: () =>
    api.get("/api/spotify?action=savedTracks"),

  recentlyPlayed: () =>
    api.get("/api/spotify?action=recentlyPlayed"),

  topTracks: () =>
    api.get("/api/spotify?action=topTracks"),

  topArtists: () =>
    api.get("/api/spotify?action=topArtists"),

  devices: () =>
    api.get("/api/spotify?action=devices"),

  currentPlayback: () =>
    api.get("/api/spotify?action=currentPlayback"),

  currentlyPlaying: () =>
    api.get("/api/spotify?action=currentlyPlaying"),

  queue: () =>
    api.get("/api/spotify?action=queue"),
};

export default user;
