# Yadgaar Caterers

Premium wedding & event catering website built with Next.js. Located in Boisar, offering veg & non-veg catering, live food counters, and full-event coordination.

## Tech Stack

- **Framework:** Next.js 15 (App Router), React 19, TypeScript
- **UI:** Tailwind CSS 4, Radix UI, shadcn/ui, Framer Motion
- **Validation:** React Hook Form + Zod (shared schema on client and server)
- **Media:** `next/image` optimization with Unsplash as the only remote image host

## Getting Started

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run typecheck` | TypeScript check |

There is no ESLint configuration in this project; `typecheck` and `next build` are the available static checks.

## Environment Variables

Copy `.env.example` to `.env.local`. Never commit `.env*` files containing real values.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical production origin used in metadata, canonical URLs, sitemap and robots.txt. Replace `https://example.com` before launch. |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID (public). Defaults to the supplied `GTM-T68P9QZR`. The container script is injected exactly once from the root layout after Analytics consent; configure GA4 and any other tags inside GTM to avoid duplicate Google tags. |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Fallback GA4 measurement ID used only when the GTM ID is empty. Public by design. |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key (public). Leave blank to use only the honeypot and in-memory rate limit. |
| `TURNSTILE_SECRET_KEY` | Server-only Turnstile secret. Verification is performed in `src/app/api/enquiry/route.ts`. |
| `NEXT_DEV_ORIGINS` | Comma-separated origins allowed by the dev server when using a preview proxy. |
| `PORT` | Port for `npm run dev` / `npm run start`. |

## Primary Conversion Action

The single primary CTA is **Book Catering**. It appears in the hero and navigation and scrolls to the enquiry form. The form validates input on the client and server, then opens WhatsApp with a prefilled message that the visitor chooses to send. Call and WhatsApp buttons are retained as clearly secondary contact options.

## Security and Privacy Notes

- Security headers (HSTS in production, CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are configured in `next.config.ts`.
- A production-only middleware redirects forwarded HTTP requests to HTTPS. Confirm this behavior with your hosting provider; a provider-level redirect is still recommended.
- The enquiry API validates fields with Zod, silently rejects honeypot submissions, applies a 5-requests-per-10-minutes in-memory rate limit per IP, and verifies Turnstile when a secret is configured. In-memory state is per server instance and resets on restart.
- Consent is stored in browser `localStorage` under `yadgaar-cookie-consent`. Analytics and marketing tags are not loaded before consent.
- The Privacy Policy and Terms & Conditions contain clearly marked `PLACEHOLDER` text. Complete and have them reviewed by a qualified legal professional before publication.

## Manual Actions Before Launch

1. Set `NEXT_PUBLIC_SITE_URL` to the production domain (no trailing slash).
2. Verify the supplied GTM container (`GTM-T68P9QZR`) in Tag Manager, add/configure the GA4 tag there, and confirm `page_view`, `cta_click` and `form_submit` events in GA4. Analytics loads only after consent.
3. Create Cloudflare Turnstile site/secret keys for the widget and server verification if stronger spam protection is required.
4. Replace all `PLACEHOLDER` text in legal pages and `siteConfig` (business email, legal entity, retention, cancellation and payment terms).
5. Confirm HTTPS/DNS settings and HSTS `preload` suitability with the hosting provider.
6. Review the generated `public/og-image.jpg` and icons against final branding.
