/**
 * Theme Hook
 *
 * Provides convenient access to theme state and operations.
 * Wraps the ThemeContext with additional utility functions.
 */

import { useThemeContext } from '../context/ThemeContext';

/**
 * Hook for accessing theme functionality
 *
 * @example
 * const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
 *
 * // Check current theme
 * if (resolvedTheme === 'dark') {
 *   // Dark mode specific logic
 * }
 *
 * // Toggle theme
 * <button onClick={toggleTheme}>Toggle Theme</button>
 *
 * // Set specific theme
 * <select onChange={(e) => setTheme(e.target.value)}>
 *   <option value="light">Light</option>
 *   <option value="dark">Dark</option>
 *   <option value="system">System</option>
 * </select>
 */
export function useTheme() {
  return useThemeContext();
}

export default useTheme;
