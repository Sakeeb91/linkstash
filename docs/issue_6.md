# Issue #6: Set Up React Router with Protected Routes

### Status: ✅ Completed

### Description

Establish client-side routing with authenticated and public route guards, an application shell, and placeholders for upcoming feature areas.

### Acceptance Criteria

- [x] React Router configured with centralized route map
- [x] Protected routes redirect unauthenticated users to login while preserving the return URL
- [x] Public routes redirect authenticated users to the dashboard
- [x] Authenticated layout with shared navigation and sign-out control
- [x] Route coverage for dashboard, collections, tags, search, favorites, archive, settings, and detail views
- [x] Not Found route for unmatched paths
- [x] Loading state shown while authentication resolves
- [x] Automated tests covering routing and guards

### Implementation Summary

1. **Routing Architecture**
   - Added `AppRoutes` with centralized config (`src/routes/config.tsx`) powering both public and protected paths.
   - Browser routing now maps all protected routes through a shared `AppLayout` shell and falls back to a dedicated not-found page.

2. **Route Guards**
   - Enhanced `ProtectedRoute` to support nested routing, shared loading UI, and login redirection with preserved `from` state.
   - Introduced `PublicRoute` to keep authenticated users out of auth-only pages and route them back to their last destination.

3. **Authenticated Shell**
   - Created `AppLayout` with brand header, navigation links, theme toggle, and sign-out action using `useAuth`.
   - Centralized shared button styles and page scaffolding (`app-shell.css`) for consistent protected-page layouts.

4. **Pages & Placeholders**
   - Added placeholder pages for collections, tags, search, favorites, archive, settings, and detail views (`/collections/:id`, `/tags/:name`).
   - Refreshed dashboard content to fit the new shell and guide users toward upcoming features.
   - Implemented a not-found experience with contextual navigation back to login or dashboard.

5. **Testing**
   - Added guard unit tests for `ProtectedRoute` and `PublicRoute`.
   - Added integration tests for `AppRoutes` to verify redirects, protected rendering, and not-found handling.

### Files Touched

- `src/routes/config.tsx`, `src/routes/AppRoutes.tsx`
- `src/components/layout/ProtectedRoute.tsx`, `src/components/layout/PublicRoute.tsx`, `src/components/layout/AppLayout.tsx`
- `src/pages/Dashboard/DashboardPage.tsx` and new placeholder pages for future features
- `src/styles/app-shell.css`, `src/styles/dashboard.css`, `src/styles/not-found.css`
- Tests: `src/components/layout/*Route.test.tsx`, `src/routes/AppRoutes.test.tsx`

### Notes & Next Steps

- Upcoming feature issues can replace placeholder pages with real data flows.
- Navigation labels and routes are driven by `src/routes/config.tsx` to keep routing, layout, and future sidebars in sync.
