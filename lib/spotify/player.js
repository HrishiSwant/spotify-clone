import { spotifyFetch } from "./client";

export function getPlaybackState(accessToken) {
  return spotifyFetch(
    "/me/player",
    accessToken
  );
}

export function getCurrentlyPlaying(accessToken) {
  return spotifyFetch(
    "/me/player/currently-playing",
    accessToken
  );
}

export function getAvailableDevices(accessToken) {
  return spotifyFetch(
    "/me/player/devices",
    accessToken
  );
}

export function transferPlayback(
  accessToken,
  deviceId,
  play = true
) {
  return spotifyFetch(
    "/me/player",
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify({
        device_ids: [deviceId],
        play,
      }),
    }
  );
}

export function play(
  accessToken,
  deviceId,
  body = {}
) {
  const query = deviceId
    ? `?device_id=${deviceId}`
    : "";

  return spotifyFetch(
    `/me/player/play${query}`,
    accessToken,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );
}

export function pause(
  accessToken,
  deviceId
) {
  const query = deviceId
    ? `?device_id=${deviceId}`
    : "";

  return spotifyFetch(
    `/me/player/pause${query}`,
    accessToken,
    {
      method: "PUT",
    }
  );
}

export function nextTrack(accessToken) {
  return spotifyFetch(
    "/me/player/next",
    accessToken,
    {
      method: "POST",
    }
  );
}

export function previousTrack(accessToken) {
  return spotifyFetch(
    "/me/player/previous",
    accessToken,
    {
      method: "POST",
    }
  );
}

export function seek(
  accessToken,
  positionMs
) {
  return spotifyFetch(
    `/me/player/seek?position_ms=${positionMs}`,
    accessToken,
    {
      method: "PUT",
    }
  );
}

export function setVolume(
  accessToken,
  volume
) {
  return spotifyFetch(
    `/me/player/volume?volume_percent=${volume}`,
    accessToken,
    {
      method: "PUT",
    }
  );
}

export function setShuffle(
  accessToken,
  state
) {
  return spotifyFetch(
    `/me/player/shuffle?state=${state}`,
    accessToken,
    {
      method: "PUT",
    }
  );
}

export function setRepeat(
  accessToken,
  state
) {
  return spotifyFetch(
    `/me/player/repeat?state=${state}`,
    accessToken,
    {
      method: "PUT",
    }
  );
}
