import { spotifyFetch } from "./client";

export function getArtist(accessToken, artistId) {
  return spotifyFetch(
    `/artists/${artistId}`,
    accessToken
  );
}

export function getArtistTopTracks(
  accessToken,
  artistId,
  market = "IN"
) {
  return spotifyFetch(
    `/artists/${artistId}/top-tracks?market=${market}`,
    accessToken
  );
}

export function getArtistAlbums(
  accessToken,
  artistId,
  limit = 20,
  offset = 0
) {
  return spotifyFetch(
    `/artists/${artistId}/albums?include_groups=album,single,appears_on&market=from_token&limit=${limit}&offset=${offset}`,
    accessToken
  );
}

export function getRelatedArtists(
  accessToken,
  artistId
) {
  return spotifyFetch(
    `/artists/${artistId}/related-artists`,
    accessToken
  );
}
