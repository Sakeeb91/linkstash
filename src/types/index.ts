/**
 * Type Definitions Barrel File
 *
 * Re-exports all type definitions from the types directory
 * for convenient imports throughout the application.
 *
 * @example
 * import { Link, Collection, Tag, User } from '@/types';
 */

// Link types
export type {
  Link,
  CreateLinkInput,
  UpdateLinkInput,
  LinkMetadata,
  LinkFilters,
  LinkSortField,
  SortOrder,
  LinkSortOptions,
} from './link';

// Collection types
export type {
  Collection,
  CreateCollectionInput,
  UpdateCollectionInput,
  CollectionWithCount,
} from './collection';
export { COLLECTION_COLORS, COLLECTION_ICONS } from './collection';

// Tag types
export type { Tag, CreateTagInput, UpdateTagInput, TagWithCount, TagSuggestion } from './tag';
export { TAG_COLORS } from './tag';

// User types
export type {
  User,
  UserPreferences,
  ThemePreference,
  ViewMode,
  AuthState,
  SignUpInput,
  SignInInput,
} from './user';
export { DEFAULT_USER_PREFERENCES } from './user';
