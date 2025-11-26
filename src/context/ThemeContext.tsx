/**
 * Theme Context
 *
 * Provides global theme state and operations throughout the app.
 * Supports light, dark, and system-preference themes.
 */

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { STORAGE_KEYS } from '../utils/constants';

/**
 * Theme preference options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Resolved theme (actual theme applied)
 */
export type ResolvedTheme = 'light' | 'dark';

/**
 * Theme context value interface
 */
interface ThemeContextValue {
  /** Current theme preference */
  theme: Theme;
  /** Resolved theme (light or dark) based on preference and system setting */
  resolvedTheme: ResolvedTheme;
  /** Whether theme is currently being determined */
  isLoading: boolean;
  /** Set theme preference */
  setTheme: (theme: Theme) => void;
  /** Toggle between light and dark */
  toggleTheme: () => void;
}

/**
 * Theme Context
 */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
  /** Child components */
  children: ReactNode;
  /** Default theme (optional, defaults to 'system') */
  defaultTheme?: Theme;
  /** Storage key for persisting theme (optional) */
  storageKey?: string;
}

/**
 * Get system color scheme preference
 */
function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') {
    return 'dark';
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Get initial theme from storage or default
 */
function getInitialTheme(storageKey: string, defaultTheme: Theme): Theme {
  if (typeof window === 'undefined') {
    return defaultTheme;
  }

  try {
    const stored = localStorage.getItem(storageKey);
    if (stored && ['light', 'dark', 'system'].includes(stored)) {
      return stored as Theme;
    }
  } catch {
    // localStorage not available
  }

  return defaultTheme;
}

/**
 * Theme Provider Component
 *
 * Wraps the application to provide theme state and switching functionality.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = STORAGE_KEYS.THEME,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(storageKey, defaultTheme));
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    if (theme === 'system') {
      return getSystemTheme();
    }
    return theme;
  });
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Update resolved theme based on preference
   */
  const updateResolvedTheme = useCallback((currentTheme: Theme) => {
    const resolved = currentTheme === 'system' ? getSystemTheme() : currentTheme;
    setResolvedTheme(resolved);
    document.documentElement.setAttribute('data-theme', resolved);
  }, []);

  /**
   * Set theme preference
   */
  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme);
      updateResolvedTheme(newTheme);

      try {
        localStorage.setItem(storageKey, newTheme);
      } catch {
        // localStorage not available
      }
    },
    [storageKey, updateResolvedTheme]
  );

  /**
   * Toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  /**
   * Initialize theme on mount
   */
  useEffect(() => {
    updateResolvedTheme(theme);
    setIsLoading(false);
  }, [theme, updateResolvedTheme]);

  /**
   * Listen for system theme changes when using 'system' preference
   */
  useEffect(() => {
    if (theme !== 'system') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);
      document.documentElement.setAttribute('data-theme', newResolvedTheme);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    isLoading,
    setTheme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access theme context
 *
 * @throws Error if used outside of ThemeProvider
 */
export function useThemeContext(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeProvider;
