/**
 * Theme Toggle Component
 *
 * A button component for switching between light and dark themes.
 * Supports individual toggle or dropdown with system option.
 */

import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { Theme } from '../../../context/ThemeContext';
import './ThemeToggle.css';

/**
 * Theme Toggle Props
 */
interface ThemeToggleProps {
  /** Display style: 'button' for simple toggle, 'dropdown' for full options */
  variant?: 'button' | 'dropdown';
  /** Size of the toggle */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS class */
  className?: string;
  /** Show label text */
  showLabel?: boolean;
}

/**
 * Sun icon for light mode
 */
function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="theme-icon"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

/**
 * Moon icon for dark mode
 */
function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="theme-icon"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

/**
 * Computer/System icon for system preference
 */
function SystemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="theme-icon"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

/**
 * Theme Toggle Component
 *
 * Provides UI for switching between themes.
 */
export function ThemeToggle({
  variant = 'button',
  size = 'md',
  className = '',
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'theme-toggle--sm',
    md: 'theme-toggle--md',
    lg: 'theme-toggle--lg',
  };

  if (variant === 'dropdown') {
    return (
      <div className={`theme-toggle theme-toggle--dropdown ${sizeClasses[size]} ${className}`}>
        {showLabel && <span className="theme-toggle-label">Theme</span>}
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as Theme)}
          className="theme-toggle-select"
          aria-label="Select theme"
        >
          <option value="light">☀️ Light</option>
          <option value="dark">🌙 Dark</option>
          <option value="system">💻 System</option>
        </select>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`theme-toggle theme-toggle--button ${sizeClasses[size]} ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Currently: ${resolvedTheme} mode. Click to switch.`}
    >
      <span className="theme-toggle-icon theme-toggle-icon--light">
        <SunIcon />
      </span>
      <span className="theme-toggle-icon theme-toggle-icon--dark">
        <MoonIcon />
      </span>
      {showLabel && (
        <span className="theme-toggle-text">{resolvedTheme === 'dark' ? 'Dark' : 'Light'}</span>
      )}
    </button>
  );
}

/**
 * Theme Selector Component
 *
 * A more detailed theme selector with all options visible.
 */
export function ThemeSelector({ className = '' }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    { value: 'light', label: 'Light', icon: <SunIcon /> },
    { value: 'dark', label: 'Dark', icon: <MoonIcon /> },
    { value: 'system', label: 'System', icon: <SystemIcon /> },
  ];

  return (
    <div className={`theme-selector ${className}`} role="radiogroup" aria-label="Theme selection">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={theme === option.value}
          onClick={() => setTheme(option.value)}
          className={`theme-selector-option ${theme === option.value ? 'theme-selector-option--active' : ''}`}
        >
          {option.icon}
          <span>{option.label}</span>
        </button>
      ))}
    </div>
  );
}

export default ThemeToggle;
