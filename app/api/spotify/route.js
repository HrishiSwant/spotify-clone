import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

import { authOptions } from "@/lib/auth";

import * as User from "@/lib/spotify/user";
import * as Playlists from "@/lib/spotify/playlists";
import * as Albums from "@/lib/spotify/albums";
import * as Artists from "@/lib/spotify/artists";
import * as Search from "@/lib/spotify/search";
import * as Player from "@/lib/spotify/player";

export async function GET(request) {
  const session = await getServerSession(authOptions);

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
    let data;

    switch (action) {
      // ==========================
      // USER
      // ==========================

      case "me":
        data = await User.getCurrentUser(token);
        break;

      case "topTracks":
        data = await User.getTopTracks(token);
        break;

      case "topArtists":
        data = await User.getTopArtists(token);
        break;

      case "recentlyPlayed":
        data = await User.getRecentlyPlayed(token);
        break;

      case "savedTracks":
        data = await User.getSavedTracks(token);
        break;

      case "myPlaylists":
        data = await User.getUserPlaylists(token);
        break;

      case "followedArtists":
        data = await User.getFollowedArtists(token);
        break;

      // ==========================
      // HOME
      // ==========================

      case "featured":
        data = await Playlists.getFeaturedPlaylists(token);
        break;

      case "newReleases":
        data = await Albums.getNewReleases(token);
        break;

      // ==========================
      // PLAYLIST
      // ==========================

      case "playlist":
        data = await Playlists.getPlaylist(token, id);
        break;

      case "playlistTracks":
        data = await Playlists.getPlaylistTracks(token, id);
        break;

      case "playlistCover":
        data = await Playlists.getPlaylistCover(token, id);
        break;

      // ==========================
      // ALBUM
      // ==========================

      case "album":
        data = await Albums.getAlbum(token, id);
        break;

      case "albumTracks":
        data = await Albums.getAlbumTracks(token, id);
        break;

      // ==========================
      // ARTIST
      // ==========================

      case "artist":
        data = await Artists.getArtist(token, id);
        break;

      case "artistTopTracks":
        data = await Artists.getArtistTopTracks(token, id);
        break;

      case "artistAlbums":
        data = await Artists.getArtistAlbums(token, id);
        break;

      case "relatedArtists":
        data = await Artists.getRelatedArtists(token, id);
        break;

      // ==========================
      // SEARCH
      // ==========================

      case "search":
        data = await Search.searchSpotify(token, q);
        break;

      case "searchTracks":
        data = await Search.searchTracks(token, q);
        break;

      case "searchArtists":
        data = await Search.searchArtists(token, q);
        break;

      case "searchAlbums":
        data = await Search.searchAlbums(token, q);
        break;

      case "searchPlaylists":
        data = await Search.searchPlaylists(token, q);
        break;

      // ==========================
      // PLAYER
      // ==========================

      case "player":
        data = await Player.getPlaybackState(token);
        break;

      case "currentlyPlaying":
        data = await Player.getCurrentlyPlaying(token);
        break;

      case "devices":
        data = await Player.getAvailableDevices(token);
        break;

      default:
        return NextResponse.json(
          {
            success: false,
            message: "Invalid action",
          },
          {
            status: 400,
          }
        );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: error.status || 500,
        message: error.message || "Spotify API Error",
      },
      {
        status: error.status || 500,
      }
    );
  }
}
