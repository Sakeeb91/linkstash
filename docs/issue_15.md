## Description
Add favorite and archive toggle actions with visual feedback and filtering support.

## Acceptance Criteria
- [ ] Toggle favorite status with heart icon animation
- [ ] Toggle archive status 
- [ ] Filter view for favorites only
- [ ] Filter view for archived items
- [ ] Visual feedback on action

## Implementation Steps

### 1. Update useLinks hook with filters
```typescript
// In useLinks.ts, add filter parameters
interface UseLinksOptions {
  isArchived?: boolean;
  isFavorite?: boolean;
  collectionId?: string;
}

// Usage:
const { links: favoriteLinks } = useLinks({ isFavorite: true });
const { links: archivedLinks } = useLinks({ isArchived: true });
```

### 2. Create filter tabs component
Create `src/components/links/LinkFilters/LinkFilters.tsx`:
```typescript
import { Bookmark, Heart, Archive, Grid, List } from "lucide-react";
import styles from "./LinkFilters.module.css";

type FilterType = "all" | "favorites" | "archived";
type ViewMode = "grid" | "list";

interface LinkFiltersProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  counts: {
    all: number;
    favorites: number;
    archived: number;
  };
}

export function LinkFilters({
  activeFilter,
  onFilterChange,
  viewMode,
  onViewModeChange,
  counts,
}: LinkFiltersProps) {
  const filters: Array<{ key: FilterType; label: string; icon: typeof Bookmark; count: number }> = [
    { key: "all", label: "All Links", icon: Bookmark, count: counts.all },
    { key: "favorites", label: "Favorites", icon: Heart, count: counts.favorites },
    { key: "archived", label: "Archived", icon: Archive, count: counts.archived },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        {filters.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            className={`${styles.filterBtn} ${activeFilter === key ? styles.active : ""}`}
            onClick={() => onFilterChange(key)}
          >
            <Icon size={16} />
            {label}
            <span className={styles.count}>{count}</span>
          </button>
        ))}
      </div>

      <div className={styles.viewToggle}>
        <button
          className={viewMode === "grid" ? styles.active : ""}
          onClick={() => onViewModeChange("grid")}
          aria-label="Grid view"
        >
          <Grid size={18} />
        </button>
        <button
          className={viewMode === "list" ? styles.active : ""}
          onClick={() => onViewModeChange("list")}
          aria-label="List view"
        >
          <List size={18} />
        </button>
      </div>
    </div>
  );
}
```

### 3. Create LinkFilters styles
Create `src/components/links/LinkFilters/LinkFilters.module.css`:
```css
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border);
}

.filters {
  display: flex;
  gap: var(--space-2);
}

.filterBtn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background: none;
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.filterBtn:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.filterBtn.active {
  background: var(--color-primary);
  color: white;
}

.count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0 var(--space-2);
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
}

.filterBtn:not(.active) .count {
  background: var(--color-bg-tertiary);
}

.viewToggle {
  display: flex;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.viewToggle button {
  padding: var(--space-2);
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.viewToggle button:hover {
  color: var(--color-text-primary);
}

.viewToggle button.active {
  background: var(--color-bg-tertiary);
  color: var(--color-primary);
}
```

### 4. Add favorite animation
Update `LinkCard.module.css`:
```css
.actionBtn.active svg {
  animation: heartPop 0.3s ease;
}

@keyframes heartPop {
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
}
```

### 5. Usage in Dashboard
```typescript
const [filter, setFilter] = useState<"all" | "favorites" | "archived">("all");
const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

const { links, toggleFavorite, toggleArchive } = useLinks({
  isFavorite: filter === "favorites" ? true : undefined,
  isArchived: filter === "archived" ? true : false,
});

// Count links for each filter
const counts = {
  all: allLinks.length,
  favorites: allLinks.filter(l => l.isFavorite).length,
  archived: archivedLinks.length,
};

<LinkFilters
  activeFilter={filter}
  onFilterChange={setFilter}
  viewMode={viewMode}
  onViewModeChange={setViewMode}
  counts={counts}
/>

<LinkList
  links={links}
  viewMode={viewMode}
  onFavorite={toggleFavorite}
  onArchive={toggleArchive}
  // ...
/>
```

## Estimated Effort
2 hours

## Dependencies
- #10 Build LinkCard Component
- #13 Build Link List

