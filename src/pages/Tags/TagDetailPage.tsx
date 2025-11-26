/**
 * Tag Detail Page
 *
 * Placeholder for tag-specific view.
 */

import React from 'react';
import { useParams } from 'react-router-dom';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function TagDetailPage() {
  const { name } = useParams<{ name: string }>();

  return (
    <div className="app-page">
      <PageHeader
        icon="🏷️"
        title={`Tag: ${name ?? ''}`}
        description="Tag insights and filtered link views are on the way."
      />

      <ComingSoonCard
        title="Planned tag insights"
        items={[
          'Links filtered by this tag',
          'Tag popularity and usage over time',
          'Related tags suggestions',
          'Bulk edit actions for tagged links',
        ]}
      />
    </div>
  );
}

export default TagDetailPage;
