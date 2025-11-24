/**
 * Tag Type Definitions
 *
 * Represents labels for organizing and filtering links
 */

/**
 * Core Tag interface
 */
export interface Tag {
  /** Unique identifier */
  id: string;
  /** Tag name (unique per user) */
  name: string;
  /** Optional hex color code */
  color?: string | null;
  /** When the tag was created */
  createdAt: string;
  /** When the tag was last updated */
  updatedAt: string;
  /** Owner user ID (Cognito) */
  owner?: string | null;
}

/**
 * Input for creating a new tag
 */
export interface CreateTagInput {
  name: string;
  color?: string | null;
}

/**
 * Input for updating an existing tag
 */
export interface UpdateTagInput {
  id: string;
  name?: string;
  color?: string | null;
}

/**
 * Tag with computed link count
 */
export interface TagWithCount extends Tag {
  linkCount: number;
}

/**
 * Default tag colors for suggestions
 */
export const TAG_COLORS = [
  "#DC2626", // Red
  "#EA580C", // Orange
  "#CA8A04", // Amber
  "#16A34A", // Green
  "#0891B2", // Cyan
  "#2563EB", // Blue
  "#7C3AED", // Violet
  "#DB2777", // Pink
  "#57534E", // Stone
] as const;

/**
 * Tag autocomplete suggestion
 */
export interface TagSuggestion {
  tag: Tag;
  relevanceScore: number;
}

