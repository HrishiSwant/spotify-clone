'use client';

import {
  createContext,
  useContext,
  useMemo,
} from 'react';

import {
  useSession,
  signIn,
  signOut,
} from 'next-auth/react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
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

      login() {
        return signIn('spotify');
      },

      logout() {
        return signOut({
          callbackUrl: '/login',
        });
      },

      refresh() {
        return update();
      },
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
