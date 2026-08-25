export function msToTime(ms = 0) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);

  return `${minutes}:${seconds
    .toString()
    .padStart(2, '0')}`;
}

export function formatArtists(artists = []) {
  return artists
    .map((artist) => artist.name)
    .join(', ');
}

export function formatFollowers(value = 0) {
  return Number(value).toLocaleString();
}

export function formatDuration(ms = 0) {
  const totalMinutes = Math.floor(ms / 60000);

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }

  return `${minutes} min`;
}

export function getImage(images = []) {
  if (!images || images.length === 0) {
    return "/images/placeholder.png";
  }

  return (
    images[0]?.url ||
    "/images/placeholder.png"
  );
}

export function shuffleArray(array = []) {
  const copy = [...array];

  for (
    let i = copy.length - 1;
    i > 0;
    i--
  ) {
    const j = Math.floor(
      Math.random() * (i + 1)
    );

    [copy[i], copy[j]] = [
      copy[j],
      copy[i],
    ];
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

export function randomColor() {
  const colors = [
    "#1DB954",
    "#E13300",
    "#5038A0",
    "#148A08",
    "#BA5D07",
    "#509BF5",
    "#8C1932",
    "#477D95",
    "#777777",
    "#AF2896",
  ];

  return colors[
    Math.floor(
      Math.random() * colors.length
    )
  ];
}

/* ---------- NEW HELPERS ---------- */

export function formatTrackCount(count = 0) {
  return `${Number(count).toLocaleString()} songs`;
}

export function formatPlaylistLikes(count = 0) {
  return `${Number(count).toLocaleString()} likes`;
}

export function isTrack(track, currentTrack) {
  return (
    !!track &&
    !!currentTrack &&
    track.id === currentTrack.id
  );
}

export function getTrackArtists(track) {
  return formatArtists(track?.artists || []);
}

export function getAlbumImage(track) {
  return getImage(track?.album?.images);
}

export function formatReleaseYear(date) {
  if (!date) return "";

  return String(date).substring(0, 4);
}

export function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}
