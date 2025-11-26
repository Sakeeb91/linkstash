/**
 * Protected Route Component
 *
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to the login page.
 */

import React, { type ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoadingState } from '../common';
import { ROUTES } from '../../utils/constants';

interface ProtectedRouteProps {
  children?: ReactNode;
}

/**
 * Protected Route Component
 *
 * Checks authentication state and either renders children
 * or redirects to login page.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const content = children ?? <Outlet />;

  // Show loading while checking auth state
  if (isLoading) {
    return <LoadingState fullScreen message="Checking your session..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{content}</>;
}

export default ProtectedRoute;
