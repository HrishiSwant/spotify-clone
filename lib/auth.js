import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

const scopes = [
  "streaming",
  "user-read-email",
  "user-read-private",
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-library-read",
  "user-library-modify",
  "user-top-read",
  "user-read-recently-played",
].join(" ");

async function refreshAccessToken(token) {
  try {
    const response = await fetch(
      "https://accounts.spotify.com/api/token",
      {
        method: "POST",
        headers: {
          Authorization:
            "Basic " +
            Buffer.from(
              `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString("base64"),
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: token.refreshToken,
        }),
      }
    );

    const refreshed = await response.json();

    if (!response.ok) {
      throw refreshed;
    }

    return {
      ...token,

      accessToken:
        refreshed.access_token,

      accessTokenExpires:
        Date.now() +
        refreshed.expires_in * 1000,

      refreshToken:
        refreshed.refresh_token ??
        token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId:
        process.env.SPOTIFY_CLIENT_ID,

      clientSecret:
        process.env.SPOTIFY_CLIENT_SECRET,

      authorization: {
        params: {
          scope: scopes,
        },
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }) {
      if (account) {
        return {
          accessToken:
            account.access_token,

          accessTokenExpires:
            Date.now() +
            account.expires_at * 1000,

          refreshToken:
            account.refresh_token,

          user: profile,
        };
      }

      if (
        Date.now() <
        token.accessTokenExpires
      ) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({
      session,
      token,
    }) {
      session.user = token.user;

      session.accessToken =
        token.accessToken;

      session.error = token.error;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
