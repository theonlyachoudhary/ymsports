# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

YMSports is a youth sports organization website built on the Payload CMS website template using Next.js 15 App Router and React 19. It combines a headless CMS backend with a frontend website in a single deployment.

## Commands

```bash
# Development
npm dev                    # Start dev server at localhost:3000
npm build                  # Production build (includes sitemap generation)
npm start                  # Run production server

# Testing
npm test                   # Run all tests (integration + e2e)
npm test:int               # Run integration tests only (vitest)
npm test:e2e               # Run e2e tests only (playwright)

# Code quality
npm lint                   # Run ESLint
npm lint:fix               # Fix linting issues

# Payload CMS
npx payload generate:types # Regenerate TypeScript types from collections
npx payload migrate:create # Create database migration
npx payload migrate        # Run pending migrations
```

## Architecture

### Directory Structure

- `src/app/(frontend)/` - Next.js frontend pages and routes
- `src/app/(payload)/` - Payload admin panel and API routes
- `src/collections/` - Payload CMS collection definitions
- `src/blocks/` - Layout builder blocks (each has `config.ts` + `Component.tsx`)
- `src/components/` - Reusable React components (cards, headers, UI elements)
- `src/components/ui/` - shadcn/ui component library
- `src/heros/` - Hero section variants (HighImpact, MediumImpact, LowImpact, etc.)
- `src/fields/` - Reusable field configurations (link, linkGroup, defaultLexical)
- `src/plugins/` - Payload plugins configuration (SEO, forms, redirects, search)
- `src/utilities/` - Shared utility functions
- `src/access/` - Access control functions (anyone, authenticated, authenticatedOrPublished)

### Page Structure

Pages are built from blocks (not standalone components). The Header and Footer are defined as separate Payload globals, rendered in the root layout. Page content is composed of an optional Hero section followed by a `layout` array of blocks.

### Collections

Collections define database tables that can be referenced across the project. Located in `src/collections/`.

**Core collections:** Pages, Posts, Media, Categories, Users
**Custom collections:** Coaches, Programs, Testimonials

Key patterns:
- Use `relationTo` field type to reference other collections
- Types are auto-generated to `src/payload-types.ts` via `pnpm payload generate:types`
- Access control defined via functions from `src/access/`

### Block System (Layout Builder)

Pages use a block-based layout system. Available blocks include: CallToAction, Content, MediaBlock, Archive, FormBlock, Programs, Values, Coaches, Testimonials, DualFeatureBanner, Tournaments, ImageTextBlock, PageHeaderBlock, AgeGroupBlock, FAQBlock, Partners, FeaturedPrograms, LocationsBlock, and more.

Each block consists of two files:

**`config.ts`** - Payload field definition:
```typescript
import type { Block } from 'payload'

export const YourBlock: Block = {
  slug: 'yourBlock',
  interfaceName: 'YourBlockType',
  fields: [
    { name: 'title', type: 'text', required: true },
    // ... more fields
  ],
}
```

**`Component.tsx`** - React renderer:
```typescript
import type { YourBlockType } from '@/payload-types'

export const YourBlock: React.FC<YourBlockType> = ({ title, ...props }) => {
  // Props are destructured from config field names
  return <div>{title}</div>
}
```

To add a new block:
1. Create folder in `src/blocks/YourBlock/`
2. Add `config.ts` (Payload field definition) and `Component.tsx` (React component)
3. Import and add to the `blocks` array in `src/collections/Pages/index.ts`
4. Add to `RenderBlocks.tsx` for frontend rendering

### Component Library

**shadcn/ui** is the default component library, installed in `src/components/ui/`.

Key utilities and patterns:
- `cn()` utility from `@/utilities/ui` for Tailwind class composition
- `class-variance-authority` (CVA) for variant-based component styling
- `lucide-react` for icons
- `framer-motion` for animations

Example usage:
```typescript
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

<Button className={cn('mt-4', isActive && 'bg-primary')}>
  Continue <ArrowRight className="ml-2 h-4 w-4" />
</Button>
```

### Styling Guide

#### Brand Colors

```
Primary Navy: #052B70
Primary Green: #3BD463
```

Program type accent colors:
- Camps: `#3BD463` (green)
- Clinics: `#FF6B35` (orange)
- Tournaments: `#FFD700` (gold)
- Leagues: `#00BFFF` (blue)

#### Section Header Pattern

- Eyebrow badge with icon (e.g., `Zap`) + uppercase `tracking-widest` text
- Large bold uppercase heading (`text-4xl` to `text-6xl`)
- Gray description text (`text-gray-500`)

```typescript
<span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-[#3BD463]">
  <Zap className="h-4 w-4" />
  Eyebrow Text
</span>
<h2 className="text-4xl font-bold uppercase md:text-5xl lg:text-6xl">
  Section Title
</h2>
<p className="text-gray-500">Description text goes here.</p>
```

#### Tab/Filter Patterns

- Pill-shaped segmented controls for location filters
- Colorful icon tabs with `layoutId` animation for smooth transitions
- Use `framer-motion` for tab indicator animations

```typescript
// Animated tab indicator using layoutId
{isActive && (
  <motion.div
    layoutId="activeTab"
    className="absolute inset-0 rounded-full bg-white"
    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
  />
)}
```

#### Card Patterns

- Rounded corners (`rounded-2xl` to `rounded-3xl`)
- Shadow on hover (`shadow-lg` to `shadow-2xl`)
- Subtle lift animation (`hover:-translate-y-1`)
- Use ProgramCard `featured` variant for consistent styling

```typescript
<motion.div
  className="rounded-3xl bg-white shadow-lg transition-shadow hover:shadow-2xl"
  whileHover={{ y: -4 }}
>
  {/* Card content */}
</motion.div>
```

#### Animation Patterns

- Staggered entrance: `delay: index * 0.05`
- Scroll-triggered: `whileInView` with `viewport={{ once: true }}`
- Spring physics for smooth transitions

```typescript
// Staggered entrance animation
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.05, duration: 0.5 }}
>
  {/* Content */}
</motion.div>
```

#### Empty/Loading States

- Skeleton loaders with gradient animation
- Contextual empty states with icons and helpful CTAs
- Color-coded by context (program type colors)

```typescript
// Skeleton loader example
<div className="animate-pulse rounded-2xl bg-gray-200 h-64" />

// Empty state example
<div className="text-center py-12">
  <Calendar className="mx-auto h-12 w-12 text-gray-400" />
  <h3 className="mt-4 text-lg font-semibold">No programs found</h3>
  <p className="mt-2 text-gray-500">Try adjusting your filters.</p>
</div>
```

### ProgramCard Component

A reusable card component for displaying programs, located at `src/components/ProgramCard/`.

**Files:**
- `index.tsx` - Main component with variant support
- `types.ts` - TypeScript interfaces
- `utils.ts` - Utility functions for formatting

**Usage:**
```typescript
import { ProgramCard } from '@/components/ProgramCard'

// Standard variant (used in Programs block)
<ProgramCard program={program} variant="standard" disableAnimation />

// Featured variant (used in FeaturedPrograms block)
<ProgramCard program={program} variant="featured" animationDelay={0.1} />
```

**Props:**
- `program` - Program object from the Programs collection
- `variant` - `'standard'` (list style) or `'featured'` (badge style)
- `disableAnimation` - Set `true` when parent handles animation (e.g., AnimatePresence)
- `animationDelay` - Stagger delay for scroll-triggered animations
- `ctaText` - Custom button/link text
- `showPrice`, `showLocation`, `showDuration`, `showAgeRange`, `showGender`, `showSchedule` - Toggle metadata visibility

**Utility functions exported:**
- `calculateDuration(startDate, endDate)` - Returns human-readable duration
- `formatAgeRange(minAge, maxAge)` - Returns "Ages X–Y" or "Age X"
- `formatGender(gender)` - Returns "Boys", "Girls", or "Co-ed"
- `formatLocation(location)` - Returns capitalized location name
- `getProgramTypeLabel(type)` - Returns "Camp", "Clinic", or "Tournament"

### Database

Uses PostgreSQL via `@payloadcms/db-postgres`. The adapter has `push: { force: true }` enabled for development which allows schema changes without migrations. For production deployments, run migrations.

### Storage

Media uploads use Vercel Blob Storage when `BLOB_READ_WRITE_TOKEN` is set, otherwise falls back to S3.

### Type Generation

After modifying collections or fields, run `pnpm payload generate:types` to update `src/payload-types.ts`.

## Testing

- Integration tests: `tests/int/*.int.spec.ts` (vitest with jsdom)
- E2E tests: `tests/e2e/*.e2e.spec.ts` (playwright, requires dev server)

## Common Patterns & Gotchas

### Client-Side Data Fetching

When fetching from Payload API in client components, always handle empty collections:

```typescript
// BAD - crashes if collection is empty
const json = await res.json()
const filtered = json.docs.filter(...)  // TypeError if docs is undefined

// GOOD - defensive null check
const json = await res.json()
const docs = json.docs || []
const filtered = docs.filter(...)
```

Always include loading and error states in components that fetch data:

```typescript
const [data, setData] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

// In render:
{loading ? <Skeleton /> : error ? <ErrorMessage /> : <Content />}
```

### Payload API Response Structure

Payload REST API returns paginated responses:
```typescript
{
  docs: [],           // Array of documents (may be empty or undefined)
  totalDocs: 0,
  limit: 10,
  totalPages: 0,
  page: 1,
  pagingCounter: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevPage: null,
  nextPage: null
}
```

### Media Relations

When accessing media fields (like `programImage`), the value can be a number (ID only) or the full Media object depending on `depth` parameter:

```typescript
// With depth=0: programImage is number
// With depth=1+: programImage is Media object
const programImage = program.programImage as Media | null
if (programImage?.url) {
  // Safe to use
}
```

### Link Safety

Always check for slug/href existence before rendering links:

```typescript
// BAD - creates broken /programs/undefined link
<Link href={`/programs/${program.slug}`}>

// GOOD - fallback for missing slug
const href = program.slug ? `/programs/${program.slug}` : '#'
<Link href={href}>
```
