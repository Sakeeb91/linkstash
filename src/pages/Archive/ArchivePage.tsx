/**
 * Archive Page
 *
 * Placeholder for archive view.
 */

import React from 'react';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function ArchivePage() {
  return (
    <div className="app-page">
      <PageHeader
        icon="🗂️"
        title="Archive"
        description="Tuck away links you no longer need every day without losing them."
      />

      <div className="page-grid">
        <div className="page-card">
          <h3>Keep it tidy</h3>
          <p>
            Archive older bookmarks to declutter your active views while keeping them searchable and
            recoverable.
          </p>
        </div>

        <ComingSoonCard
          title="Archive roadmap"
          items={[
            'Bulk archive and restore actions',
            'Archived filter in search results',
            'Auto-archive stale links',
            'Audit trail for archive events',
          ]}
        />
      </div>
    </div>
  );
}

export default ArchivePage;
