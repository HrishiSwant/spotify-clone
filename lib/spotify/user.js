import client from "./client";

const user = {
  profile() {
    return client.get("me");
  },

  playlists() {
    return client.get("myPlaylists");
  },

  savedTracks() {
    return client.get("savedTracks");
  },

  recentlyPlayed() {
    return client.get("recentlyPlayed");
  },

  topTracks() {
    return client.get("topTracks");
  },

  topArtists() {
    return client.get("topArtists");
  },

  devices() {
    return client.get("devices");
  },

  currentPlayback() {
    return client.get("currentPlayback");
  },

  currentlyPlaying() {
    return client.get("currentlyPlaying");
  },

  queue() {
    return client.get("queue");
  },
};

export default user;
