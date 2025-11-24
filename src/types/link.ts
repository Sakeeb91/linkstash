/**
 * Link Type Definitions
 *
 * Represents a saved bookmark/link with metadata and organization
 */

/**
 * Core Link interface representing a saved bookmark
 */
export interface Link {
  /** Unique identifier */
  id: string;
  /** The URL of the bookmark */
  url: string;
  /** Display title */
  title: string;
  /** Optional description from meta tags or user-provided */
  description?: string | null;
  /** Favicon URL */
  favicon?: string | null;
  /** Open Graph image URL */
  image?: string | null;
  /** Tags for organization */
  tags?: string[] | null;
  /** Collection this link belongs to */
  collectionId?: string | null;
  /** Personal notes */
  notes?: string | null;
  /** Whether the link is archived */
  isArchived: boolean;
  /** Whether the link is marked as favorite */
  isFavorite: boolean;
  /** Number of times the link was clicked */
  clickCount: number;
  /** When the link was last clicked */
  lastClickedAt?: string | null;
  /** When the link was created */
  createdAt: string;
  /** When the link was last updated */
  updatedAt: string;
  /** Owner user ID (Cognito) */
  owner?: string | null;
}

/**
 * Input for creating a new link
 */
export interface CreateLinkInput {
  url: string;
  title: string;
  description?: string | null;
  favicon?: string | null;
  image?: string | null;
  tags?: string[] | null;
  collectionId?: string | null;
  notes?: string | null;
}

/**
 * Input for updating an existing link
 */
export interface UpdateLinkInput {
  id: string;
  url?: string;
  title?: string;
  description?: string | null;
  favicon?: string | null;
  image?: string | null;
  tags?: string[] | null;
  collectionId?: string | null;
  notes?: string | null;
  isArchived?: boolean;
  isFavorite?: boolean;
}

/**
 * Metadata extracted from a URL
 */
export interface LinkMetadata {
  title: string | null;
  description: string | null;
  favicon: string | null;
  image: string | null;
}

/**
 * Filter options for querying links
 */
export interface LinkFilters {
  tags?: string[];
  collectionId?: string | null;
  isArchived?: boolean;
  isFavorite?: boolean;
  searchQuery?: string;
}

/**
 * Sort options for links
 */
export type LinkSortField =
  | "createdAt"
  | "updatedAt"
  | "title"
  | "clickCount"
  | "lastClickedAt";

export type SortOrder = "asc" | "desc";

export interface LinkSortOptions {
  field: LinkSortField;
  order: SortOrder;
}

