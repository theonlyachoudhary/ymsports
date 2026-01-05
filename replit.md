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
- Programs, Coaches, Testimonials display blocks
- Custom form blocks
- FAQ blocks
- Image + text combinations
- Dual feature banners

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