## Issue #4: Create Design System & Theme

### Description

Establish a cohesive design system with CSS variables, typography, and theme support (light/dark) for the LinkStash application.

### Status: ✅ Completed

### Acceptance Criteria

- [x] CSS variables are defined for colors, spacing, typography
- [x] Light and dark themes are implemented
- [x] Theme switching is functional
- [x] Base component styles are established
- [x] Responsive breakpoints are defined

### Implementation Summary

#### 1. CSS Variables (`src/styles/variables.css`)

Comprehensive design tokens including:

- **Color Palette**: Primary, secondary, semantic colors (success, warning, error, info)
- **Typography**: Font families (Inter, JetBrains Mono), sizes (xs to 5xl), weights, line heights
- **Spacing Scale**: From 0 to 24rem with consistent increments
- **Border Radius**: From none to full (9999px)
- **Box Shadows**: xs to 2xl, plus focus and inner shadows
- **Transitions**: Fast (150ms), base (200ms), slow (300ms)
- **Z-Index Scale**: Base, dropdown, sticky, fixed, modal, popover, tooltip, toast
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Component Variables**: Button/input heights, sidebar width, header height

#### 2. Theme Files

**Dark Theme (`src/styles/themes/dark.css`)**:

- Dark backgrounds (#0f172a, #1e293b, #334155)
- Light text colors (#f8fafc, #cbd5e1, #64748b)
- Enhanced shadows for dark backgrounds
- Glow effects for accents

**Light Theme (`src/styles/themes/light.css`)**:

- Light backgrounds (#ffffff, #f8fafc, #f1f5f9)
- Dark text colors (#0f172a, #475569, #94a3b8)
- Subtle shadows

#### 3. Global Styles (`src/styles/globals.css`)

- CSS reset (box-sizing, margins)
- Document defaults (font smoothing, scroll behavior)
- Typography defaults (headings, paragraphs)
- Link styles with transitions
- Form element normalization
- Focus states with accessible outlines
- Scrollbar styling (webkit and Firefox)
- Selection highlighting
- Utility classes (text alignment, display, flex, gaps)
- Reduced motion support

#### 4. Theme Context (`src/context/ThemeContext.tsx`)

```typescript
type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  isLoading: boolean;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}
```

Features:

- Persists theme preference to localStorage
- Supports system preference detection
- Listens for system theme changes
- Sets `data-theme` attribute on document root

#### 5. useTheme Hook (`src/hooks/useTheme.ts`)

Simple wrapper around ThemeContext for convenient access:

```typescript
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
```

#### 6. Theme Utilities (`src/styles/themes/index.ts`)

- `themeColors`: Object mapping semantic names to CSS variable names
- `getThemeColor(variable)`: Get computed CSS variable value
- `setThemeColor(variable, value)`: Set CSS variable programmatically
- `spacing`: Spacing scale values
- `borderRadius`: Border radius values
- `breakpoints`: Breakpoint pixel values
- `matchesBreakpoint(breakpoint)`: Check viewport against breakpoint

#### 7. ThemeToggle Component (`src/components/common/ThemeToggle/`)

Two variants:

**Button Variant** (default):

- Toggle between light and dark
- Animated sun/moon icons
- Keyboard accessible

**Dropdown Variant**:

- Full options: Light, Dark, System
- Select element for settings pages

**ThemeSelector**:

- Button group with all three options
- Visual indicator for active theme

#### 8. Integration

- `App.tsx`: Wrapped with `ThemeProvider` (default: dark)
- `index.tsx`: Imports `globals.css` for design system
- `DashboardPage.tsx`: Includes `ThemeToggle` in header
- All CSS files refactored to use CSS variables

### Files Changed/Created

**Created:**

- `src/styles/variables.css` - Design tokens
- `src/styles/themes/dark.css` - Dark theme
- `src/styles/themes/light.css` - Light theme
- `src/styles/globals.css` - Global styles
- `src/context/ThemeContext.tsx` - Theme state management
- `src/hooks/useTheme.ts` - Theme hook
- `src/styles/themes/index.ts` - Theme utilities
- `src/components/common/ThemeToggle/ThemeToggle.tsx` - Toggle component
- `src/components/common/ThemeToggle/ThemeToggle.css` - Toggle styles
- `src/components/common/ThemeToggle/index.ts` - Component exports

**Modified:**

- `src/App.tsx` - Added ThemeProvider
- `src/index.tsx` - Import globals.css
- `src/App.css` - Use CSS variables
- `src/styles/auth.css` - Use CSS variables
- `src/styles/dashboard.css` - Use CSS variables
- `src/pages/Dashboard/DashboardPage.tsx` - Added ThemeToggle
- `src/components/common/index.ts` - Export ThemeToggle

### Usage

#### Using Theme in Components

```typescript
import { useTheme } from '@/hooks/useTheme';

function MyComponent() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Current: {resolvedTheme}
    </button>
  );
}
```

#### Using CSS Variables

```css
.my-component {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
  transition: var(--transition-all);
}
```

#### Adding ThemeToggle

```tsx
import { ThemeToggle, ThemeSelector } from '@/components/common';

// Simple toggle button
<ThemeToggle size="md" />

// Dropdown with all options
<ThemeToggle variant="dropdown" showLabel />

// Button group selector
<ThemeSelector />
```

### CSS Variable Reference

| Category    | Examples                                                        |
| ----------- | --------------------------------------------------------------- |
| Colors      | `--color-primary`, `--color-bg-primary`, `--color-text-primary` |
| Typography  | `--font-sans`, `--text-base`, `--font-semibold`                 |
| Spacing     | `--space-1` (0.25rem) to `--space-24` (6rem)                    |
| Radius      | `--radius-sm` (0.25rem) to `--radius-full` (9999px)             |
| Shadows     | `--shadow-sm` to `--shadow-2xl`, `--shadow-focus`               |
| Transitions | `--transition-fast`, `--transition-base`, `--transition-slow`   |
| Z-Index     | `--z-base` to `--z-toast`                                       |

### Estimated vs Actual Effort

- **Estimated:** 4 hours
- **Actual:** ~3.5 hours

### Related Issues

- Previous: #3 - Set Up Project Structure & Tooling
- Next: #5 - Implement Authentication UI
