'use client';

import * as React from 'react';

export type Theme = 'dark' | 'light';

export interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: 'dark',
  setTheme: () => {},
  toggleTheme: () => {},
});

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}

export interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
}: ThemeProviderProps): React.JSX.Element {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);

  React.useEffect(() => {
    try {
      const storedTheme = window.localStorage.getItem('rhl-theme') as Theme | null;
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setThemeState(storedTheme);
        applyTheme(storedTheme);
      } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const initialTheme: Theme = prefersDark ? 'dark' : 'light';
        setThemeState(initialTheme);
        applyTheme(initialTheme);
      }
    } catch {
      applyTheme(defaultTheme);
    }
  }, [defaultTheme]);

  function applyTheme(targetTheme: Theme): void {
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }

  const setTheme = React.useCallback((newTheme: Theme): void => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    try {
      window.localStorage.setItem('rhl-theme', newTheme);
    } catch {
      // Storage unavailable or blocked
    }
  }, []);

  const toggleTheme = React.useCallback((): void => {
    setThemeState((prevTheme) => {
      const nextTheme: Theme = prevTheme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try {
        window.localStorage.setItem('rhl-theme', nextTheme);
      } catch {
        // Storage unavailable
      }
      return nextTheme;
    });
  }, []);

  const contextValue = React.useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
