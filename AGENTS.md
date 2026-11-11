# AGENTS.md — PakListings

Instructions for AI coding agents working in this repository.

## What this is

PakListings (https://www.paklistings.com) — a Pakistan business directory built with Next.js
(App Router, TypeScript, Tailwind CSS) and Firebase (Firestore).
The public site lists businesses, companies, professionals and jobs
across 183 cities and 24 categories.

## Commands

- `npm run dev` — local dev server
- `npm run build` — production build (must pass before any push)
- `npx tsc --noEmit` — typecheck

## Rules

- Never edit `vercel.json` env/build blocks — Vercel dashboard env is
  the single source of truth. Never commit secrets or `.env*` files.
- Never invent business facts, prices, stats, or endpoints. Prices
  live in `lib/tiers.ts`; payment methods in `lib/payment-methods.ts`.
- Keep pushes single and consolidated (Vercel Hobby limits). Never
  delete deployments without the owner's approval.
- Public listing data must not be bulk-extractable: keep owner-private
  fields out of public surfaces.
- The 7-day release cycle is currently paused — admin-approved
  businesses publish immediately. Do not re-enable it without the
  owner's say-so.
- Only the owner UID may ever be admin. Never add a promote-to-admin
  path.

## Key paths

- `app/` — routes (incl. `app/docs/`, `app/find-us/`, `app/sitemap.ts`)
- `lib/` — data, tiers, release logic, public-listings queries
- `public/` — static files (incl. `llms.txt`, `auth.md`, `pricing.md`,
  `index.md`, `.well-known/` agent-discovery files)
- `components/` — shared UI (`navbar`, `footer`)
