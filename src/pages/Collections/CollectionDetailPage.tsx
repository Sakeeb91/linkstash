/**
 * Collection Detail Page
 *
 * Placeholder for individual collection view.
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function CollectionDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="app-page">
      <PageHeader
        icon="📂"
        title={`Collection ${id ?? ''}`}
        description="Detailed collection view will arrive soon with drag-and-drop organization and sharing."
      />

      <ComingSoonCard
        title="Collection view roadmap"
        items={[
          'Link list grouped by section',
          'Collection sharing and permissions',
          'Pinned items and quick filters',
          'Activity history for collaboration',
        ]}
      />
    </div>
  );
}

export default CollectionDetailPage;
