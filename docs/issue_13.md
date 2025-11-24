## Description
Create a LinkList component with infinite scroll/pagination support for displaying bookmarks.

## Acceptance Criteria
- [ ] Display links in a responsive grid/list layout
- [ ] Infinite scroll or "Load More" pagination
- [ ] Empty state when no links exist
- [ ] Loading skeleton while fetching
- [ ] Error state with retry option
- [ ] View toggle (grid/list)

## Implementation Steps

### 1. Install intersection observer hook
```bash
npm install react-intersection-observer
```

### 2. Create LinkList component
Create `src/components/links/LinkList/LinkList.tsx`:
```typescript
import { useEffect, useRef, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import { LinkCard } from "../LinkCard";
import { LinkSkeleton } from "../LinkSkeleton";
import { EmptyState } from "../../common/EmptyState";
import type { Link } from "../../../types/link";
import styles from "./LinkList.module.css";

interface LinkListProps {
  links: Link[];
  isLoading: boolean;
  hasMore: boolean;
  error: Error | null;
  onLoadMore: () => void;
  onFavorite: (id: string) => void;
  onArchive: (id: string) => void;
  onEdit: (link: Link) => void;
  onDelete: (id: string) => void;
  viewMode?: "grid" | "list";
  emptyTitle?: string;
  emptyDescription?: string;
}

export function LinkList({
  links,
  isLoading,
  hasMore,
  error,
  onLoadMore,
  onFavorite,
  onArchive,
  onEdit,
  onDelete,
  viewMode = "grid",
  emptyTitle = "No links yet",
  emptyDescription = "Start by adding your first bookmark",
}: LinkListProps) {
  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
    rootMargin: "100px",
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasMore, isLoading, onLoadMore]);

  if (error) {
    return (
      <div className={styles.error}>
        <p>Failed to load links</p>
        <button onClick={onLoadMore}>Try again</button>
      </div>
    );
  }

  if (!isLoading && links.length === 0) {
    return (
      <EmptyState
        icon="bookmark"
        title={emptyTitle}
        description={emptyDescription}
      />
    );
  }

  return (
    <div className={`${styles.container} ${styles[viewMode]}`}>
      {links.map((link) => (
        <LinkCard
          key={link.id}
          link={link}
          onFavorite={onFavorite}
          onArchive={onArchive}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}

      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <LinkSkeleton key={`skeleton-${i}`} />
        ))}

      {hasMore && !isLoading && (
        <div ref={loadMoreRef} className={styles.loadMore}>
          <span>Loading more...</span>
        </div>
      )}
    </div>
  );
}
```

### 3. Create LinkList styles
Create `src/components/links/LinkList/LinkList.module.css`:
```css
.container {
  width: 100%;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-4);
}

.list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.error {
  text-align: center;
  padding: var(--space-8);
  color: var(--color-error);
}

.error button {
  margin-top: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
}

.loadMore {
  grid-column: 1 / -1;
  text-align: center;
  padding: var(--space-4);
  color: var(--color-text-tertiary);
}
```

### 4. Create LinkSkeleton component
Create `src/components/links/LinkSkeleton/LinkSkeleton.tsx`:
```typescript
import styles from "./LinkSkeleton.module.css";

export function LinkSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.header}>
        <div className={styles.favicon} />
        <div className={styles.titleGroup}>
          <div className={styles.title} />
          <div className={styles.domain} />
        </div>
      </div>
      <div className={styles.description} />
      <div className={styles.tags}>
        <div className={styles.tag} />
        <div className={styles.tag} />
      </div>
    </div>
  );
}
```

### 5. Create skeleton styles
Create `src/components/links/LinkSkeleton/LinkSkeleton.module.css`:
```css
.skeleton {
  background: var(--color-bg-primary);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.header {
  display: flex;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.favicon {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.titleGroup {
  flex: 1;
}

.title {
  height: 20px;
  width: 60%;
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-2);
}

.domain {
  height: 14px;
  width: 40%;
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
}

.description {
  height: 36px;
  width: 100%;
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-3);
}

.tags {
  display: flex;
  gap: var(--space-2);
}

.tag {
  height: 24px;
  width: 60px;
  background: linear-gradient(90deg, var(--color-bg-tertiary) 25%, var(--color-bg-secondary) 50%, var(--color-bg-tertiary) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-full);
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Estimated Effort
4 hours

## Dependencies
- #10 Build LinkCard Component
- #9 Create Link API Service

