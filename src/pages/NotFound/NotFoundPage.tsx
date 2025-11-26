/**
 * Not Found Page
 *
 * Displayed when a user navigates to an unknown route.
 */

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PageHeader } from '../../components/common';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES } from '../../utils/constants';
import '../../styles/not-found.css';

export function NotFoundPage() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const fallbackRoute = isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN;

  return (
    <div className="app-page not-found">
      <PageHeader
        icon="🧭"
        title="Page not found"
        description={`We couldn't find "${location.pathname}". Double-check the URL or head back to a safe place.`}
      />

      <div className="not-found__card page-card">
        <p>Try one of these destinations:</p>
        <div className="not-found__actions">
          <Link className="primary-button" to={fallbackRoute}>
            Go to {isAuthenticated ? 'dashboard' : 'login'}
          </Link>
          <Link className="ghost-button" to={ROUTES.HOME}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
