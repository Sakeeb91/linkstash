/**
 * Page Header Component
 *
 * Provides a consistent heading layout for protected pages.
 */

import React, { type ReactNode } from 'react';

interface PageHeaderProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ icon, title, description, actions }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div className="page-title">
        {icon ? (
          <span className="page-icon" aria-hidden="true">
            {icon}
          </span>
        ) : null}
        <span>{title}</span>
      </div>
      {description ? <p className="page-meta">{description}</p> : null}
      {actions ? <div className="page-actions">{actions}</div> : null}
    </div>
  );
}

export default PageHeader;
