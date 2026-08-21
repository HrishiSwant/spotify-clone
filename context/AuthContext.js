'use client';

import {
  createContext,
  useContext,
  useMemo,
} from 'react';

import {
  signIn,
  signOut,
  useSession,
} from 'next-auth/react';

const AuthContext = createContext(null);

export function AuthProvider({
  children,
}) {
  const {
    data: session,
    status,
    update,
  } = useSession();

  const value = useMemo(
    () => ({
      session,

      user: session?.user || null,

      accessToken:
        session?.accessToken || null,

      authenticated:
        status === 'authenticated',

      loading: status === 'loading',

      login: () => signIn('spotify'),

      logout: () =>
        signOut({
          callbackUrl: '/login',
        }),

      refreshSession: update,
    }),
    [session, status, update]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
