export async function searchYouTube(query) {
  const key = process.env.YOUTUBE_API_KEY;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoCategoryId=10&maxResults=1&q=${encodeURIComponent(
    query
  )}&key=${key}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  return data.items?.[0]?.id?.videoId || null;
}
