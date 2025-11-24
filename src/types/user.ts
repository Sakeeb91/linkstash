/**
 * User Type Definitions
 *
 * Represents authenticated user data and preferences
 */

/**
 * Core User interface from Cognito
 */
export interface User {
  /** Cognito user ID */
  id: string;
  /** User's email address */
  email: string;
  /** Optional display name */
  preferredUsername?: string | null;
  /** Whether email is verified */
  emailVerified: boolean;
  /** When the user account was created */
  createdAt?: string;
}

/**
 * User preferences/settings
 */
export interface UserPreferences {
  /** UI theme preference */
  theme: ThemePreference;
  /** Default sort field for links */
  defaultSortField: string;
  /** Default sort order */
  defaultSortOrder: "asc" | "desc";
  /** Default view mode */
  defaultViewMode: ViewMode;
  /** Whether to auto-extract metadata */
  autoExtractMetadata: boolean;
  /** Whether to show archived links */
  showArchived: boolean;
}

/**
 * Theme preference options
 */
export type ThemePreference = "light" | "dark" | "system";

/**
 * View mode options
 */
export type ViewMode = "grid" | "list" | "compact";

/**
 * Default user preferences
 */
export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  theme: "system",
  defaultSortField: "createdAt",
  defaultSortOrder: "desc",
  defaultViewMode: "grid",
  autoExtractMetadata: true,
  showArchived: false,
};

/**
 * Authentication state
 */
export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

/**
 * Sign up input
 */
export interface SignUpInput {
  email: string;
  password: string;
  preferredUsername?: string;
}

/**
 * Sign in input
 */
export interface SignInInput {
  email: string;
  password: string;
}

