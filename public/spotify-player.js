window.onSpotifyWebPlaybackSDKReady = () => {
  window.dispatchEvent(
    new CustomEvent("spotify-sdk-ready")
  );
};

(() => {
  if (
    document.querySelector(
      'script[data-spotify-sdk]'
    )
  ) {
    return;
  }

  const script = document.createElement("script");

  script.src =
    "https://sdk.scdn.co/spotify-player.js";

  script.async = true;

  script.dataset.spotifySdk = "true";

  document.head.appendChild(script);
})();
