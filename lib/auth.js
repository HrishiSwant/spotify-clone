import SpotifyProvider from 'next-auth/providers/spotify';

const scopes = [
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'user-library-read',
  'user-top-read',
  'user-read-recently-played'
].join(' ');

async function refreshAccessToken(token) {
  try {
    const url = 'https://accounts.spotify.com/api/token';

    const basic = Buffer.from(
      `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString('base64');

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken
      })
    });

    const refreshed = await res.json();

    if (!res.ok) {
      console.error('Refresh Token Error:', refreshed);
      throw refreshed;
    }

    return {
      ...token,
      accessToken: refreshed.access_token,
      accessTokenExpires: Date.now() + refreshed.expires_in * 1000,
      refreshToken: refreshed.refresh_token ?? token.refreshToken
    };
  } catch (err) {
    console.error('refreshAccessToken()', err);

    return {
      ...token,
      error: 'RefreshAccessTokenError'
    };
  }
}

export const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {
          scope: [
            'user-read-email',
            'user-read-private',
            'user-library-read',
            'user-top-read',
            'user-read-recently-played',
            'playlist-read-private',
            'playlist-read-collaborative',
            'streaming',
            ].join(' '),
        },
      },
    })
  ],

  secret: process.env.NEXTAUTH_SECRET,

  debug: true,

  logger: {
    error(code, metadata) {
      console.error('[NextAuth Error]', code, metadata);
    },
    warn(code) {
      console.warn('[NextAuth Warning]', code);
    },
    debug(code, metadata) {
      console.log('[NextAuth Debug]', code, metadata);
    }
  },

  callbacks: {
    async jwt({ token, account }) {
      try {
        if (account) {
          return {
            ...token,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            accessTokenExpires: account.expires_at * 1000
          };
        }

        if (Date.now() < token.accessTokenExpires) {
          return token;
        }

        return await refreshAccessToken(token);
      } catch (err) {
        console.error('JWT Callback Error:', err);

        return {
          ...token,
          error: 'JWTCallbackError'
        };
      }
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    }
  }
};
