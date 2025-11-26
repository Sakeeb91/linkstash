/**
 * Common Components Barrel File
 *
 * Re-exports all common/shared components for convenient imports.
 * Common components are reusable UI elements used throughout the application.
 *
 * @example
 * import { Button, Input, Modal, ThemeToggle } from '@/components/common';
 */

// Theme Toggle Component
export { ThemeToggle, ThemeSelector } from './ThemeToggle';

// Loading State Component
export { LoadingState } from './LoadingState/LoadingState';

// Page header for consistent titles
export { PageHeader } from './PageHeader/PageHeader';

// Coming soon placeholder card
export { ComingSoonCard } from './ComingSoonCard/ComingSoonCard';
