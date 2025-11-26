/**
 * Dashboard Page
 *
 * Main authenticated page showing user's bookmarks and navigation.
 * This is a placeholder that will be expanded in future issues.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ComingSoonCard, PageHeader } from '../../components/common';
import { APP_NAME, ROUTES } from '../../utils/constants';
import '../../styles/dashboard.css';

export function DashboardPage() {
  const { user } = useAuth();
  const greeting = user?.preferredUsername || user?.email || 'there';

  return (
    <div className="app-page dashboard-page">
      <PageHeader
        icon="🚀"
        title="Dashboard"
        description={`Welcome back, ${greeting}. Start building your personal knowledge base with ${APP_NAME}.`}
        actions={
          <div className="dashboard-actions">
            <Link className="primary-button" to={ROUTES.COLLECTIONS}>
              Build a collection
            </Link>
            <Link className="ghost-button" to={ROUTES.SEARCH}>
              Explore search
            </Link>
          </div>
        }
      />

      <div className="page-grid">
        <div className="page-card dashboard-hero">
          <div className="dashboard-hero__badge">Early access</div>
          <h2>Save, organize, discover.</h2>
          <p>
            LinkStash keeps your bookmarks organized with collections, tags, and powerful search.
            We&apos;re shipping core link management features next.
          </p>
          <div className="dashboard-hero__meta">
            <div>
              <div className="meta-label">Account</div>
              <div className="meta-value">{user?.email}</div>
            </div>
            <div>
              <div className="meta-label">Status</div>
              <div className="meta-value">Authenticated</div>
            </div>
            <div>
              <div className="meta-label">Theme</div>
              <div className="meta-value">Toggle in header</div>
            </div>
          </div>
        </div>

        <ComingSoonCard
          title="Core link management"
          items={[
            'Add links with automatic metadata extraction',
            'Organize with tags and collections',
            'Search and filter across all links',
            'Favorite and archive for quick triage',
          ]}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
