import { spotifyFetch } from "./client";

export function getCurrentUser(accessToken) {
  return spotifyFetch("/me", accessToken);
}

export function getTopTracks(accessToken, limit = 20) {
  return spotifyFetch(
    `/me/top/tracks?limit=${limit}`,
    accessToken
  );
}

export function getTopArtists(accessToken, limit = 20) {
  return spotifyFetch(
    `/me/top/artists?limit=${limit}`,
    accessToken
  );
}

export function getRecentlyPlayed(accessToken, limit = 20) {
  return spotifyFetch(
    `/me/player/recently-played?limit=${limit}`,
    accessToken
  );
}

export function getSavedTracks(accessToken, limit = 50) {
  return spotifyFetch(
    `/me/tracks?limit=${limit}`,
    accessToken
  );
}

export function getUserPlaylists(accessToken, limit = 50) {
  return spotifyFetch(
    `/me/playlists?limit=${limit}`,
    accessToken
  );
}

export function getFollowedArtists(accessToken, limit = 20) {
  return spotifyFetch(
    `/me/following?type=artist&limit=${limit}`,
    accessToken
  );
}
