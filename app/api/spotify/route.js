import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";
import { spotify } from "@/lib/spotify";

export async function GET(request) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);

  const action = searchParams.get("action");
  const id = searchParams.get("id");
  const q = searchParams.get("q");

  const token = session.accessToken;

  try {
    let result = null;

    switch (action) {
      case "me":
        result = await spotify.me(token);
        break;

      case "featured":
        result = await spotify.featured(token);
        break;

      case "newReleases":
        result = await spotify.newReleases(token);
        break;

      case "categories":
        result = await spotify.categories(token);
        break;

      case "myPlaylists":
        result = await spotify.myPlaylists(token);
        break;

      case "savedTracks":
        result = await spotify.savedTracks(token);
        break;

      case "recentlyPlayed":
        result = await spotify.recentlyPlayed(token);
        break;

      case "topTracks":
        result = await spotify.topTracks(token);
        break;

      case "topArtists":
        result = await spotify.topArtists(token);
        break;

      case "playlist":
        if (!id)
          return NextResponse.json(
            { success: false, message: "Playlist ID required" },
            { status: 400 }
          );

        result = await spotify.playlist(token, id);
        break;

      case "album":
        if (!id)
          return NextResponse.json(
            { success: false, message: "Album ID required" },
            { status: 400 }
          );

        result = await spotify.album(token, id);
        break;

      case "albumTracks":
        if (!id)
          return NextResponse.json(
            { success: false, message: "Album ID required" },
            { status: 400 }
          );

        result = await spotify.albumTracks(token, id);
        break;

      case "artist":
        if (!id)
          return NextResponse.json(
            { success: false, message: "Artist ID required" },
            { status: 400 }
          );

        result = await spotify.artist(token, id);
        break;

      case "artistTopTracks":
        if (!id)
          return NextResponse.json(
            { success: false, message: "Artist ID required" },
            { status: 400 }
          );

        result = await spotify.artistTopTracks(token, id);
        break;

      case "search":
        if (!q)
          return NextResponse.json(
            { success: false, message: "Search query required" },
            { status: 400 }
          );

        result = await spotify.search(token, q);
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid action",
          },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        status: err.status || 500,
        message: err.message || "Spotify request failed",
      },
      {
        status: err.status || 500,
      }
    );
  }
}
