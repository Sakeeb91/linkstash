/**
 * Application Layout
 *
 * Provides the authenticated shell with navigation, theme toggle,
 * and user actions. All protected routes are rendered inside this layout.
 */

import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ThemeToggle } from '../common';
import { useAuth } from '../../hooks/useAuth';
import { APP_NAME, ROUTES } from '../../utils/constants';
import '../../styles/app-shell.css';

const NAV_LINKS = [
  { to: ROUTES.DASHBOARD, label: 'Dashboard' },
  { to: ROUTES.COLLECTIONS, label: 'Collections' },
  { to: ROUTES.TAGS, label: 'Tags' },
  { to: ROUTES.SEARCH, label: 'Search' },
  { to: ROUTES.FAVORITES, label: 'Favorites' },
  { to: ROUTES.ARCHIVE, label: 'Archive' },
];

export function AppLayout() {
  const { user, handleSignOut } = useAuth();

  const handleLogout = async () => {
    try {
      await handleSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <header className="app-shell__header">
        <div className="app-shell__brand">
          <span className="logo-icon">🔗</span>
          <div className="app-shell__brand-text">
            <span className="logo-text">{APP_NAME}</span>
            <span className="brand-badge">Beta</span>
          </div>
        </div>

        <nav className="app-shell__nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `app-shell__nav-link ${isActive ? 'app-shell__nav-link--active' : ''}`
              }
              end={link.to === ROUTES.DASHBOARD}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="app-shell__actions">
          <div className="app-shell__user">
            <span className="user-email" title={user?.email}>
              {user?.email}
            </span>
          </div>
          <ThemeToggle size="sm" />
          <button type="button" className="ghost-button" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </header>

      <main id="main-content" className="app-shell__main">
        <div className="app-shell__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
