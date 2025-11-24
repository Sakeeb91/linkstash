## Description
Create a Lambda function that extracts metadata (title, description, favicon, image) from URLs using web scraping.

## Acceptance Criteria
- [ ] Lambda function fetches and parses HTML
- [ ] Extracts Open Graph meta tags
- [ ] Falls back to standard meta tags and title
- [ ] Handles errors gracefully
- [ ] Returns structured metadata object
- [ ] Is accessible via GraphQL mutation

## Implementation Steps

### 1. Create function directory
```bash
mkdir -p amplify/functions/extract-metadata
```

### 2. Create function resource
Create `amplify/functions/extract-metadata/resource.ts`:
```typescript
import { defineFunction } from "@aws-amplify/backend";

export const extractMetadata = defineFunction({
  name: "extract-metadata",
  entry: "./handler.ts",
  timeoutSeconds: 15,
  memoryMB: 256,
});
```

### 3. Create function handler
Create `amplify/functions/extract-metadata/handler.ts`:
```typescript
import type { Handler } from "aws-lambda";

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

  if (!url) {
    return { title: null, description: null, favicon: null, image: null };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkStash/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();
    return parseMetadata(html, url);
  } catch (error) {
    console.error("Error extracting metadata:", error);
    return { title: null, description: null, favicon: getFaviconUrl(url), image: null };
  }
};

function parseMetadata(html: string, baseUrl: string): Metadata {
  const ogTitle = extractMetaContent(html, "og:title");
  const ogDescription = extractMetaContent(html, "og:description");
  const ogImage = extractMetaContent(html, "og:image");

  const metaDescription = extractMetaContent(html, "description", "name");
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  const pageTitle = titleMatch ? titleMatch[1].trim() : null;

  const faviconMatch = html.match(/<link[^>]*rel=["'](icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i);
  const favicon = faviconMatch ? resolveUrl(faviconMatch[2], baseUrl) : getFaviconUrl(baseUrl);

  return {
    title: ogTitle || pageTitle,
    description: ogDescription || metaDescription,
    favicon,
    image: ogImage ? resolveUrl(ogImage, baseUrl) : null,
  };
}

function extractMetaContent(html: string, property: string, attribute = "property"): string | null {
  const regex = new RegExp(`<meta[^>]*${attribute}=["']${property}["'][^>]*content=["']([^"']+)["']`, "i");
  const match = html.match(regex);
  return match ? match[1].trim() : null;
}

function resolveUrl(url: string, baseUrl: string): string {
  try {
    if (url.startsWith("//")) return `https:${url}`;
    if (url.startsWith("/")) return `${new URL(baseUrl).origin}${url}`;
    if (!url.startsWith("http")) return new URL(url, baseUrl).href;
    return url;
  } catch {
    return url;
  }
}

function getFaviconUrl(url: string): string {
  try {
    return `${new URL(url).origin}/favicon.ico`;
  } catch {
    return "";
  }
}
```

### 4. Add function to backend
Update `amplify/backend.ts`:
```typescript
import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { extractMetadata } from "./functions/extract-metadata/resource";

const backend = defineBackend({
  auth,
  data,
  extractMetadata,
});

export default backend;
```

### 5. Add custom query to data schema
Update `amplify/data/resource.ts` to add custom query:
```typescript
extractMetadata: a
  .query()
  .arguments({ url: a.string().required() })
  .returns(a.ref("LinkMetadata"))
  .handler(a.handler.function(extractMetadata))
  .authorization((allow) => [allow.authenticated()]),
```

### 6. Create frontend service
Create `src/services/utils/metadata.ts`:
```typescript
import { generateClient } from "aws-amplify/api";
import type { Schema } from "../../../amplify/data/resource";

const client = generateClient<Schema>();

export async function extractMetadata(url: string) {
  try {
    const { data } = await client.queries.extractMetadata({ url });
    return data;
  } catch (error) {
    console.error("Failed to extract metadata:", error);
    return null;
  }
}
```

## Estimated Effort
4 hours

## Dependencies
- #8 Define GraphQL Schema

