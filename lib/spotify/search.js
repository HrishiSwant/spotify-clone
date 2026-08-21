import { spotifyFetch } from "./client";

export function searchSpotify(
  accessToken,
  query,
  types = ["track", "artist", "album", "playlist"],
  limit = 20,
  offset = 0
) {
  return spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=${types.join(",")}&limit=${limit}&offset=${offset}`,
    accessToken
  );
}

export function searchTracks(
  accessToken,
  query,
  limit = 20
) {
  return spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=track&limit=${limit}`,
    accessToken
  );
}

export function searchArtists(
  accessToken,
  query,
  limit = 20
) {
  return spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=artist&limit=${limit}`,
    accessToken
  );
}

export function searchAlbums(
  accessToken,
  query,
  limit = 20
) {
  return spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=album&limit=${limit}`,
    accessToken
  );
}

export function searchPlaylists(
  accessToken,
  query,
  limit = 20
) {
  return spotifyFetch(
    `/search?q=${encodeURIComponent(query)}&type=playlist&limit=${limit}`,
    accessToken
  );
}
