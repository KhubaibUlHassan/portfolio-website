# Portfolio Project State

Last updated: 2026-10-31
Working directory: `/home/khubaib/portfolio-elite`

## Live URLs

- Production: https://khubaibulhassan.pages.dev
- Latest deployment: https://d4841f98.khubaibulhassan.pages.dev
- Repository: https://github.com/KhubaibUlHassan/portfolio-website
- Branch: `main`
- Cloudflare Pages project: `khubaibulhassan`
- Cloudflare account: `hassanisrar9448@gmail.com`

## Current State

- GitHub `main` has a clean history after the V1 purge.
- Current head: run `git log -1 --oneline`.
- No V1 portfolio files or old Vercel deployment configs remain in the repository.
- The portfolio is deployed directly with Wrangler, not through a Cloudflare Git integration.
- The old Vercel deployment is still live at `https://khubaibulhassan.vercel.app/` and must be deleted from the Vercel dashboard.
- Contact form and Resend integration were removed. Contact is now direct email, LinkedIn, GitHub, and resume links.
- Full light/dark theme system, tokenized accent colors, and self-hosted Inter + Space Grotesk are live.
- The hero portrait uses a framed studio panel with a theme-aware backdrop, grid, accent glow, brand badge, and a floating credential pill.
- The latest CV (`Khubaib_SQA_CV.pdf`) is linked from the navbar, hero, contact section, and footer.
- Browser branding uses a generated cyan "K" monogram: favicon set, apple touch icon, and web manifest.
- Experience copy and the featured project are aligned to the CV (Arid Web Portal, Cloud Wave Innovations).

## Commands

Install and run locally:

```bash
cd /home/khubaib/portfolio-elite
npm install
npm run dev
```

Build, lint, and preview:

```bash
npm run lint
npm run build
npm run preview
```

Deploy production:

```bash
cd /home/khubaib/portfolio-elite
npm run build
npx wrangler pages deploy dist --project-name=khubaibulhassan --branch=main
```

Save and push changes:

```bash
cd /home/khubaib/portfolio-elite
git add -A
git commit -m "your message"
git push origin main
```

Local Node version: `v24.22.1`. Vite requires `^20.19.0 || >=22.12.0`.

## Local Environment

- `.env.local` contains the local server-side `GEMINI_API_KEY`.
- `.env.local` is gitignored and must never be committed.
- Example variables are documented in `.env.example`.

Production secrets in Cloudflare Pages:

- `GEMINI_API_KEY` — server-side Gemini key
- `ALLOWED_ORIGIN=https://khubaibulhassan.pages.dev`

There is no Resend key or inquiry-email configuration.

## Architecture

- `src/App.tsx` mounts all page sections and GSAP ScrollSmoother.
- `src/main.tsx` imports self-hosted font packages and applies the saved theme before render.
- `src/index.css` — light/dark design tokens, self-hosted fonts, and component styles.
- `src/components/ThemeToggle.jsx` + `src/hooks/useTheme.js` — persisted light/dark switch.
- `src/components/AiAssistant.jsx` — floating AI concierge UI.
- `functions/api/assistant.js` — production Cloudflare Function.
- `shared/gemini-concierge.js` — prompt, validation, model fallback, request handling.
- `vite.config.ts` — local `/api/assistant` proxy for development.
- `src/data/projects.json` — one featured project: Arid Web Portal Security & Functional Audit.
- `src/data/certifications.json` — 6 credentials, rendered as a pinned horizontal scroll track on desktop.
- `src/components/ContactSection.jsx` — direct email/LinkedIn/GitHub/resume contact.
- `src/components/ContactBar.jsx` — footer links, copy email, and back-to-top.
- `public/_headers` — CSP and security headers.

## Brand & Resume Assets

- `design/brand-k.png` — full-resolution source mark generated with Agnes (not served).
- `public/assets/brand-mark.png` — 256px transparent monogram used in the hero badge.
- `public/favicon.ico`, `public/favicon-32.png`, `public/favicon-192.png`, `public/favicon-512.png`, `public/apple-touch-icon.png` — browser/OS icons.
- `public/site.webmanifest` — PWA icon and theme metadata.
- `public/Khubaib_SQA_CV.pdf` — current CV served from every resume link.
- `public/assets/khubaib-portrait.png` — transparent hero portrait.

## Content Notes

- Google certificates currently use `2026` as the completion date and link to the LinkedIn certifications section.
- Replace those dates and links with direct credential URLs when available.
- The contact email shown on the site is `hassanisrar9448@gmail.com`.
- The AI model order is defined in `shared/gemini-concierge.js`; `gemini-2.5-flash` falls back to newer Flash models when needed.

## Remaining Tasks

1. Delete the old Vercel project from the Vercel dashboard.
2. Rotate the Gemini API key that was previously shared in chat, then update the Cloudflare secret and local `.env.local`.
3. Optional: connect the GitHub repository to Cloudflare Pages for automatic deployments on push.
4. Optional: add direct Google credential URLs and exact completion dates.

## Security Reminders

- Never commit `.env.local`, `.env.*`, `.dev.vars`, or `.wrangler/`.
- Never prefix server secrets with `VITE_`; Vite exposes those in the client bundle.
- Set secrets in Cloudflare Pages → Settings → Variables and Secrets.
