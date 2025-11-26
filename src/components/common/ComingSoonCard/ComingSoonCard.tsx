/**
 * Coming Soon Card
 *
 * Reusable placeholder card for upcoming features.
 */

import React from 'react';

interface ComingSoonCardProps {
  title: string;
  description?: string;
  items: string[];
  eyebrow?: string;
}

export function ComingSoonCard({
  title,
  description,
  items,
  eyebrow = 'Coming soon',
}: ComingSoonCardProps) {
  return (
    <div className="page-card coming-soon">
      <div className="coming-soon__label">{eyebrow}</div>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      <div className="coming-soon__list" role="list">
        {items.map((item) => (
          <div role="listitem" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ComingSoonCard;
