# YMSports Website

## Overview

YMSports is a youth Muslim sports organization website built with Payload CMS and Next.js. The application provides a content management system for managing programs, coaches, camps, tournaments, testimonials, and blog posts. It features a modern, animated frontend with Framer Motion and Tailwind CSS, along with a full-featured admin panel for content editors.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

- **Framework**: Next.js 15 with App Router (React 19)
- **Styling**: Tailwind CSS with custom design tokens, shadcn/ui components
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Fonts**: Google Fonts (Bebas Neue for headings, Open Sans for body, Beau Rivage for decorative script)
- **Component Structure**: 
  - Blocks-based layout system for flexible page building
  - Reusable UI components in `/src/components`
  - Hero sections with multiple impact levels (high, medium, low)

### Backend Architecture

- **CMS**: Payload CMS 3.x integrated directly with Next.js
- **Database**: PostgreSQL via `@payloadcms/db-postgres` (Drizzle ORM under the hood)
- **Rich Text**: Lexical editor for content editing
- **API**: Auto-generated REST and GraphQL APIs from Payload collections

### Content Collections

- **Pages**: Dynamic pages with block-based layouts
- **Posts**: Blog posts with categories and authors
- **Programs**: Youth sports programs with age groups
- **Coaches**: Staff profiles with bios and images
- **Camps**: Camp offerings linked to coaches
- **Tournaments**: Event listings with dates and locations
- **Testimonials**: Customer reviews
- **Categories**: Content categorization
- **Media**: Image/file uploads with multiple sizes

### Global Configuration

- **Header**: Navigation items with internal/external link support
- **Footer**: Footer navigation and social links

### Block System

The site uses a modular block system allowing content editors to build pages by combining:
- Content blocks (rich text columns)
- Media blocks (images/video)
- Call-to-action blocks
- Programs, Coaches, Testimonials display blocks (with auto-advancing carousel)
- Custom form blocks
- FAQ blocks
- Image + text combinations
- Dual feature banners
- **Partners block**: Displays sponsor/partner logos in a grid
- **FeaturedPrograms block**: Showcases 3 featured programs with auto-fetch from API
- **WhySection block**: "Why We Exist / Who We Are" statements with icon support

## Recent Changes (January 2026)

- Updated header to display YMS logo image alongside "YMS" text
- Created Partners block for sponsor/partner logo display
- Created FeaturedPrograms block to showcase 3 featured programs
- Created WhySection block for mission/vision statements
- Refactored Testimonials block into auto-advancing carousel with "Community Voice" styling
- Fixed Next.js configuration to handle Replit dev domain and cross-origin requests
- Updated getURL utility to properly resolve server URLs in Replit environment
- **Created Seasonal Sponsorship page** (`/sponsors`):
  - Modern sports-themed layout with deep blue and action green accents
  - Dynamic sponsorship tier cards (Franchise, Starting Five, Foundation)
  - Seasonal clarity section highlighting the "One-time seasonal partnership" model
  - Direct contact CTA for custom partnerships
- **Updated FeaturedPrograms block**: 
  - Fixed rendering issues and updated to match new high-energy branding
  - Added modern hover effects and bento-style program cards
- **Created Program detail page** (`/programs/[slug]`):
  - Hero section with featured image
  - About the Program section
  - What to Expect checklist
  - Sidebar with price, location, schedule info
  - Register Now CTA linking to external Fillout forms
- **Extended Camps collection** with new fields:
  - programType (camp/clinic/league/tournament)
  - location (city + state)
  - venue (name + address)
  - whatToExpect array
  - ageMin/ageMax
  - schedule (days, startTime, endTime)
  - registrationLink for Fillout integration
  - featuredImage upload

### Authentication & Access Control

- User authentication via Payload's built-in auth
- Access control patterns: `anyone` (public), `authenticated` (logged in), `authenticatedOrPublished` (draft/publish workflow)

### Caching & Revalidation

- Next.js `unstable_cache` for global and document caching
- On-demand revalidation hooks for Header, Footer, and Redirects
- Cache tags for granular invalidation

## External Dependencies

### Core Services

- **Database**: PostgreSQL (connection via `DATABASE_URI` environment variable)
- **File Storage**: 
  - DigitalOcean Spaces (S3-compatible) for production media
  - Vercel Blob storage option available
  - CDN URL: `https://prod-bucket-000.sfo3.cdn.digitaloceanspaces.com`

### Payload Plugins

- `@payloadcms/plugin-form-builder`: Dynamic form creation
- `@payloadcms/plugin-nested-docs`: Hierarchical document structure
- `@payloadcms/plugin-redirects`: URL redirect management
- `@payloadcms/plugin-search`: Built-in search functionality
- `@payloadcms/plugin-seo`: Meta tags and OpenGraph management
- `@payloadcms/payload-cloud`: Payload Cloud deployment support

### Environment Variables Required

- `DATABASE_URI`: PostgreSQL connection string
- `PAYLOAD_SECRET`: Secret key for Payload authentication
- `NEXT_PUBLIC_SERVER_URL`: Public-facing URL
- `PREVIEW_SECRET`: Secret for draft preview functionality
- S3/storage credentials for media uploads