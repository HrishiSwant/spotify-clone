import { spotifyFetch } from "./client";

export function getFeaturedPlaylists(accessToken, limit = 20) {
  return spotifyFetch(
    `/browse/featured-playlists?limit=${limit}`,
    accessToken
  );
}

export function getCategoryPlaylists(
  accessToken,
  categoryId,
  limit = 20
) {
  return spotifyFetch(
    `/browse/categories/${categoryId}/playlists?limit=${limit}`,
    accessToken
  );
}

export function getPlaylist(accessToken, playlistId) {
  return spotifyFetch(
    `/playlists/${playlistId}?market=from_token`,
    accessToken
  );
}

export function getPlaylistTracks(
  accessToken,
  playlistId,
  limit = 100,
  offset = 0
) {
  return spotifyFetch(
    `/playlists/${playlistId}/tracks?market=from_token&limit=${limit}&offset=${offset}`,
    accessToken
  );
}

export function getCurrentUserPlaylists(
  accessToken,
  limit = 50
) {
  return spotifyFetch(
    `/me/playlists?limit=${limit}`,
    accessToken
  );
}

export function getPlaylistCover(
  accessToken,
  playlistId
) {
  return spotifyFetch(
    `/playlists/${playlistId}/images`,
    accessToken
  );
}
