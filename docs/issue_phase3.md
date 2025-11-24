## Description
Phase 3 focuses on organizing links with Collections and Tags for better bookmark management.

## Tasks in This Phase

### 3.1 Define Collections & Tags Models (2h)
- Update GraphQL schema with Collection and Tag models
- Create TypeScript types
- Add API service layer

### 3.2 Build Collections CRUD UI (4h)
- Collection list sidebar
- Create/Edit collection modal
- Collection detail page
- Color picker for collection

### 3.3 Implement Drag-Drop Link Organization (4h)
- Install @dnd-kit/core
- Drag links between collections
- Reorder links within collection
- Visual feedback during drag

### 3.4 Create Tag Input with Autocomplete (3h)
- Tag input component with chips
- Autocomplete from existing tags
- Create new tags inline
- Tag color picker

### 3.5 Build Tag Cloud Visualization (3h)
- Tag cloud component
- Size based on link count
- Click to filter by tag
- Tag management page

### 3.6 Implement Collection Sidebar Navigation (3h)
- Collapsible sidebar
- Collection tree view
- Active state indicators
- Mobile responsive drawer

### 3.7 Add Bulk Actions (4h)
- Multi-select mode
- Bulk move to collection
- Bulk add tags
- Bulk archive/delete

## Key Code Snippets

### Collection Model
```typescript
Collection: a.model({
  name: a.string().required(),
  description: a.string(),
  color: a.string().default("#3b82f6"),
  icon: a.string().default("folder"),
  parentId: a.id(), // For nested collections
  order: a.integer().default(0),
}).authorization(allow => [allow.owner()])
```

### Drag-Drop Setup
```typescript
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

function handleDragEnd(event: DragEndEvent) {
  const { active, over } = event;
  if (over && active.id !== over.id) {
    await moveLink(active.id, over.data.current?.collectionId);
  }
}
```

## Estimated Total Effort
23 hours

## Dependencies
- Phase 1 complete
- Phase 2 complete

