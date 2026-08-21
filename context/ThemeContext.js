'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const saved = localStorage.getItem('spotify-theme');

    if (saved) {
      setTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('spotify-theme', theme);

    document.documentElement.setAttribute(
      'data-theme',
      theme
    );
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === 'dark' ? 'light' : 'dark'
    );
  };

  const value = useMemo(
    () => ({
      theme,
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
