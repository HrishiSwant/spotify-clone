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
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor(
    (ms % 3600000) / 60000
  );

  if (hours > 0) {
    return `${hours} hr ${minutes} min`;
  }

  return `${minutes} min`;
}

export function getImage(images = []) {
  return (
    images?.[0]?.url ||
    '/images/placeholder.png'
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
    '#1DB954',
    '#E13300',
    '#5038A0',
    '#148A08',
    '#BA5D07',
    '#509BF5',
    '#8C1932',
    '#477D95',
    '#777777',
    '#AF2896',
  ];

  return colors[
    Math.floor(
      Math.random() * colors.length
    )
  ];
}
