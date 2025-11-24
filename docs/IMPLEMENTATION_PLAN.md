# LinkStash - Implementation Plan

> **Project:** Link Bookmarking Tool  
> **Architecture Lead:** Expert Software Architect  
> **Tech Stack:** React 18 + TypeScript + AWS Amplify (Cognito, AppSync, DynamoDB, S3)  
> **Last Updated:** November 24, 2025

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Data Model Design](#data-model-design)
4. [AWS Services Configuration](#aws-services-configuration)
5. [Frontend Architecture](#frontend-architecture)
6. [Implementation Phases](#implementation-phases)
7. [Security Considerations](#security-considerations)
8. [Performance Optimization](#performance-optimization)
9. [Testing Strategy](#testing-strategy)
10. [Deployment Pipeline](#deployment-pipeline)

---

## Executive Summary

LinkStash is a modern, serverless link bookmarking application that allows users to save, organize, and discover their bookmarks efficiently. The application leverages AWS Amplify's managed services to provide a scalable, secure, and cost-effective solution within the AWS Free Tier.

### Key Features

- 🔐 **Secure Authentication** - Email/password and social sign-in via AWS Cognito
- 🔗 **Link Management** - Save, edit, delete, and organize bookmarks
- 🏷️ **Tagging System** - Flexible tag-based organization
- 📁 **Collections** - Group related links into collections
- 🔍 **Smart Search** - Full-text search across titles, descriptions, and tags
- 📝 **Notes & Annotations** - Add personal notes to bookmarks
- 🌐 **Metadata Extraction** - Auto-fetch title, description, and favicon from URLs
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🌙 **Dark Mode** - System-aware theme switching

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                               │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    React Application                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │   │
│  │  │  Auth    │ │ Dashboard│ │ Search   │ │ Collections  │   │   │
│  │  │  Module  │ │  Module  │ │  Module  │ │    Module    │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         AWS AMPLIFY LAYER                            │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐  │
│  │   Cognito   │ │   AppSync   │ │  DynamoDB   │ │     S3      │  │
│  │    Auth     │ │  GraphQL    │ │  Database   │ │   Storage   │  │
│  │             │ │     API     │ │             │ │  (Favicons) │  │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘  │
│                           │                                         │
│                           ▼                                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                    Lambda Functions                           │   │
│  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐    │   │
│  │  │ URL Metadata │ │  Search      │ │  Scheduled       │    │   │
│  │  │  Extractor   │ │  Indexer     │ │  Link Checker    │    │   │
│  │  └──────────────┘ └──────────────┘ └──────────────────┘    │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Design Principles

1. **Serverless-First**: Leverage managed AWS services to minimize operational overhead
2. **Single-Table Design**: Efficient DynamoDB access patterns using GSIs
3. **Optimistic UI**: Update UI immediately, sync with backend asynchronously
4. **Offline-Ready**: Cache data locally for offline access (future enhancement)
5. **Security by Default**: Row-level security, encrypted data at rest and in transit

---

## Data Model Design

### DynamoDB Single-Table Design

We use a single-table design pattern for optimal performance and cost efficiency.

```
┌────────────────┬────────────────┬─────────────────────────────────────┐
│       PK       │       SK       │            Attributes               │
├────────────────┼────────────────┼─────────────────────────────────────┤
│ USER#<userId>  │ PROFILE        │ email, name, createdAt, settings    │
│ USER#<userId>  │ LINK#<linkId>  │ url, title, description, favicon,   │
│                │                │ tags[], collectionId, notes,        │
│                │                │ createdAt, updatedAt, isArchived    │
│ USER#<userId>  │ COLLECTION#<id>│ name, description, color, icon,     │
│                │                │ linkCount, createdAt                │
│ USER#<userId>  │ TAG#<tagName>  │ color, linkCount, createdAt         │
└────────────────┴────────────────┴─────────────────────────────────────┘

GSI1 (for querying by collection):
┌────────────────────────┬────────────────┬───────────────────────────┐
│         GSI1PK         │     GSI1SK     │        Attributes         │
├────────────────────────┼────────────────┼───────────────────────────┤
│ USER#<userId>#COLL#<id>│ LINK#<linkId>  │ (projected link attrs)    │
└────────────────────────┴────────────────┴───────────────────────────┘

GSI2 (for querying by tag):
┌────────────────────────┬────────────────┬───────────────────────────┐
│         GSI2PK         │     GSI2SK     │        Attributes         │
├────────────────────────┼────────────────┼───────────────────────────┤
│ USER#<userId>#TAG#<tag>│ LINK#<linkId>  │ (projected link attrs)    │
└────────────────────────┴────────────────┴───────────────────────────┘
```

### GraphQL Schema

```graphql
type Link @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  url: String!
  title: String!
  description: String
  favicon: String
  tags: [String!]
  collectionId: ID
  collection: Collection @belongsTo(fields: ["collectionId"])
  notes: String
  isArchived: Boolean
  isFavorite: Boolean
  clickCount: Int
  lastClickedAt: AWSDateTime
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Collection @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  description: String
  color: String
  icon: String
  links: [Link] @hasMany(indexName: "byCollection", fields: ["id"])
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Tag @model @auth(rules: [{ allow: owner }]) {
  id: ID!
  name: String!
  color: String
  linkCount: Int
  createdAt: AWSDateTime!
  updatedAt: AWSDateTime!
}

type Query {
  searchLinks(query: String!, limit: Int, nextToken: String): LinkConnection
  getLinksByTag(tag: String!, limit: Int, nextToken: String): LinkConnection
  getLinksByCollection(collectionId: ID!, limit: Int, nextToken: String): LinkConnection
  getRecentLinks(limit: Int, nextToken: String): LinkConnection
  getFavoriteLinks(limit: Int, nextToken: String): LinkConnection
}

type Mutation {
  extractMetadata(url: String!): LinkMetadata
}

type LinkMetadata {
  title: String
  description: String
  favicon: String
  image: String
}
```

---

## AWS Services Configuration

### 1. AWS Cognito (Authentication)

```typescript
// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    preferredUsername: {
      required: false,
      mutable: true,
    },
  },
  passwordPolicy: {
    minLength: 8,
    requireLowercase: true,
    requireUppercase: true,
    requireNumbers: true,
    requireSymbols: false,
  },
  multifactor: {
    mode: 'OPTIONAL',
    totp: true,
  },
});
```

### 2. AWS AppSync (GraphQL API)

```typescript
// amplify/data/resource.ts
import { defineData, a } from '@aws-amplify/backend';

const schema = a.schema({
  Link: a.model({
    url: a.string().required(),
    title: a.string().required(),
    description: a.string(),
    favicon: a.string(),
    tags: a.string().array(),
    collectionId: a.id(),
    notes: a.string(),
    isArchived: a.boolean().default(false),
    isFavorite: a.boolean().default(false),
    clickCount: a.integer().default(0),
    lastClickedAt: a.datetime(),
  }).authorization(allow => [allow.owner()]),

  Collection: a.model({
    name: a.string().required(),
    description: a.string(),
    color: a.string(),
    icon: a.string(),
  }).authorization(allow => [allow.owner()]),

  Tag: a.model({
    name: a.string().required(),
    color: a.string(),
  }).authorization(allow => [allow.owner()]),
});

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
```

### 3. Lambda Function (URL Metadata Extraction)

```typescript
// amplify/functions/extract-metadata/handler.ts
import { Handler } from 'aws-lambda';
import * as cheerio from 'cheerio';

interface MetadataEvent {
  arguments: {
    url: string;
  };
}

interface Metadata {
  title: string | null;
  description: string | null;
  favicon: string | null;
  image: string | null;
}

export const handler: Handler<MetadataEvent, Metadata> = async (event) => {
  const { url } = event.arguments;
  
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LinkStash/1.0)',
      },
    });
    
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract Open Graph and standard meta tags
    const title = 
      $('meta[property="og:title"]').attr('content') ||
      $('title').text() ||
      null;
    
    const description =
      $('meta[property="og:description"]').attr('content') ||
      $('meta[name="description"]').attr('content') ||
      null;
    
    const favicon =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href') ||
      new URL('/favicon.ico', url).href;
    
    const image =
      $('meta[property="og:image"]').attr('content') ||
      null;
    
    return {
      title: title?.trim() || null,
      description: description?.trim() || null,
      favicon: favicon ? new URL(favicon, url).href : null,
      image: image ? new URL(image, url).href : null,
    };
  } catch (error) {
    console.error('Error extracting metadata:', error);
    return {
      title: null,
      description: null,
      favicon: null,
      image: null,
    };
  }
};
```

---

## Frontend Architecture

### Directory Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   ├── Card/
│   │   ├── Tag/
│   │   └── Loading/
│   ├── layout/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   ├── Footer/
│   │   └── Layout/
│   ├── auth/
│   │   ├── LoginForm/
│   │   ├── SignupForm/
│   │   └── ForgotPassword/
│   ├── links/
│   │   ├── LinkCard/
│   │   ├── LinkForm/
│   │   ├── LinkList/
│   │   └── LinkDetail/
│   ├── collections/
│   │   ├── CollectionCard/
│   │   ├── CollectionForm/
│   │   └── CollectionList/
│   ├── tags/
│   │   ├── TagChip/
│   │   ├── TagInput/
│   │   └── TagCloud/
│   └── search/
│       ├── SearchBar/
│       └── SearchResults/
├── pages/
│   ├── Home/
│   ├── Dashboard/
│   ├── Collections/
│   ├── Tags/
│   ├── Search/
│   ├── Settings/
│   └── Auth/
├── hooks/
│   ├── useAuth.ts
│   ├── useLinks.ts
│   ├── useCollections.ts
│   ├── useTags.ts
│   ├── useSearch.ts
│   └── useTheme.ts
├── context/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── ToastContext.tsx
├── services/
│   ├── api/
│   │   ├── links.ts
│   │   ├── collections.ts
│   │   └── tags.ts
│   └── utils/
│       ├── metadata.ts
│       └── validation.ts
├── types/
│   ├── link.ts
│   ├── collection.ts
│   ├── tag.ts
│   └── user.ts
├── styles/
│   ├── variables.css
│   ├── globals.css
│   └── themes/
│       ├── light.css
│       └── dark.css
└── utils/
    ├── constants.ts
    ├── helpers.ts
    └── formatters.ts
```

### State Management Strategy

Using React Context + useReducer for global state, with React Query for server state:

```typescript
// src/context/LinksContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { Link, LinksState, LinksAction } from '../types';

const initialState: LinksState = {
  links: [],
  isLoading: false,
  error: null,
  selectedLink: null,
  filters: {
    tags: [],
    collection: null,
    isArchived: false,
    isFavorite: false,
  },
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

function linksReducer(state: LinksState, action: LinksAction): LinksState {
  switch (action.type) {
    case 'SET_LINKS':
      return { ...state, links: action.payload, isLoading: false };
    case 'ADD_LINK':
      return { ...state, links: [action.payload, ...state.links] };
    case 'UPDATE_LINK':
      return {
        ...state,
        links: state.links.map((link) =>
          link.id === action.payload.id ? action.payload : link
        ),
      };
    case 'DELETE_LINK':
      return {
        ...state,
        links: state.links.filter((link) => link.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}

export const LinksContext = createContext<{
  state: LinksState;
  dispatch: React.Dispatch<LinksAction>;
} | null>(null);

export function LinksProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(linksReducer, initialState);
  return (
    <LinksContext.Provider value={{ state, dispatch }}>
      {children}
    </LinksContext.Provider>
  );
}

export function useLinksContext() {
  const context = useContext(LinksContext);
  if (!context) {
    throw new Error('useLinksContext must be used within a LinksProvider');
  }
  return context;
}
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1-2)
**Goal:** Establish project infrastructure and authentication

| Task | Description | Effort |
|------|-------------|--------|
| 1.1 | Initialize Amplify Gen 2 backend | 2h |
| 1.2 | Configure Cognito authentication | 3h |
| 1.3 | Set up project structure & tooling | 2h |
| 1.4 | Create design system & theme | 4h |
| 1.5 | Implement auth UI (login, signup, forgot password) | 6h |
| 1.6 | Set up React Router with protected routes | 2h |
| 1.7 | Configure CI/CD with Amplify Hosting | 2h |

### Phase 2: Core Features (Week 3-4)
**Goal:** Implement link management functionality

| Task | Description | Effort |
|------|-------------|--------|
| 2.1 | Define GraphQL schema for links | 2h |
| 2.2 | Create Link model & API service | 3h |
| 2.3 | Build LinkCard component | 3h |
| 2.4 | Implement Add Link modal with URL validation | 4h |
| 2.5 | Create URL metadata extraction Lambda | 4h |
| 2.6 | Build Link List with infinite scroll | 4h |
| 2.7 | Implement Edit & Delete functionality | 3h |
| 2.8 | Add favorite/archive actions | 2h |

### Phase 3: Organization (Week 5-6)
**Goal:** Add collections and tags for organization

| Task | Description | Effort |
|------|-------------|--------|
| 3.1 | Define Collections & Tags models | 2h |
| 3.2 | Build Collections CRUD UI | 4h |
| 3.3 | Implement drag-drop link organization | 4h |
| 3.4 | Create Tag input with autocomplete | 3h |
| 3.5 | Build Tag cloud visualization | 3h |
| 3.6 | Implement collection sidebar navigation | 3h |
| 3.7 | Add bulk actions (multi-select) | 4h |

### Phase 4: Search & Discovery (Week 7)
**Goal:** Enable powerful search and filtering

| Task | Description | Effort |
|------|-------------|--------|
| 4.1 | Implement search bar with debouncing | 2h |
| 4.2 | Build advanced filter panel | 3h |
| 4.3 | Create search results page | 3h |
| 4.4 | Add keyboard shortcuts for navigation | 3h |
| 4.5 | Implement recent links & favorites views | 2h |

### Phase 5: Polish & Enhancement (Week 8)
**Goal:** Refine UX and add finishing touches

| Task | Description | Effort |
|------|-------------|--------|
| 5.1 | Implement dark mode toggle | 3h |
| 5.2 | Add toast notifications | 2h |
| 5.3 | Create settings page | 3h |
| 5.4 | Implement export functionality (JSON/CSV) | 3h |
| 5.5 | Add import from browser bookmarks | 4h |
| 5.6 | Performance optimization & lazy loading | 3h |
| 5.7 | Write E2E tests with Cypress | 4h |
| 5.8 | Documentation & README updates | 2h |

---

## Security Considerations

### Authentication & Authorization

```typescript
// Row-level security via Amplify Auth rules
// Every model has owner-based authorization

// Example: Only the owner can access their links
const schema = a.schema({
  Link: a.model({
    // ... fields
  }).authorization(allow => [
    allow.owner(),  // Only owner can CRUD
  ]),
});
```

### Input Validation

```typescript
// src/utils/validation.ts
import { z } from 'zod';

export const linkSchema = z.object({
  url: z.string().url('Please enter a valid URL'),
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(500, 'Description too long').optional(),
  tags: z.array(z.string().max(50)).max(10, 'Maximum 10 tags allowed'),
  notes: z.string().max(2000, 'Notes too long').optional(),
});

export const collectionSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  description: z.string().max(300, 'Description too long').optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').optional(),
});

export type LinkInput = z.infer<typeof linkSchema>;
export type CollectionInput = z.infer<typeof collectionSchema>;
```

### XSS Prevention

- All user input is sanitized before rendering
- Use React's built-in XSS protection (JSX escaping)
- Validate and sanitize URLs before storage

---

## Performance Optimization

### Frontend Optimizations

1. **Code Splitting**: Lazy load routes and heavy components
2. **Virtualization**: Use react-window for long lists
3. **Image Optimization**: Lazy load favicons, use WebP format
4. **Memoization**: Use React.memo, useMemo, useCallback appropriately
5. **Bundle Size**: Tree-shake imports, analyze bundle with webpack-bundle-analyzer

```typescript
// Lazy loading routes
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const Collections = lazy(() => import('./pages/Collections'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Suspense>
  );
}
```

### Backend Optimizations

1. **DynamoDB**: Use GSIs for access patterns, pagination with cursors
2. **Caching**: AppSync caching for frequently accessed data
3. **Lambda**: Keep functions warm, optimize cold starts

---

## Testing Strategy

### Testing Pyramid

```
          ┌───────────┐
          │    E2E    │  Cypress - Critical user journeys
          │   Tests   │  (5-10 tests)
         ┌┴───────────┴┐
         │ Integration │  React Testing Library - Component interactions
         │    Tests    │  (20-30 tests)
        ┌┴─────────────┴┐
        │   Unit Tests   │  Jest - Utilities, hooks, reducers
        │                │  (50+ tests)
        └────────────────┘
```

### Example Tests

```typescript
// src/components/links/LinkCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { LinkCard } from './LinkCard';

const mockLink = {
  id: '1',
  url: 'https://example.com',
  title: 'Example Site',
  description: 'An example website',
  favicon: 'https://example.com/favicon.ico',
  tags: ['web', 'example'],
  isFavorite: false,
  createdAt: new Date().toISOString(),
};

describe('LinkCard', () => {
  it('renders link title and description', () => {
    render(<LinkCard link={mockLink} />);
    
    expect(screen.getByText('Example Site')).toBeInTheDocument();
    expect(screen.getByText('An example website')).toBeInTheDocument();
  });

  it('displays all tags', () => {
    render(<LinkCard link={mockLink} />);
    
    expect(screen.getByText('web')).toBeInTheDocument();
    expect(screen.getByText('example')).toBeInTheDocument();
  });

  it('calls onFavorite when favorite button is clicked', () => {
    const onFavorite = jest.fn();
    render(<LinkCard link={mockLink} onFavorite={onFavorite} />);
    
    fireEvent.click(screen.getByLabelText('Add to favorites'));
    
    expect(onFavorite).toHaveBeenCalledWith('1');
  });

  it('opens link in new tab when clicked', () => {
    render(<LinkCard link={mockLink} />);
    
    const link = screen.getByRole('link', { name: /example site/i });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
```

---

## Deployment Pipeline

### Amplify Hosting Configuration

```yaml
# amplify.yml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*

backend:
  phases:
    build:
      commands:
        - npm ci
        - npx ampx pipeline-deploy --branch $AWS_BRANCH --app-id $AWS_APP_ID
```

### Branch Strategy

| Branch | Environment | Purpose |
|--------|-------------|---------|
| main | Production | Stable releases |
| develop | Staging | Integration testing |
| feature/* | Preview | Feature development |

---

## Appendix: CLI Commands Reference

```bash
# Initialize Amplify
npx create-amplify@latest

# Deploy backend
npx ampx sandbox  # For local development
npx ampx deploy   # For production

# Generate GraphQL types
npx ampx generate graphql-client-code

# View Amplify Console
npx ampx console

# Run tests
npm test
npm run test:coverage
npm run test:e2e
```

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance Score | > 90 |
| Time to First Contentful Paint | < 1.5s |
| Core Web Vitals (LCP, FID, CLS) | All Green |
| Test Coverage | > 80% |
| Bundle Size (gzipped) | < 200KB |

---

*Document maintained by: Software Architecture Team*  
*Next review date: December 2025*

