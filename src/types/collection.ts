/**
 * Collection Type Definitions
 *
 * Represents a group of related links
 */

/**
 * Core Collection interface
 */
export interface Collection {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Optional description */
  description?: string | null;
  /** Hex color code for display */
  color?: string | null;
  /** Icon identifier (emoji or icon name) */
  icon?: string | null;
  /** When the collection was created */
  createdAt: string;
  /** When the collection was last updated */
  updatedAt: string;
  /** Owner user ID (Cognito) */
  owner?: string | null;
}

/**
 * Input for creating a new collection
 */
export interface CreateCollectionInput {
  name: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
}

/**
 * Input for updating an existing collection
 */
export interface UpdateCollectionInput {
  id: string;
  name?: string;
  description?: string | null;
  color?: string | null;
  icon?: string | null;
}

/**
 * Collection with computed link count
 */
export interface CollectionWithCount extends Collection {
  linkCount: number;
}

/**
 * Default collection colors
 */
export const COLLECTION_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#EAB308', // Yellow
  '#22C55E', // Green
  '#14B8A6', // Teal
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#6B7280', // Gray
] as const;

/**
 * Default collection icons (emojis)
 */
export const COLLECTION_ICONS = [
  '📁',
  '📂',
  '🗂️',
  '📚',
  '📖',
  '🔖',
  '💼',
  '🎯',
  '⭐',
  '❤️',
  '🏠',
  '💡',
  '🔧',
  '🎨',
  '🎵',
  '🎬',
  '📷',
  '🌐',
  '💻',
  '📱',
] as const;
