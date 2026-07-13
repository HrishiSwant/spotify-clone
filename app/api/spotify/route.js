import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { spotify } from '@/lib/spotify';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const session = await getServerSession(authOptions);
  if (!session?.accessToken)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');
  const id = searchParams.get('id');
  const q = searchParams.get('q');
  const token = session.accessToken;

  try {
    let data;
    switch (action) {
      case 'me': data = await spotify.me(token); break;
      case 'featured': data = await spotify.featured(token); break;
      case 'newReleases': data = await spotify.newReleases(token); break;
      case 'topTracks': data = await spotify.topTracks(token); break;
      case 'topArtists': data = await spotify.topArtists(token); break;
      case 'recentlyPlayed': data = await spotify.recentlyPlayed(token); break;
      case 'myPlaylists': data = await spotify.myPlaylists(token); break;
      case 'savedTracks': data = await spotify.savedTracks(token); break;
      case 'playlist': data = await spotify.playlist(token, id); break;
      case 'playlistTracks': data = await spotify.playlistTracks(token, id); break;
      case 'album': data = await spotify.album(token, id); break;
      case 'artist': data = await spotify.artist(token, id); break;
      case 'artistTopTracks': data = await spotify.artistTopTracks(token, id); break;
      case 'search': data = await spotify.search(token, q); break;
      default: return NextResponse.json({ error: 'invalid action' }, { status: 400 });
    }
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
