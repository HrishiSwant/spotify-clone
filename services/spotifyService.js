import useSpotify from '@/hooks/useSpotify';

class SpotifyService {
  constructor() {
    this.api = null;
  }

  initialize(api) {
    this.api = api;
  }

  check() {
    if (!this.api) {
      throw new Error('SpotifyService not initialized.');
    }
  }

  me() {
    this.check();
    return this.api.me();
  }

  home() {
    this.check();

    return Promise.all([
      this.api.featured(),
      this.api.newReleases(),
      this.api.categories(),
    ]);
  }

  playlist(id) {
    this.check();
    return this.api.playlist(id);
  }

  album(id) {
    this.check();
    return this.api.album(id);
  }

  artist(id) {
    this.check();
    return this.api.artist(id);
  }

  artistTopTracks(id) {
    this.check();
    return this.api.artistTopTracks(id);
  }

  likedSongs() {
    this.check();
    return this.api.savedTracks();
  }

  myLibrary() {
    this.check();

    return Promise.all([
      this.api.myPlaylists(),
      this.api.savedTracks(),
    ]);
  }

  search(query) {
    this.check();
    return this.api.search(query);
  }
}

const spotifyService = new SpotifyService();

export function initializeSpotifyService() {
  const api = useSpotify();
  spotifyService.initialize(api);
}

export default spotifyService;
