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
  

  if (response.status === 204) {
    return null;
  }

 const text = await response.text();

console.log("Spotify Response:", text);

if (!response.ok) {
  throw {
    status: response.status,
    message: text,
  };
}

return text ? JSON.parse(text) : null;
}

export async function GET(request) {
  const session = await getServerSession(authOptions);

  console.log("SESSION:", session);
console.log("TOKEN:", session?.accessToken);

  if (!session?.accessToken) {
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

  try {
    switch (action) {
      case "me":
        return NextResponse.json(
          await spotifyFetch("/me", token)
        );

      case "featured":
        return NextResponse.json(
          await spotifyFetch(
            "/me/playlists?limit=20",
            token
          )
        );

      case "newReleases":
        return NextResponse.json(
          await spotifyFetch(
            "/browse/new-releases?limit=20",
            token
          )
        );

      case "categories":
        return NextResponse.json(
          await spotifyFetch(
            "/browse/categories?limit=20",
            token
          )
        );

      case "playlist":
        return NextResponse.json(
          await spotifyFetch(
            `/playlists/${id}?market=from_token`,
            token
          )
        );

      case "album":
        return NextResponse.json(
          await spotifyFetch(
            `/albums/${id}`,
            token
          )
        );

      case "albumTracks":
        return NextResponse.json(
          await spotifyFetch(
            `/albums/${id}/tracks`,
            token
          )
        );

      case "artist":
        return NextResponse.json(
          await spotifyFetch(
            `/artists/${id}`,
            token
          )
        );

      case "artistTopTracks":
        return NextResponse.json(
          await spotifyFetch(
            `/artists/${id}/top-tracks?market=from_token`,
            token
          )
        );

      case "savedTracks":
        return NextResponse.json(
          await spotifyFetch(
            "/me/tracks?limit=50",
            token
          )
        );

      case "myPlaylists":
        return NextResponse.json(
          await spotifyFetch(
            "/me/playlists?limit=50",
            token
          )
        );

      case "recentlyPlayed":
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/recently-played?limit=50",
            token
          )
        );

      case "topTracks":
        return NextResponse.json(
          await spotifyFetch(
            "/me/top/tracks?limit=20",
            token
          )
        );

      case "topArtists":
        return NextResponse.json(
          await spotifyFetch(
            "/me/top/artists?limit=20",
            token
          )
        );

      case "search": {
        if (!q) {
          return NextResponse.json({
            tracks: { items: [] },
            artists: { items: [] },
            albums: { items: [] },
            playlists: { items: [] },
          });
        }

        const result = await spotifyFetch(
          `/search?q=${encodeURIComponent(
            q
          )}&type=track,artist,album,playlist&limit=10`,
          token
        );

        return NextResponse.json({
          tracks: result?.tracks || { items: [] },
          artists: result?.artists || { items: [] },
          albums: result?.albums || { items: [] },
          playlists: result?.playlists || { items: [] },
        });
      }

      case "devices":
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/devices",
            token
          )
        );

      case "currentPlayback":
        return NextResponse.json(
          await spotifyFetch(
            "/me/player",
            token
          )
        );

      case "currentlyPlaying":
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/currently-playing",
            token
          )
        );

      case "queue":
        return NextResponse.json(
          await spotifyFetch(
            "/me/player/queue",
            token
          )
        );

      case "checkSaved":
        return NextResponse.json(
          await spotifyFetch(
            `/me/tracks/contains?ids=${id}`,
            token
          )
        );

      default:
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
      play: true,
    }),
  });
  break;

case "play": {
  const deviceId = searchParams.get("device_id");

  await spotifyFetch(
    `/me/player/play${
      deviceId
        ? `?device_id=${encodeURIComponent(deviceId)}`
        : ""
    }`,
    token,
    {
      method: "PUT",
      body: JSON.stringify(body),
    }
  );

  break;
}

case "pause": {
  const deviceId = searchParams.get("device_id");

  await spotifyFetch(
    `/me/player/pause${
      deviceId
        ? `?device_id=${encodeURIComponent(deviceId)}`
        : ""
    }`,
    token,
    {
      method: "PUT",
    }
  );

  break;
}

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
        case "next": {
  const deviceId = searchParams.get("device_id");

  await spotifyFetch(
    `/me/player/next${
      deviceId
        ? `?device_id=${encodeURIComponent(deviceId)}`
        : ""
    }`,
    token,
    {
      method: "POST",
    }
  );

  break;
}

      case "shuffle":
        await spotifyFetch(
          `/me/player/shuffle?state=${body.state}`,
          token,
          {
            method: "PUT",
          }
        );
        break;

      case "repeat":
        await spotifyFetch(
          `/me/player/repeat?state=${body.state}`,
          token,
          {
            method: "PUT",
          }
        );
        break;

      case "like":
        await spotifyFetch(
          "/me/tracks",
          token,
          {
            method: "PUT",
            body: JSON.stringify({
              ids: body.ids,
            }),
          }
        );
        break;

      case "unlike":
        await spotifyFetch(
          "/me/tracks",
          token,
          {
            method: "DELETE",
            body: JSON.stringify({
              ids: body.ids,
            }),
          }
        );
        break;

      default:
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
    return NextResponse.json(
      { success: false },
      { status: 401 }
    );
  }

  const token = session.accessToken;

  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action");

  try {
    switch (action) {
      case "next":
        await spotifyFetch("/me/player/next", token, {
          method: "POST",
        });
        break;

     case "previous": {
  const deviceId = searchParams.get("device_id");

  await spotifyFetch(
    `/me/player/previous${
      deviceId
        ? `?device_id=${encodeURIComponent(deviceId)}`
        : ""
    }`,
    token,
    {
      method: "POST",
    }
  );

  break;
}

      default:
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

    return NextResponse.json({
      success: true,
    });
  } catch (err) {
    return NextResponse.json(err, {
      status: err.status || 500,
    });
  }
}
