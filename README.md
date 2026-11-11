# PakListings — Pakistan Business Directory

PakListings is Pakistan's business directory: find and list businesses across
183 cities and 24 categories. Live domain: https://www.paklistings.com

## Stack

Next.js (App Router) + TypeScript + Tailwind + Firebase (Firestore, Auth,
Storage).

## Setup (owner steps)

1. Create a Firebase project; paste its web config into `.env.local`
   (see `.env.example`). Publish the Firestore/Storage rules in
   `firestore.rules` / `storage.rules`. Admin access is role-based
   (`users/{uid}.role === 'admin'`); create the owner's admin doc in the
   Firebase Console.
2. Deploy (Vercel): import this repo, set the same env vars, deploy `main`.
3. Point DNS for paklistings.com at the deployment.

## Services: wiring present, accounts NOT carried over

All integrations from the original codebase are intact, but NONE of the
previous brand's credentials, IDs, or keys are in this repo:

- Mail: `app/api/send-mail` + `lib/mail.ts` / `lib/owner-mail.ts` (Brevo).
  The Brevo key comes from Vercel env (`BREVO_API_KEY`) — it was never in
  the repo. Until you set it, mail calls fail silently and no site flow
  breaks.
- Analytics/tags: Google Analytics + Microsoft Clarity tags live in
  `app/layout.tsx` but are env-gated — they render only when
  `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_CLARITY_ID` are set.
- Verification: Google/Bing metas render only when
  `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` /
  `NEXT_PUBLIC_BING_SITE_VERIFICATION` are set.
- IndexNow: `app/api/indexnow` + `lib/indexnow.ts` (key placeholder in code).
- Vercel Analytics + Speed Insights components are mounted in
  `components/client-providers.tsx`.

To activate a service, set its env value (see `.env.example`) — no code
changes needed.

## Brand

PakListings — deep teal #0E7490 (primary), dark cyan #155E75, tint #ECFEFF, accent violet #7C3AED. Fonts: Fraunces (headings) + Inter (body). Logo: teal-gradient pin + violet dot (`public/logo.svg`).
