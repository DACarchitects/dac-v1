# DAC Architects Website

The DAC Architects frontend uses Next.js 16.1.1, React 19.1, TypeScript, and a headless WordPress CMS. Styling uses Tailwind CSS v4 with shadcn/ui and Radix UI components.

The configured public site is **https://dacarchdesign.com**. WordPress content and media are hosted at **https://dacarch.com**. The public domain is configured in `site.config.ts` separately from the WordPress environment variables.

## Current features

- Full-screen video hero with a poster image, parallax scrolling, and project/contact calls to action.
- Homepage sections for services, about, curated featured projects, and contact information.
- WordPress project archive with category filtering, search, and server-side pagination (nine projects per page).
- Project detail pages with featured images, custom headings, content, and image galleries with an enlarged-image dialog and previous/next controls.
- Project navigation for residential, multifamily, commercial, development, and feasibility studies.
- WordPress pages and blog archives, including author, category, and tag directories.
- EmailJS contact forms on the homepage and `/contact`.
- Canonical URLs, Open Graph and Twitter cards, generated social images, and business structured data.
- WordPress cache revalidation, Vercel Analytics, and optional Google Analytics.
- Responsive navigation and a theme provider that defaults to dark mode.

The testimonials component and data remain in the repository, but the homepage testimonials section is currently commented out.

## Local setup

Use Node.js **20.9 or later** (the installed Next.js package's minimum) and pnpm. A WordPress site with its REST API enabled is required for CMS content.

```bash
pnpm install --frozen-lockfile
cp .env.example .env.local
# Edit .env.local using the configuration below.
pnpm dev
```

Open `http://localhost:3000`.

### Environment variables

Use your own values in `.env.local`. Use a WordPress URL without a trailing slash and a hostname without a protocol, path, or trailing slash. Replace the example webhook secret with a newly generated value.

```dotenv
# WordPress REST API and image optimization
WORDPRESS_URL="https://dacarch.com"
WORDPRESS_HOSTNAME="dacarch.com"

# Must match the WordPress revalidation plugin settings
WORDPRESS_WEBHOOK_SECRET="replace-with-a-generated-secret"

# Used for WordPress preconnect / DNS prefetch links
NEXT_PUBLIC_WORDPRESS_URL="https://dacarch.com"

# Required for contact form delivery
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="your-emailjs-public-key"
NEXT_PUBLIC_EMAILJS_SERVICE_ID="your-emailjs-service-id"
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="your-emailjs-template-id"

# Optional Google Analytics measurement ID
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=""
```

Generate a webhook secret with `openssl rand -base64 32`. Keep local environment files out of version control. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; the webhook secret must remain server-side.

The checked-in `.env.example` does not include the EmailJS or Google Analytics variables. Its `NEXT_PUBLIC_WORDPRESS_HOSTNAME` variable is not currently read by the application.

Configure the EmailJS template to use the form fields `firstName`, `lastName`, `email`, `phone`, and `message`. Contact delivery requires all three EmailJS variables above.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage with video hero, featured projects, and contact form |
| `/projects` | Project archive; accepts `category`, `search`, and `page` query parameters |
| `/projects/[slug]` | WordPress project detail and gallery |
| `/contact` | Contact form and firm contact details |
| `/[slug]` | Top-level WordPress page, such as `/feasibility-studies` |
| `/pages` and `/pages/[slug]` | WordPress page directory and detail pages |
| `/posts` and `/posts/[slug]` | Blog archive and individual posts |
| `/posts/authors`, `/posts/categories`, `/posts/tags` | Blog directories |
| `/admin` | Redirect to WordPress admin when `WORDPRESS_URL` is configured |
| `/api/og` | Generated social image using `title` and `description` query parameters |
| `/api/revalidate` | POST endpoint for WordPress cache invalidation |
| `/sitemap.xml` | Sitemap generated from the configured domain and WordPress posts |

For example, `/projects?category=single-family-residential` shows the corresponding project category. Category values are WordPress category slugs.

## WordPress integration

`lib/wordpress.ts` handles REST API requests, pagination, cache tags, and content lookup. Requests use a 60-second cache revalidation interval. Many content helpers return empty results when WordPress is unavailable; empty archives can therefore indicate a connection or CMS configuration problem.

### Project content

The CMS must expose a `projects` post type at `/wp-json/wp/v2/projects`, with standard WordPress categories and embedded featured media. Project detail pages expect a `meta` object containing:

| Field | Purpose |
| --- | --- |
| `heading_one` | Optional primary content heading |
| `heading_two` | Optional secondary content heading |
| `project_images` | Array of WordPress media IDs, displayed in the supplied order |

The frontend fetches gallery images from `/wp-json/wp/v2/media`. Configure the project post type and metadata exposure in WordPress; the included revalidation plugin handles cache notifications.

Homepage featured projects are curated directly in `components/layout/projects.tsx`; they are not automatically selected from the project archive.

### Cache revalidation

1. Install `plugin/next-revalidate.zip`, or copy `plugin/next-revalidate/` into WordPress's `wp-content/plugins/` directory.
2. Activate the plugin and open **Settings → Next.js Revalidation**.
3. Set the Next.js site URL and the same secret used for `WORDPRESS_WEBHOOK_SECRET`.
4. Save the settings and test the connection.

The endpoint accepts authenticated webhook notifications. Content notifications expire the shared `wordpress` cache tag, relevant content tags, and the root layout. An authenticated request without `contentType` is a connection check and does not invalidate cached content.

## Metadata and analytics

- `site.config.ts` defines the public domain, site description, keywords, social handles, and default sharing image.
- `app/layout.tsx` sets the title template, default canonical URL, Open Graph/Twitter metadata, and `ProfessionalService` JSON-LD.
- `lib/metadata.ts` generates content metadata and canonical URLs, supports explicit archive URLs, and strips HTML/decodes entities for descriptions.
- Project archive metadata reflects the selected category or search query. Top-level WordPress pages use their root-level canonical URL.
- `app/api/og/route.tsx` generates content sharing images. The repository also includes `app/twitter-image.jpeg` as a file-based Twitter image.
- Vercel Analytics is included in the root layout. Google Analytics loads when `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` is set.

The current sitemap includes the homepage, blog/page directories, and individual posts. It does **not** yet enumerate projects, individual WordPress pages, or `/contact`. `app/robots.txt` allows crawling.

## Project structure

```text
app/
  page.tsx                 Homepage
  layout.tsx               Shared layout, metadata, analytics, structured data
  globals.css              Global styles and theme variables
  data.jsx                 Contact details and testimonials
  [slug]/                  Top-level WordPress pages
  projects/                Project archive and detail routes
  contact/                 Contact page
  pages/                   WordPress page directory and detail routes
  posts/                   Blog posts and taxonomy/author directories
  api/og/                  Social image generation
  api/revalidate/          WordPress webhook handler
  sitemap.ts               Sitemap generation
components/
  layout/                  Navigation, footer, and homepage sections
  projects/                Project cards, filters, search, and gallery
  posts/                   Blog cards, filters, and search
  theme/                   Theme provider and toggle
  ui/                      Shared UI primitives
  heroVideo.tsx            Active homepage video hero
  contactForm.tsx          EmailJS contact form
lib/
  wordpress.ts             WordPress REST API helpers
  wordpress.d.ts           WordPress content types
  metadata.ts              Metadata and HTML text helpers
  types.ts                 Shared types
  utils.ts                 Styling utilities
plugin/                    Installable WordPress revalidation plugin
wordpress/                 WordPress Docker setup, theme, and bundled plugin
public/                    Static assets
site.config.ts             Site identity and public domain
menu.config.ts             Navigation links and project categories
next.config.ts             Image hosts, admin redirect, standalone output
Dockerfile                 Multi-stage frontend container build
railway.json / railway.toml Railway deployment configuration
```

## Customization

| Change | Location |
| --- | --- |
| Site identity, public domain, social handles, default sharing image | `site.config.ts` |
| Navigation and project category links | `menu.config.ts` |
| Homepage section order and testimonials visibility | `app/page.tsx` |
| Hero video, poster, headline, and buttons | `components/heroVideo.tsx` |
| Featured homepage projects | `components/layout/projects.tsx` |
| Contact details | `app/data.jsx` |
| Business address and structured data | `app/layout.tsx` |
| Colors and global styling | `app/globals.css` |
| Allowed remote image hosts | `next.config.ts` |

Some media URLs are hard-coded to `dacarch.com` in components. Changing the WordPress environment variables alone does not replace those assets.

## Scripts and validation

| Command | Current behavior |
| --- | --- |
| `pnpm dev` | Start the development server with Turbopack |
| `pnpm build` | Create the production build |
| `pnpm start` | Start the production server after building |
| `pnpm lint` | Currently points to `next lint`, which is unavailable in the installed Next.js 16 CLI |

The lint script needs an ESLint configuration/script update before it can serve as a working check. No automated test script is configured in `package.json`.

## Deployment

For a hosted Next.js deployment, configure the environment variables above before building. WordPress must be reachable for content fetched during build and runtime. Set `site.config.ts` to the intended public domain so canonical URLs and sharing metadata use the correct host.

The application uses `output: "standalone"`. The root Dockerfile builds with Node 20 Alpine and runs the generated `server.js`. Railway configuration files are included, and `wordpress/` contains a separate WordPress container setup.

The frontend Dockerfile currently declares build arguments only for `WORDPRESS_URL` and `WORDPRESS_HOSTNAME`. For container deployments using EmailJS or Google Analytics, ensure the required `NEXT_PUBLIC_*` variables are available during the build; passing them only to the running container will not configure the browser bundle. Supply `WORDPRESS_WEBHOOK_SECRET` to the running server.

## License and origins

The application is based on the Next WP starter by 9d8. See [LICENSE](LICENSE) for the application's MIT license. The bundled WordPress revalidation plugin declares GPLv2 or later in [its README](plugin/next-revalidate/README.txt).
