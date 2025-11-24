## Description
Phase 4 implements search and discovery features for finding bookmarks quickly.

## Tasks in This Phase

### 4.1 Implement Search Bar with Debouncing (2h)
- Global search input in header
- 300ms debounce
- Search across title, description, URL, tags
- Command+K keyboard shortcut

### 4.2 Build Advanced Filter Panel (3h)
- Filter by date range
- Filter by collection
- Filter by tags (multi-select)
- Save filter presets

### 4.3 Create Search Results Page (3h)
- Highlighted search matches
- Sort by relevance/date
- Group by collection
- Empty state for no results

### 4.4 Add Keyboard Shortcuts (3h)
- Command+K: Open search
- N: New link
- /: Focus search
- J/K: Navigate links
- F: Toggle favorite
- E: Edit selected
- Delete: Delete selected

### 4.5 Implement Recent & Favorites Views (2h)
- Recently added links
- Recently clicked links
- Quick access favorites
- Dashboard widgets

## Key Code Snippets

### Search with Debounce
```typescript
import { useDebouncedCallback } from "use-debounce";

const debouncedSearch = useDebouncedCallback((query: string) => {
  searchLinks(query);
}, 300);

<SearchBar onChange={(e) => debouncedSearch(e.target.value)} />
```

### Keyboard Shortcuts Hook
```typescript
import { useHotkeys } from "react-hotkeys-hook";

useHotkeys("mod+k", () => setSearchOpen(true), { preventDefault: true });
useHotkeys("n", () => setAddModalOpen(true), { enabled: !isInputFocused });
useHotkeys("j", () => selectNextLink(), { enabled: !isInputFocused });
useHotkeys("k", () => selectPrevLink(), { enabled: !isInputFocused });
```

### Search Implementation
```typescript
// Simple client-side search (for small datasets)
const searchLinks = (query: string) => {
  const q = query.toLowerCase();
  return links.filter(link =>
    link.title.toLowerCase().includes(q) ||
    link.description?.toLowerCase().includes(q) ||
    link.url.toLowerCase().includes(q) ||
    link.tags?.some(tag => tag.toLowerCase().includes(q))
  );
};

// For larger datasets, use AppSync search or OpenSearch
```

## Estimated Total Effort
13 hours

## Dependencies
- Phase 2 complete (Link management)
- Phase 3 complete (Collections & Tags)

