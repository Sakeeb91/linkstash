## Description
Phase 5 polishes the application with final features, optimizations, and testing.

## Tasks in This Phase

### 5.1 Implement Dark Mode Toggle (3h)
- Theme toggle in header/settings
- System preference detection
- Persist preference in localStorage
- Smooth transition animation

### 5.2 Add Toast Notifications (2h)
- Success/error/info toast types
- Auto-dismiss with timer
- Action buttons in toasts
- Stack multiple toasts

### 5.3 Create Settings Page (3h)
- Account settings
- Display preferences
- Notification settings
- Data export options
- Danger zone (delete account)

### 5.4 Implement Export Functionality (3h)
- Export to JSON
- Export to CSV
- Export to HTML (bookmark file)
- Include/exclude options

### 5.5 Add Import from Browser (4h)
- Parse browser bookmark HTML
- Preview import data
- Merge vs replace options
- Progress indicator

### 5.6 Performance Optimization (3h)
- React.memo for components
- useMemo/useCallback optimization
- Image lazy loading
- Bundle analysis and splitting

### 5.7 Write E2E Tests (4h)
- Cypress setup
- Auth flow tests
- CRUD operations tests
- Search functionality tests

### 5.8 Documentation & README Updates (2h)
- API documentation
- Component storybook (optional)
- Deployment guide
- Contributing guidelines

## Key Code Snippets

### Toast System
```typescript
// ToastContext.tsx
interface Toast {
  id: string;
  type: "success" | "error" | "info";
  message: string;
  action?: { label: string; onClick: () => void };
}

const toast = {
  success: (message: string) => addToast({ type: "success", message }),
  error: (message: string) => addToast({ type: "error", message }),
  info: (message: string) => addToast({ type: "info", message }),
};

// Usage
toast.success("Link saved successfully!");
```

### Export Functions
```typescript
export function exportToJSON(links: Link[]) {
  const data = JSON.stringify(links, null, 2);
  downloadFile(data, "linkstash-export.json", "application/json");
}

export function exportToCSV(links: Link[]) {
  const headers = ["Title", "URL", "Description", "Tags", "Created"];
  const rows = links.map(l => [
    l.title, l.url, l.description || "", 
    l.tags?.join(";") || "", l.createdAt
  ]);
  const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
  downloadFile(csv, "linkstash-export.csv", "text/csv");
}

export function exportToHTML(links: Link[]) {
  const bookmarks = links.map(l => 
    `<DT><A HREF="${l.url}">${l.title}</A>`
  ).join("\n");
  const html = `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
${bookmarks}
</DL>`;
  downloadFile(html, "linkstash-bookmarks.html", "text/html");
}
```

### Browser Import Parser
```typescript
export function parseBookmarkHTML(html: string): ImportedLink[] {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const anchors = doc.querySelectorAll("a");
  
  return Array.from(anchors).map(a => ({
    url: a.href,
    title: a.textContent || a.href,
    createdAt: a.getAttribute("add_date") 
      ? new Date(parseInt(a.getAttribute("add_date")!) * 1000).toISOString()
      : new Date().toISOString(),
  }));
}
```

## Estimated Total Effort
24 hours

## Dependencies
- Phase 1-4 complete

