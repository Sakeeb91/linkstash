/**
 * Settings Page
 *
 * Placeholder for user preferences and account settings.
 */

import React from 'react';
import { ComingSoonCard, PageHeader } from '../../components/common';

export function SettingsPage() {
  return (
    <div className="app-page">
      <PageHeader
        icon="⚙️"
        title="Settings"
        description="Customize LinkStash to match how you work. Account preferences, notifications, and more coming soon."
      />

      <div className="page-grid">
        <div className="page-card">
          <h3>Control your experience</h3>
          <p>
            Settings will let you fine-tune themes, notifications, default views, and integrations
            without leaving the app.
          </p>
        </div>

        <ComingSoonCard
          title="Planned settings"
          items={[
            'Profile and identity settings',
            'Theme selection and preview',
            'Notification preferences',
            'Data export and import tools',
          ]}
        />
      </div>
    </div>
  );
}

export default SettingsPage;
