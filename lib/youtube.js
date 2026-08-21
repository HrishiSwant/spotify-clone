const API_BASE = '/api/youtube';

async function request(endpoint) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    cache: 'no-store',
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}

const youtube = {
  search(query) {
    return request(
      `?action=search&q=${encodeURIComponent(query)}`
    );
  },

  video(id) {
    return request(
      `?action=video&id=${encodeURIComponent(id)}`
    );
  },

  playlist(id) {
    return request(
      `?action=playlist&id=${encodeURIComponent(id)}`
    );
  },
};

export default youtube;
