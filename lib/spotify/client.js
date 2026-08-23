const BASE_URL = 'https://api.spotify.com/v1';

async function request(endpoint, options = {}) {
  console.log('Client Request:', `/api/spotify?${endpoint}`);

  const response = await fetch(
    `/api/spotify?${endpoint}`,
    {
      ...options,
      cache: 'no-store',
    }
  );

  const data = await response.json();

  console.log('Client Response:', data);

  if (!response.ok) {
    throw data;
  }

  return data;
}

const client = {
  get(action) {
    return request(`action=${action}`);
  },

  byId(action, id) {
    return request(
      `action=${action}&id=${encodeURIComponent(id)}`
    );
  },

  search(query) {
    return request(
      `action=search&q=${encodeURIComponent(query)}`
    );
  },
};

export { BASE_URL };

export default client;
