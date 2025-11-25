/**
 * Authentication Hook
 *
 * Provides convenient access to authentication state and operations.
 * Wraps the AuthContext with additional utility functions.
 */

import { useAuthContext } from '../context/AuthContext';

/**
 * Hook for accessing authentication functionality
 *
 * @example
 * const { user, isAuthenticated, handleSignIn, handleSignOut } = useAuth();
 */
export function useAuth() {
  return useAuthContext();
}

export default useAuth;
