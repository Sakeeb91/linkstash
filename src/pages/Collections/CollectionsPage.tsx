/**
 * Collections Page
 *
 * Placeholder for upcoming collections functionality.
 */

import React from 'react';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function CollectionsPage() {
  return (
    <div className="app-page">
      <PageHeader
        icon="📁"
        title="Collections"
        description="Group related links and keep your workspace organized. Collections help you focus on one topic at a time."
      />

      <div className="page-grid">
        <div className="page-card">
          <h3>How collections will work</h3>
          <p>
            Collections will let you group bookmarks by project, client, or topic. You&apos;ll be
            able to drag links between collections and pin the most important ones.
          </p>
        </div>

        <ComingSoonCard
          title="Upcoming collection features"
          description="We are building the collection experience now."
          items={[
            'Create, rename, and color-code collections',
            'Drag & drop links between collections',
            'Share and collaborate on collections',
            'Pinned links and featured collections',
          ]}
        />
      </div>
    </div>
  );
}

export default CollectionsPage;
