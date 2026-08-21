import { spotifyFetch } from "./client";

export function getAlbum(accessToken, albumId) {
  return spotifyFetch(
    `/albums/${albumId}?market=from_token`,
    accessToken
  );
}

export function getAlbumTracks(
  accessToken,
  albumId,
  limit = 50,
  offset = 0
) {
  return spotifyFetch(
    `/albums/${albumId}/tracks?market=from_token&limit=${limit}&offset=${offset}`,
    accessToken
  );
}

export function getNewReleases(
  accessToken,
  limit = 20
) {
  return spotifyFetch(
    `/browse/new-releases?limit=${limit}`,
    accessToken
  );
}

export function getAlbumTracksOnly(
  accessToken,
  albumId,
  limit = 50
) {
  return spotifyFetch(
    `/albums/${albumId}/tracks?limit=${limit}`,
    accessToken
  );
}
