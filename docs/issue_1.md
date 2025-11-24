## Issue #1: Initialize AWS Amplify Gen 2 Backend

### Description
Set up the AWS Amplify Gen 2 backend infrastructure for the LinkStash application. This establishes the foundation for authentication, data storage, and API services.

### Status: ✅ Completed

### Acceptance Criteria
- [x] Install AWS Amplify backend dependencies
- [x] Install AWS Amplify frontend library
- [x] Create `amplify/` directory structure
- [x] Configure `amplify/backend.ts` entry point
- [x] Create authentication resource (`auth/resource.ts`)
- [x] Create data schema resource (`data/resource.ts`)
- [x] Configure TypeScript for Amplify compatibility
- [x] Add Amplify scripts to package.json
- [x] Configure Amplify in React entry point
- [x] Create TypeScript type definitions for domain models
- [x] Create utility constants and helpers
- [x] Update public assets with LinkStash branding
- [x] Configure .gitignore for Amplify artifacts

### Implementation Summary

#### Backend Structure Created
```
amplify/
├── backend.ts          # Main backend entry point
├── package.json        # ES module configuration
├── tsconfig.json       # TypeScript config for backend
├── .gitignore          # Ignore build artifacts
├── auth/
│   └── resource.ts     # Cognito authentication config
└── data/
    └── resource.ts     # GraphQL schema (Link, Collection, Tag)
```

#### Frontend Structure Created
```
src/
├── amplifyconfiguration.ts  # Amplify config loader
├── types/
│   ├── index.ts             # Barrel file
│   ├── link.ts              # Link type definitions
│   ├── collection.ts        # Collection type definitions
│   ├── tag.ts               # Tag type definitions
│   └── user.ts              # User type definitions
└── utils/
    ├── index.ts             # Barrel file
    ├── constants.ts         # App constants
    └── helpers.ts           # Utility functions
```

#### Authentication Configuration
- Email-based sign-in enabled
- Password policy: 8+ chars, uppercase, lowercase, numbers
- Optional TOTP MFA support
- Preferred username attribute (optional)

#### Data Models Created
1. **Link** - Bookmarks with URL, title, description, tags, etc.
2. **Collection** - Groups of related links
3. **Tag** - Labels for organizing links
4. **LinkMetadata** - Custom type for extracted URL metadata

All models use owner-based authorization for privacy.

### Dependencies Added
```json
{
  "dependencies": {
    "aws-amplify": "^6.x",
    "@aws-amplify/ui-react": "^6.x"
  },
  "devDependencies": {
    "@aws-amplify/backend": "^1.x",
    "@aws-amplify/backend-cli": "^1.x"
  }
}
```

### NPM Scripts Added
```json
{
  "sandbox": "npx ampx sandbox",
  "deploy": "npx ampx deploy",
  "generate": "npx ampx generate graphql-client-code",
  "console": "npx ampx console"
}
```

### Next Steps
1. Run `npm run sandbox` to start local development
2. Configure AWS credentials if not already set
3. Proceed to Issue #2: Configure AWS Cognito Authentication

### Estimated vs Actual Effort
- **Estimated:** 2 hours
- **Actual:** ~2 hours

### Related Issues
- Next: #2 - Configure AWS Cognito Authentication
- Next: #3 - Set Up Project Structure & Tooling

