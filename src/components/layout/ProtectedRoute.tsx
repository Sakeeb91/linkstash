/**
 * Protected Route Component
 *
 * Wraps routes that require authentication.
 * Redirects unauthenticated users to the login page.
 */

import React, { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/constants";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Loading spinner component
 */
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner" />
      <p className="loading-text">Loading...</p>
    </div>
  );
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

  // Show loading while checking auth state
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    // Save the attempted URL for redirecting after login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

