import { defineData, a, type ClientSchema } from "@aws-amplify/backend";

/**
 * LinkStash Data Schema
 * 
 * Defines the GraphQL schema for the application's data models:
 * - Link: Individual bookmarks with URL, title, tags, etc.
 * - Collection: Groups of related links
 * - Tag: Labels for organizing and filtering links
 * 
 * All models use owner-based authorization for privacy.
 * 
 * @see https://docs.amplify.aws/gen2/build-a-backend/data/
 */
const schema = a.schema({
  /**
   * Link Model
   * Represents a saved bookmark with metadata and organization
   */
  Link: a
    .model({
      url: a.string().required(),
      title: a.string().required(),
      description: a.string(),
      favicon: a.string(),
      image: a.string(),
      tags: a.string().array(),
      collectionId: a.id(),
      notes: a.string(),
      isArchived: a.boolean().default(false),
      isFavorite: a.boolean().default(false),
      clickCount: a.integer().default(0),
      lastClickedAt: a.datetime(),
    })
    .authorization((allow) => [allow.owner()]),

  /**
   * Collection Model
   * Groups related links together
   */
  Collection: a
    .model({
      name: a.string().required(),
      description: a.string(),
      color: a.string(),
      icon: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  /**
   * Tag Model
   * Labels for organizing and filtering links
   */
  Tag: a
    .model({
      name: a.string().required(),
      color: a.string(),
    })
    .authorization((allow) => [allow.owner()]),

  /**
   * LinkMetadata Custom Type
   * Returned by the extractMetadata query
   */
  LinkMetadata: a.customType({
    title: a.string(),
    description: a.string(),
    favicon: a.string(),
    image: a.string(),
  }),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
  },
});

