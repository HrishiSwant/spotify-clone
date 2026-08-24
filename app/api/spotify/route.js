import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

const BASE_URL = "https://api.spotify.com/v1";

async function spotifyFetch(endpoint, token, options = {}) {
  console.log("========================================");
  console.log("Spotify Request:", `${BASE_URL}${endpoint}`);
  console.log("Method:", options.method || "GET");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  console.log("Spotify Status:", response.status);

console.log("Spotify Headers:");
console.log(
  Object.fromEntries(response.headers.entries())
);

  console.log("Spotify Status:", response.status);

  if (response.status === 204) {
    console.log("Spotify returned 204 No Content");
    return null;
  }

  const data = await response.json().catch(() => ({}));

  console.log("Spotify Response:");
  console.log(JSON.stringify(data, null, 2));

  if (!response.ok) {
    throw {
      status: response.status,
      message: data,
    };
  }

  return data;
}

export async function GET(request) {
  console.log("========== GET /api/spotify ==========");

  const session = await getServerSession(authOptions);

  console.log("Session exists:", !!session);
  console.log("Access Token exists:", !!session?.accessToken);

  if (!session?.accessToken) {
    console.log("Unauthorized request");
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }

  const token = session.accessToken;

  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const q = searchParams.get("q");

  console.log("Action:", action);
  console.log("ID:", id);
  console.log("Query:", q);

  try {
    switch (action) {
      case "me":
        console.log("Calling /me");
        return NextResponse.json(
          await spotifyFetch("/me", token)
        );

      case "featured":
        console.log("Calling /me/playlists");
        return NextResponse.json(
          await spotifyFetch(
            "/me/playlists?limit=20",
            token
          )
        );

      case "newReleases":
        console.log("Calling /browse/new-releases");
        return NextResponse.json(
          await spotifyFetch(
            "/browse/new-releases?limit=20",
            token
          )
        );

      case "categories":
        console.log("Calling /browse/categories");
        return NextResponse.json(
          await spotifyFetch(
            "/browse/categories?limit=20",
            token
          )
        );

      case "playlist":
        console.log("Playlist:", id);
        return NextResponse.json(
          await spotifyFetch(
            `/playlists/${id}?market=from_token`,
            token
          )
        );

      case "album":
        console.log("Album:", id);
        return NextResponse.json(
          await spotifyFetch(
            `/albums/${id}`,
            token
          )
        );

      case "albumTracks":
        console.log("Album Tracks:", id);
        return NextResponse.json(
          await spotifyFetch(
            `/albums/${id}/tracks`,
            token
          )
        );

      case "artist":
        console.log("Artist:", id);
        return NextResponse.json(
          await spotifyFetch(
            `/artists/${id}`,
            token
          )
        );

      case "artistTopTracks":
        console.log("Artist Top Tracks:", id);
        return NextResponse.json(
          await spotifyFetch(
            `/artists/${id}/top-tracks?market=from_token`,
            token
          )
        );

      case "savedTracks":
        console.log("Saved Tracks");
        return NextResponse.json(
          await spotifyFetch(
            "/me/tracks?limit=50",
            token
          )
        );

      case "myPlaylists":
        console.log("My Playlists");
        return NextResponse.json(
          await spotifyFetch(
            "/me/playlists?limit=50",
            token
          )
        );

      case "recentlyPlayed":
        console.log("Recently Played");
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/recently-played?limit=50",
            token
          )
        );

      case "topTracks":
        console.log("Top Tracks");
        return NextResponse.json(
          await spotifyFetch(
            "/me/top/tracks?limit=20",
            token
          )
        );

      case "topArtists":
        console.log("Top Artists");
        return NextResponse.json(
          await spotifyFetch(
            "/me/top/artists?limit=20",
            token
          )
        );

      case "search":
  console.log("Searching:", q);

  const endpoint =`/search?q=${encodeURIComponent(q)}&type=track,artist,album,playlist&limit=10`;

  console.log("Final Search URL:");
  console.log(`${BASE_URL}${endpoint}`);

  return NextResponse.json(
    await spotifyFetch(
      endpoint,
      token
    )
  );

      case "devices":
        console.log("Devices");
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/devices",
            token
          )
        );

      case "currentPlayback":
        console.log("Current Playback");
        return NextResponse.json(
          await spotifyFetch(
            "/me/player",
            token
          )
        );

      case "currentlyPlaying":
        console.log("Currently Playing");
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/currently-playing",
            token
          )
        );

      case "queue":
        console.log("Queue");
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/queue",
            token
          )
        );

      default:
        console.log("Unknown action:", action);

        return NextResponse.json(
          {
            success: false,
            message: "Unknown action",
          },
          {
            status: 400,
          }
        );
    }
  } catch (err) {
    console.log("Spotify Error:");
    console.log(JSON.stringify(err, null, 2));

    return NextResponse.json(err, {
      status: err.status || 500,
    });
  }
}

export async function PUT(request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const token = session.accessToken;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  const body = await request.json().catch(() => ({}));

  try {
    switch (action) {
      case "transfer":
        await spotifyFetch("/me/player", token, {
          method: "PUT",
          body: JSON.stringify({
            device_ids: [body.deviceId],
          }),
        });
        break;

      case "play":
        await spotifyFetch("/me/player/play", token, {
          method: "PUT",
          body: JSON.stringify(body),
        });
        break;

      case "pause":
        await spotifyFetch("/me/player/pause", token, {
          method: "PUT",
        });
        break;

      case "seek":
        await spotifyFetch(
          `/me/player/seek?position_ms=${searchParams.get("position")}`,
          token,
          {
            method: "PUT",
          }
        );
        break;

      case "volume":
        await spotifyFetch(
          `/me/player/volume?volume_percent=${searchParams.get("volume")}`,
          token,
          {
            method: "PUT",
          }
        );
        break;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));

    return NextResponse.json(err, {
      status: err.status || 500,
    });
  }
}

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({}, {
      status: 401,
    });
  }

  const token = session.accessToken;
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  try {
    if (action === "next") {
      await spotifyFetch("/me/player/next", token, {
        method: "POST",
      });
    }

    if (action === "previous") {
      await spotifyFetch("/me/player/previous", token, {
        method: "POST",
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    console.log(JSON.stringify(err, null, 2));

    return NextResponse.json(err, {
      status: err.status || 500,
    });
  }
}
