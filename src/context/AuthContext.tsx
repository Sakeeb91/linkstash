/**
 * Authentication Context
 *
 * Provides global authentication state and operations throughout the app.
 * Uses AWS Amplify Auth for Cognito integration.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import {
  signIn,
  signUp,
  signOut,
  confirmSignUp,
  resendSignUpCode,
  resetPassword,
  confirmResetPassword,
  getCurrentUser,
  fetchUserAttributes,
  type SignInOutput,
  type SignUpOutput,
} from 'aws-amplify/auth';
import type { AuthState, User, SignInInput, SignUpInput } from '../types';

/**
 * Auth action types
 */
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SIGN_OUT' };

/**
 * Auth context value interface
 */
interface AuthContextValue extends AuthState {
  handleSignIn: (input: SignInInput) => Promise<SignInOutput>;
  handleSignUp: (input: SignUpInput) => Promise<SignUpOutput>;
  handleSignOut: () => Promise<void>;
  handleConfirmSignUp: (email: string, code: string) => Promise<void>;
  handleResendCode: (email: string) => Promise<void>;
  handleForgotPassword: (email: string) => Promise<void>;
  handleConfirmResetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  clearError: () => void;
}

/**
 * Initial auth state
 */
const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

/**
 * Auth reducer
 */
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: action.payload !== null,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SIGN_OUT':
      return { ...initialState, isLoading: false };
    default:
      return state;
  }
}

/**
 * Auth Context
 */
const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * Auth Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider Component
 *
 * Wraps the application to provide authentication state and methods.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  /**
   * Check for existing authenticated session on mount
   */
  useEffect(() => {
    checkAuthState();
  }, []);

  /**
   * Check current authentication state
   */
  const checkAuthState = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const currentUser = await getCurrentUser();
      const attributes = await fetchUserAttributes();

      const user: User = {
        id: currentUser.userId,
        email: attributes.email || '',
        preferredUsername: attributes.preferred_username || null,
        emailVerified: attributes.email_verified === 'true',
      };

      dispatch({ type: 'SET_USER', payload: user });
    } catch {
      // No authenticated user
      dispatch({ type: 'SET_USER', payload: null });
    }
  };

  /**
   * Sign in with email and password
   */
  const handleSignIn = useCallback(
    async ({ email, password }: SignInInput): Promise<SignInOutput> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const result = await signIn({
          username: email,
          password,
        });

        if (result.isSignedIn) {
          await checkAuthState();
        }

        return result;
      } catch (error) {
        const message = getErrorMessage(error);
        dispatch({ type: 'SET_ERROR', payload: message });
        throw error;
      }
    },
    []
  );

  /**
   * Sign up new user
   */
  const handleSignUp = useCallback(
    async ({ email, password, preferredUsername }: SignUpInput): Promise<SignUpOutput> => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        const result = await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              preferred_username: preferredUsername || undefined,
            },
          },
        });

        dispatch({ type: 'SET_LOADING', payload: false });
        return result;
      } catch (error) {
        const message = getErrorMessage(error);
        dispatch({ type: 'SET_ERROR', payload: message });
        throw error;
      }
    },
    []
  );

  /**
   * Sign out current user
   */
  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      dispatch({ type: 'SIGN_OUT' });
    } catch (error) {
      const message = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  /**
   * Confirm sign up with verification code
   */
  const handleConfirmSignUp = useCallback(async (email: string, code: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      const message = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  /**
   * Resend verification code
   */
  const handleResendCode = useCallback(async (email: string) => {
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await resendSignUpCode({ username: email });
    } catch (error) {
      const message = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  /**
   * Initiate password reset
   */
  const handleForgotPassword = useCallback(async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      await resetPassword({ username: email });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      const message = getErrorMessage(error);
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  /**
   * Confirm password reset with code
   */
  const handleConfirmResetPassword = useCallback(
    async (email: string, code: string, newPassword: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      try {
        await confirmResetPassword({
          username: email,
          confirmationCode: code,
          newPassword,
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      } catch (error) {
        const message = getErrorMessage(error);
        dispatch({ type: 'SET_ERROR', payload: message });
        throw error;
      }
    },
    []
  );

  /**
   * Clear error state
   */
  const clearError = useCallback(() => {
    dispatch({ type: 'SET_ERROR', payload: null });
  }, []);

  const value: AuthContextValue = {
    ...state,
    handleSignIn,
    handleSignUp,
    handleSignOut,
    handleConfirmSignUp,
    handleResendCode,
    handleForgotPassword,
    handleConfirmResetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}

/**
 * Extract user-friendly error message from auth errors
 */
function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Map Cognito error codes to friendly messages
    const message = error.message;

    if (message.includes('User does not exist')) {
      return 'No account found with this email address.';
    }
    if (message.includes('Incorrect username or password')) {
      return 'Invalid email or password.';
    }
    if (message.includes('User is not confirmed')) {
      return 'Please verify your email address first.';
    }
    if (message.includes('Username/client id combination not found')) {
      return 'No account found with this email address.';
    }
    if (message.includes('Invalid verification code')) {
      return 'Invalid verification code. Please try again.';
    }
    if (message.includes('Password did not conform')) {
      return 'Password must be at least 8 characters with uppercase, lowercase, and numbers.';
    }
    if (message.includes('An account with the given email already exists')) {
      return 'An account with this email already exists.';
    }
    if (message.includes('Attempt limit exceeded')) {
      return 'Too many attempts. Please try again later.';
    }

    return message;
  }

  return 'An unexpected error occurred. Please try again.';
}
