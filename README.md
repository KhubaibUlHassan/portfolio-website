# Khubaib Ul Hassan — Elite Portfolio

Dark, studio-style portfolio for an **AI Engineer, SQA Specialist & Technical Product Manager**.
Built with Vite + React + TypeScript + Tailwind CSS v4 + GSAP and deployed on **Cloudflare Pages**.

**Live:** https://khubaibulhassan.pages.dev

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (`@tailwindcss/vite`)
- GSAP (`ScrollTrigger`, `ScrollSmoother`)
- Cloudflare Pages Function for the AI assistant (`functions/api/assistant.js`)
- Gemini API through a server-side proxy

## Local Development

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Environment & Secrets

The AI endpoint reads **server-side only** variables. Never prefix these with `VITE_`, never import them into client code, and never commit real values.

```bash
cp .env.example .dev.vars
```

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API key (server only) |
| `ALLOWED_ORIGIN` | Allowed origin for the AI endpoint |

Set these in **Cloudflare Pages → Settings → Environment variables** as encrypted secrets. Locally, keep them in `.env.local` (gitignored).

## Security Model

- **No secrets in the client bundle.** The browser only calls `/api/assistant` on the same origin.
- **Server-side validation, rate limiting, and message-size caps** for the AI endpoint.
- **CORS allowlist** via `ALLOWED_ORIGIN`; same-origin requests work by default.
- **Security headers** in `public/_headers`: CSP, HSTS, `X-Frame-Options: DENY`, `nosniff`, Permissions Policy, COOP/CORP.
- **Transport encryption** is enforced by Cloudflare TLS; environment secrets are encrypted at rest by Cloudflare.

### Before deploying

1. Rotate any key that has ever been pasted into a chat, file, or commit.
2. Confirm `.env`, `.env.*`, `.dev.vars`, and `.wrangler/` are not tracked (`git status`).
3. Set `ALLOWED_ORIGIN` to the production domain.

## Cloudflare Pages Deployment

Direct deployment:

```bash
npm run build
npx wrangler pages deploy dist --project-name=khubaibulhassan
```

Or connect the repository in Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22.12.0` or newer

Pages automatically builds `functions/` into edge routes. The contact section uses direct email, LinkedIn, and GitHub links; there is no email-sending backend.

Local full-stack test of the function:

```bash
npm run build
npx wrangler pages dev dist --compatibility-date=2026-01-01
```

## Content

All dynamic content lives in `src/data/`:

- `projects.json` — project and case-study grid
- `certifications.json` — certification cards
- `skills.json` — SQA / PM / engineering matrix
- `audit-logs.json` — reference audit entries

Add or edit JSON; no component changes required.

## Assets

- `public/assets/khubaib-portrait.png` — transparent portrait cutout used in the hero
- `public/assets/brand-mark.png` — transparent "K" monogram used in the hero badge
- `design/brand-k.png` — full-resolution source for the brand mark
- `public/favicon-*`, `public/apple-touch-icon.png`, `public/site.webmanifest` — browser and PWA icons
- `public/Khubaib_SQA_CV.pdf` — current CV
- `src/components/ContactSection.jsx` — email, LinkedIn, GitHub, and resume links
