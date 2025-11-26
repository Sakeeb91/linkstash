/**
 * Tags Page
 *
 * Placeholder for upcoming tagging experience.
 */

import React from 'react';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function TagsPage() {
  return (
    <div className="app-page">
      <PageHeader
        icon="🏷️"
        title="Tags"
        description="Label links with tags to build flexible organization and faster discovery."
      />

      <div className="page-grid">
        <div className="page-card">
          <h3>How tags will help</h3>
          <p>
            Tags make it easy to slice your bookmarks by topic, technology, or status without
            duplicating links across collections.
          </p>
        </div>

        <ComingSoonCard
          title="Tag roadmap"
          items={[
            'Autosuggest and autocomplete when adding tags',
            'Tag colors and popularity indicators',
            'Tag cloud visualization for quick overview',
            'Filter by multiple tags with AND/OR logic',
          ]}
        />
      </div>
    </div>
  );
}

export default TagsPage;
