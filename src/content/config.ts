// 1. Import utilities from `astro:content`
import { z, defineCollection } from 'astro:content';

// 2. Define your collection(s)
const blogCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    title: z.string(),
    snippet: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
    author: z.string().default('Astroship'),
    category: z.string(),
    tags: z.array(z.string()),
  }),
});

const teamCollection = defineCollection({
  schema: z.object({
    draft: z.boolean(),
    name: z.string(),
    title: z.string(),
    avatar: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.string().transform(str => new Date(str)),
  }),
});

// INJECTED: Flexible rooms collection layout to handle mock placeholder text links flawlessly
const roomsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional().nullable(),
    // Set to simple strings so text like "/images/placeholder.jpg" passes validation
    image: z.string().optional().nullable(),
    capacity: z.string().optional().nullable(),
    bed_type: z.string().optional().nullable(),
    view: z.string().optional().nullable(),
    // Allows features to be either an array of text strings OR a single comma-separated sentence
    features: z.union([z.array(z.string()), z.string()]).optional().nullable(),
    // Structural hooks for the gallery popups so mock names don't trigger errors
    room_gallery1: z.string().optional().nullable(),
    room_gallery2: z.string().optional().nullable(),
    room_gallery3: z.string().optional().nullable(),
  }),
});

// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  'blog': blogCollection,
  'team': teamCollection,
  'rooms': roomsCollection, // REGISTERED: Connects the new schema to your content folder
};
