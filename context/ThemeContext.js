'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved =
      localStorage.getItem('spotify-theme');

    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme =
      theme;

    localStorage.setItem(
      'spotify-theme',
      theme
    );
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) =>
      prev === 'dark' ? 'light' : 'dark'
    );
  }

  const value = useMemo(
    () => ({
      theme,
      dark: theme === 'dark',
      light: theme === 'light',
      setTheme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
