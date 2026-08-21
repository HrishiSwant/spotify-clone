const BASE_URL = "https://api.spotify.com/v1";

async function spotifyFetch(endpoint, accessToken, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    let message = "";

    try {
      message = await response.text();
    } catch {
      message = response.statusText;
    }

    throw {
      status: response.status,
      message,
    };
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export { spotifyFetch };
