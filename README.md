# DAC Architects Website

A modern, headless architecture website built with Next.js 16, React 19, WordPress backend, and TypeScript. Features a sleek design with dynamic content management, testimonials carousel, and responsive layouts.

![DAC Architects](https://dacarch.com/wp-content/uploads/2026/01/project-rendering.png)

> **Live Site:** [dacarch.com](https://dacarch.com/)

## Table of Contents

- [Overview](#overview)
- [Quick Start](#quick-start)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [WordPress Integration](#wordpress-integration)
- [Customization](#customization)
- [Scripts](#scripts)
- [License](#license)

## Overview

DAC Architects is a professional architecture firm website showcasing projects, services, and client testimonials. The site uses a headless WordPress CMS for content management with a modern Next.js frontend for optimal performance and user experience.

## Quick Start

```bash
# Clone the repository
git clone https://github.com/DACarchitects/dac-v1.git
cd dac-v1

# Install dependencies (using pnpm)
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your WordPress URL and credentials

# Start development server
pnpm dev
```

Your site will be running at `http://localhost:3000`.

## Features

- **🎨 Modern UI/UX** - Clean, professional design with smooth animations and transitions
- **📱 Fully Responsive** - Mobile-first design with Tailwind CSS v4
- **🎠 Testimonials Carousel** - Interactive testimonials with touch/swipe support
- **🌗 Dark Mode** - Built-in theme switching with next-themes
- **⚡ Server Components** - Optimized performance with React Server Components
- **🔍 SEO Optimized** - Dynamic sitemap, meta tags, and OG image generation
- **📝 Headless CMS** - WordPress backend for easy content management
- **🎯 Type-Safe** - Full TypeScript support throughout
- **🎭 Smooth Scrolling** - Anchor navigation with smooth scroll behavior
- **🧩 Component Library** - Built with shadcn/ui components
- **📦 Modular Architecture** - Clean, maintainable code structure

## Tech Stack

### Frontend

- **Next.js 16.1** - React framework with App Router
- **React 19.1** - Latest React with Server Components
- **TypeScript 5.9** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **shadcn/ui** - Accessible component library
- **Lucide React** - Beautiful icon library

### Backend

- **WordPress** - Headless CMS via REST API
- **Custom WordPress Plugin** - Cache revalidation

### Deployment & Tools

- **Vercel/Railway** - Deployment platforms
- **pnpm** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Turbo** - Fast development mode

## Project Structure

```
dac-v1/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── og/                  # OG image generation
│   │   └── revalidate/          # Cache revalidation webhook
│   ├── pages/                   # Dynamic WordPress pages
│   ├── posts/                   # Blog posts & archives
│   ├── contact/                 # Contact page
│   ├── project-1/               # Project showcase pages
│   ├── project-2/
│   ├── project-3/
│   ├── layout.tsx               # Root layout with nav
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   └── data.jsx                 # Static data (testimonials)
├── components/
│   ├── layout/                  # Layout components
│   │   ├── nav.tsx             # Main navigation
│   │   ├── footer.tsx          # Footer
│   │   ├── about.tsx           # About section
│   │   ├── services.tsx        # Services section
│   │   ├── projects.tsx        # Projects section
│   │   └── ribbon.tsx          # Decorative ribbon
│   ├── nav/
│   │   └── mobile-nav.tsx      # Mobile navigation
│   ├── posts/                   # Post-related components
│   ├── theme/                   # Theme toggle components
│   ├── ui/                      # shadcn/ui components
│   ├── heroHeader.tsx                 # Hero section with parallax
│   ├── testimonialsCarousel.tsx # Testimonials carousel
│   └── craft.tsx                # Utility components
├── lib/
│   ├── wordpress.ts             # WordPress API functions
│   ├── types.ts                 # Shared TypeScript types
│   ├── utils.ts                 # Utility functions
│   └── metadata.ts              # SEO metadata helpers
├── public/                       # Static assets
├── plugin/                       # WordPress plugin for revalidation
├── site.config.ts               # Site configuration
├── menu.config.ts               # Navigation menu config
└── package.json
```

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# WordPress Configuration
WORDPRESS_URL="https://your-wordpress-site.com"    # Full WordPress URL
WORDPRESS_HOSTNAME="your-wordpress-site.com"       # Domain for image optimization
WORDPRESS_WEBHOOK_SECRET="your-secret-key-here"    # Secret for cache revalidation
```

**Important:** Never commit your `.env.local` file to version control.

## Development

### Prerequisites

- **Node.js** 18.17 or later
- **pnpm** 8.0 or later (recommended)
- **WordPress** site with REST API enabled

### Local Development

```bash
# Install dependencies
pnpm install

# Run development server with Turbo
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Key Components

#### Hero Section

- Parallax scrolling effect
- Smooth animations
- Call-to-action buttons with proper scroll behavior

#### Testimonials Carousel

- Touch/swipe support for mobile
- Auto-scroll option
- Responsive card layouts (1/2/3 columns)
- Navigation dots and arrow controls

#### Navigation

- Sticky header with backdrop blur on scroll
- Mobile-friendly hamburger menu
- Smooth anchor link scrolling
- Theme toggle integration

## Deployment

### Railway (with WordPress)

1. Click the "Deploy on Railway" button (if available)
2. Configure environment variables
3. Deploy WordPress and Next.js services

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

## WordPress Integration

### API Functions

Located in `lib/wordpress.ts`, includes functions for:

- Fetching posts, pages, authors, categories, tags
- Pagination support
- Search functionality
- Custom fields and featured images

### Cache Revalidation

Install the WordPress plugin from the `plugin/` directory to enable automatic cache invalidation when content is updated.

### Setting Up WordPress

1. Ensure WordPress REST API is enabled
2. Install and activate the revalidation plugin
3. Configure the webhook URL in WordPress settings
4. Add the webhook secret to your environment variables

## Customization

### Site Configuration

Edit `site.config.ts`:

```typescript
export const siteConfig = {
  site_name: "DAC Architects",
  site_description: "Design. Architect. Create.",
  site_domain: "https://dacarch.com/",
};
```

### Navigation Menu

Edit `menu.config.ts`:

```typescript
export const mainMenu = {
  home: "/",
  about: "/#about",
  services: "/#services",
  projects: "/#projects",
};
```

### Adding New Types

Add interfaces to `lib/types.ts`:

```typescript
export interface YourNewType {
  id: string;
  // ... your properties
}
```

### Styling

- Global styles: `app/globals.css`
- Tailwind config: Uses Tailwind CSS v4 syntax
- Theme colors: Defined in CSS variables in `globals.css`

## Scripts

```bash
pnpm dev      # Start development server (with Turbo)
pnpm build    # Build for production
pnpm start    # Start production server
pnpm lint     # Run ESLint
```

## License

MIT License - see LICENSE file for details

---

**Built by:** DAC Architects  
**Powered by:** Next.js, React, WordPress, TypeScript  
**Design:** Custom architecture-focused design system
