/**
 * Application Constants
 *
 * Central location for app-wide constants and configuration values.
 */

/**
 * Application metadata
 */
export const APP_NAME = 'LinkStash';
export const APP_VERSION = '0.1.0';
export const APP_DESCRIPTION = 'A modern, serverless link bookmarking application';

/**
 * API and data limits
 */
export const MAX_LINKS_PER_PAGE = 20;
export const MAX_COLLECTIONS = 100;
export const MAX_TAGS_PER_LINK = 10;
export const MAX_TITLE_LENGTH = 200;
export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_NOTES_LENGTH = 2000;
export const MAX_TAG_LENGTH = 50;
export const MAX_COLLECTION_NAME_LENGTH = 100;

/**
 * Validation patterns
 */
export const URL_PATTERN =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)$/;

export const COLOR_HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;

/**
 * Debounce timings (in milliseconds)
 */
export const SEARCH_DEBOUNCE_MS = 300;
export const AUTOSAVE_DEBOUNCE_MS = 1000;
export const METADATA_FETCH_DEBOUNCE_MS = 500;

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
  THEME: 'linkstash_theme',
  PREFERENCES: 'linkstash_preferences',
  RECENT_SEARCHES: 'linkstash_recent_searches',
  LAST_COLLECTION: 'linkstash_last_collection',
} as const;

/**
 * Route paths
 */
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  COLLECTIONS: '/collections',
  COLLECTION: '/collections/:id',
  TAGS: '/tags',
  TAG: '/tags/:name',
  SEARCH: '/search',
  FAVORITES: '/favorites',
  ARCHIVE: '/archive',
  SETTINGS: '/settings',
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  CONFIRM_SIGNUP: '/confirm-signup',
} as const;

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You must be logged in to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  INVALID_URL: 'Please enter a valid URL.',
  TITLE_REQUIRED: 'Title is required.',
  TITLE_TOO_LONG: `Title must be ${MAX_TITLE_LENGTH} characters or less.`,
  DESCRIPTION_TOO_LONG: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less.`,
  NOTES_TOO_LONG: `Notes must be ${MAX_NOTES_LENGTH} characters or less.`,
  TOO_MANY_TAGS: `Maximum ${MAX_TAGS_PER_LINK} tags allowed.`,
  DUPLICATE_LINK: 'This link already exists in your collection.',
} as const;

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
  LINK_CREATED: 'Link saved successfully!',
  LINK_UPDATED: 'Link updated successfully!',
  LINK_DELETED: 'Link deleted.',
  LINK_ARCHIVED: 'Link archived.',
  LINK_RESTORED: 'Link restored.',
  LINK_FAVORITED: 'Added to favorites.',
  LINK_UNFAVORITED: 'Removed from favorites.',
  COLLECTION_CREATED: 'Collection created!',
  COLLECTION_UPDATED: 'Collection updated!',
  COLLECTION_DELETED: 'Collection deleted.',
  TAG_CREATED: 'Tag created!',
  TAG_DELETED: 'Tag deleted.',
  SETTINGS_SAVED: 'Settings saved!',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard!',
  EXPORT_SUCCESS: 'Export completed!',
  IMPORT_SUCCESS: 'Import completed!',
} as const;
