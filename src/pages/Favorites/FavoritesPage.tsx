/**
 * Favorites Page
 *
 * Placeholder for favorites view.
 */

import React from 'react';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function FavoritesPage() {
  return (
    <div className="app-page">
      <PageHeader
        icon="⭐"
        title="Favorites"
        description="Quick access to the links you reach for most often."
      />

      <div className="page-grid">
        <ComingSoonCard
          title="Favorites view roadmap"
          items={[
            'Pin key bookmarks to the top',
            'Sort by recency or popularity',
            'One-click add/remove from favorites',
            'Show favorites in search results',
          ]}
        />
        <div className="page-card">
          <h3>Stay focused</h3>
          <p>
            Favorites keep essential resources at your fingertips so you can get to work without
            digging through collections.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FavoritesPage;
