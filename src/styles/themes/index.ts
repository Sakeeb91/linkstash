/**
 * Themes Barrel File
 *
 * Re-exports all theme configurations and utilities for convenient imports.
 * Themes define the visual appearance of the application.
 *
 * @example
 * import { themeColors, getThemeColor } from '@/styles/themes';
 */

/**
 * Theme color tokens
 *
 * CSS variable names for theme colors, useful for
 * programmatic access to theme values.
 */
export const themeColors = {
  // Brand Colors
  primary: '--color-primary',
  primaryHover: '--color-primary-hover',
  primaryActive: '--color-primary-active',
  primaryLight: '--color-primary-light',
  primaryDark: '--color-primary-dark',

  // Secondary Colors
  secondary: '--color-secondary',
  secondaryHover: '--color-secondary-hover',
  secondaryLight: '--color-secondary-light',

  // Semantic Colors
  success: '--color-success',
  successLight: '--color-success-light',
  successBg: '--color-success-bg',
  warning: '--color-warning',
  warningLight: '--color-warning-light',
  warningBg: '--color-warning-bg',
  error: '--color-error',
  errorLight: '--color-error-light',
  errorBg: '--color-error-bg',
  info: '--color-info',
  infoLight: '--color-info-light',
  infoBg: '--color-info-bg',

  // Background Colors
  bgPrimary: '--color-bg-primary',
  bgSecondary: '--color-bg-secondary',
  bgTertiary: '--color-bg-tertiary',
  bgElevated: '--color-bg-elevated',
  bgOverlay: '--color-bg-overlay',

  // Text Colors
  textPrimary: '--color-text-primary',
  textSecondary: '--color-text-secondary',
  textTertiary: '--color-text-tertiary',
  textInverse: '--color-text-inverse',
  textLink: '--color-text-link',
  textLinkHover: '--color-text-link-hover',

  // Border Colors
  border: '--color-border',
  borderHover: '--color-border-hover',
  borderFocus: '--color-border-focus',
} as const;

/**
 * Get the computed value of a CSS variable
 *
 * @param variable - The CSS variable name (with or without --)
 * @returns The computed value or empty string if not found
 *
 * @example
 * const primaryColor = getThemeColor('primary'); // Gets --color-primary value
 * const bgColor = getThemeColor('--color-bg-primary'); // Also works with full name
 */
export function getThemeColor(variable: string): string {
  if (typeof window === 'undefined') {
    return '';
  }

  const varName = variable.startsWith('--') ? variable : `--color-${variable}`;
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Set a CSS variable value programmatically
 *
 * @param variable - The CSS variable name (with or without --)
 * @param value - The value to set
 *
 * @example
 * setThemeColor('primary', '#ff0000');
 */
export function setThemeColor(variable: string, value: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const varName = variable.startsWith('--') ? variable : `--color-${variable}`;
  document.documentElement.style.setProperty(varName, value);
}

/**
 * Spacing scale values (in rem)
 */
export const spacing = {
  0: '0',
  px: '1px',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
} as const;

/**
 * Border radius values
 */
export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

/**
 * Breakpoint values (in pixels)
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

/**
 * Check if a media query matches
 *
 * @param breakpoint - The breakpoint to check
 * @returns Whether the viewport matches the breakpoint
 *
 * @example
 * if (matchesBreakpoint('md')) {
 *   // Medium screen or larger
 * }
 */
export function matchesBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(`(min-width: ${breakpoints[breakpoint]}px)`).matches;
}
