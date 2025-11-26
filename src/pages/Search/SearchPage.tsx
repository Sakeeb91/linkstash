/**
 * Search Page
 *
 * Placeholder for upcoming search experience.
 */

import React from 'react';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function SearchPage() {
  return (
    <div className="app-page">
      <PageHeader
        icon="🔍"
        title="Search"
        description="Find the right link instantly with full-text search, filters, and keyboard-friendly navigation."
      />

      <div className="page-grid">
        <ComingSoonCard
          title="Search capabilities in progress"
          items={[
            'Instant search with debounced results',
            'Filter by tag, collection, or date',
            'Keyboard shortcuts for quick navigation',
            'Recent searches and saved filters',
          ]}
        />
        <div className="page-card">
          <h3>Designed for focus</h3>
          <p>
            We&apos;re building a fast, keyboard-first search that keeps you in flow while jumping
            between links and collections.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
