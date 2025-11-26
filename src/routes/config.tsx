import React, { type ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import { AuthPage } from '../pages/Auth';
import { DashboardPage } from '../pages/Dashboard';
import { CollectionsPage } from '../pages/Collections';
import { TagsPage } from '../pages/Tags';
import { SearchPage } from '../pages/Search';
import { FavoritesPage } from '../pages/Favorites';
import { ArchivePage } from '../pages/Archive';
import { SettingsPage } from '../pages/Settings';

export interface AppRouteConfig {
  path: string;
  element: ReactElement;
  label?: string;
}

export const protectedRoutes: AppRouteConfig[] = [
  { path: ROUTES.DASHBOARD, element: <DashboardPage />, label: 'Dashboard' },
  { path: ROUTES.COLLECTIONS, element: <CollectionsPage />, label: 'Collections' },
  { path: ROUTES.TAGS, element: <TagsPage />, label: 'Tags' },
  { path: ROUTES.SEARCH, element: <SearchPage />, label: 'Search' },
  { path: ROUTES.FAVORITES, element: <FavoritesPage />, label: 'Favorites' },
  { path: ROUTES.ARCHIVE, element: <ArchivePage />, label: 'Archive' },
  { path: ROUTES.SETTINGS, element: <SettingsPage />, label: 'Settings' },
  { path: ROUTES.HOME, element: <Navigate to={ROUTES.DASHBOARD} replace /> },
];

export const publicRoutes: AppRouteConfig[] = [
  { path: ROUTES.LOGIN, element: <AuthPage /> },
  { path: ROUTES.SIGNUP, element: <AuthPage /> },
  { path: ROUTES.FORGOT_PASSWORD, element: <AuthPage /> },
  { path: ROUTES.CONFIRM_SIGNUP, element: <AuthPage /> },
];
