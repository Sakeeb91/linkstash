/**
 * Public Route Component
 *
 * Restricts authenticated users from accessing auth-only routes
 * like login or signup. Redirects them back to their previous
 * location or the dashboard.
 */

import React, { type ReactNode } from 'react';
import { Navigate, Outlet, useLocation, type Location } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingState } from '../common';
import { ROUTES } from '../../utils/constants';

interface PublicRouteProps {
  children?: ReactNode;
}

interface LocationState {
  from?: Location;
}

export function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const content = children ?? <Outlet />;
  const from = (location.state as LocationState | undefined)?.from?.pathname;

  if (isLoading) {
    return <LoadingState fullScreen message="Loading experience..." />;
  }

  if (isAuthenticated) {
    return <Navigate to={from || ROUTES.DASHBOARD} replace />;
  }

  return <>{content}</>;
}

export default PublicRoute;
