# Spotify Clone - Current Development Status

## Project
Spotify Clone built with:
- Next.js 14 (App Router)
- NextAuth.js
- Spotify Web API
- Tailwind CSS

---

## Completed

### Authentication
- Spotify OAuth implemented using NextAuth.
- Login works successfully.
- User profile (name & avatar) loads correctly.
- Session and access token are available.
- Token refresh logic implemented.

### Library
Working:
- User playlists
- Saved tracks
- Top tracks
- Top artists
- Recently played

### API
Implemented endpoints:
- me
- featured
- newReleases
- categories
- myPlaylists
- savedTracks
- recentlyPlayed
- topTracks
- topArtists
- playlist
- album
- albumTracks
- artist
- artistTopTracks
- search

---

## Current Issue

### Playlist Page

Route:
```
/playlist/[id]
```

Problem:
- Playlist information (name, image, description) loads correctly.
- Track list is inconsistent.

Observed behaviour:

#### User-created playlists
- Tracks are detected.
- Row numbers appear.
- Track details are missing.
- Clicking a track does not open the player.

#### Public playlists
- Playlist metadata loads.
- Track array is usually empty.

---

## Investigation Performed

Verified:
- NextAuth configuration
- Spotify scopes
- Environment variables
- Vercel deployment
- API routing
- Playlist page
- TrackList component
- TrackItem component

Multiple versions of `spotify.playlist()` were tested.

No final solution has been reached.

---

## Current Hypothesis

Spotify is returning different response structures depending on playlist type.

Examples observed:
- `playlist.tracks.items`
- `playlist.items.items`
- Empty `tracks.items`
- 403 responses from `/playlists/{id}/tracks` for some playlists

A normalization layer is required before rendering.

---

## Current State

Authentication: ✅
API: ✅
Library: ✅
Search: ✅
Playlist metadata: ✅
Playlist tracks: ❌
Player from playlist: ❌

---

## Next Steps

1. Inspect raw Spotify playlist responses.
2. Create one normalized track object format.
3. Update playlist API to always return identical structure.
4. Verify TrackItem and PlayerContext receive proper Spotify Track objects.
5. Restore playback from playlist.
