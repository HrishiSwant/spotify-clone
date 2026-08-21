export function msToTime(ms = 0) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${minutes}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function formatDuration(ms = 0) {
  return msToTime(ms);
}

export function formatFollowers(number = 0) {
  return new Intl.NumberFormat().format(number);
}

export function formatNumber(number = 0) {
  return new Intl.NumberFormat().format(number);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

export function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatArtists(artists = []) {
  return artists.map((artist) => artist.name).join(", ");
}

export function getImage(images = []) {
  if (!images.length) return "";

  return images[0].url;
}

export function shuffle(array = []) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function debounce(fn, delay = 300) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

export function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function isTrack(item) {
  return item?.type === "track";
}

export function isAlbum(item) {
  return item?.type === "album";
}

export function isArtist(item) {
  return item?.type === "artist";
}

export function isPlaylist(item) {
  return item?.type === "playlist";
}
