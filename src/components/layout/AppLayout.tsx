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
import { protectedRoutes, type AppRouteConfig } from '../../routes/config';
import '../../styles/app-shell.css';

export function AppLayout() {
  const { user, handleSignOut } = useAuth();
  const navLinks = protectedRoutes.filter((route): route is AppRouteConfig & { label: string } =>
    Boolean(route.label)
  );

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
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `app-shell__nav-link ${isActive ? 'app-shell__nav-link--active' : ''}`
              }
              end={link.path === ROUTES.DASHBOARD}
            >
              {link.label || link.path}
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
