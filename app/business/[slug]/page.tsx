import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BusinessDetailClient from '@/components/business-detail-client'
import SeedBusinessDetail from '@/components/seed-business-detail'
import { SEED_BUSINESSES, getSeedBusiness } from '@/lib/seed-businesses'
import type { SeedBusiness } from '@/lib/seed-businesses'
import { fetchBusinessBySlug } from '@/lib/public-listings'
import { isReleased, releaseDateLabel } from '@/lib/release'
import { detailTitle, fitMetaDescription } from '@/lib/seo-content'

// Business detail route — two kinds of listings:
// 1. SEED listings (lib/seed-businesses.ts): directory-created pages for
//    real businesses. They are listed in generateStaticParams, so
//    they are prerendered to fully static HTML at build time — zero
//    Firestore reads and no ISR (this file sets no `revalidate` for
//    them; the revalidate below covers Firestore listings only).
// 2. FIRESTORE listings (owner-added via the dashboard): any other slug
//    is fetched HERE, on the server, and handed to the client island
//    as props: the profile renders into the initial HTML and the
//    browser makes no Firestore read for it. Only the interactive
//    parts (reviews) still run client-side.
//
//    Note the public URL now reflects PUBLIC visibility only: the
//    server reads anonymously, so a Firestore listing appears here
//    exactly when a visitor could see it — status 'approved' and past
//    its weekly release boundary. Owners manage pending listings from
//    their dashboard; admins from the admin panel. Missing and
//    non-approved slugs are a real 404 (notFound), not a soft-404
//    page at HTTP 200; approved-but-unreleased slugs keep their
//    deliberate release-date state.

export const dynamicParams = true

// A newly approved/released listing should appear without a rebuild.
export const revalidate = 63072000

export function generateStaticParams() {
  return SEED_BUSINESSES.map((b) => ({ slug: b.slug }))
}

/** One anonymous read per request, shared by metadata + page. Approved only. */
const loadBusiness = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchBusinessBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  return { id: found.id, ...found.data }
})

/**
 * Title guard (owner's spec: 50-60 chars, hard cap 60) — see
 * detailTitle in lib/seo-content.ts. The full form is used when
 * it fits; otherwise the category is dropped, then honest
 * extenders are tried; only very long names are truncated, at a
 * word boundary with an ellipsis, and the city is never dropped.
 * Phone-less listings never get a phone-implying extender.
 */
function businessTitle(name: string, category: string | undefined, city: string | undefined, hasPhone: boolean): string {
  return detailTitle(name, category, city, hasPhone)
}

// Tails for topping up a short Firestore description (150-160).
// All state what the profile shows — contact details, address,
// hours, services — never a fact about the business itself.
const DESCRIPTION_TAILS = [
  ' Find contact details and more on PakListings.',
  ' Browse similar options to compare and choose the right one.',
  ' See its PakListings profile for more details.',
  ' Call or message the business directly from its profile.',
  ' Check its address, hours and services on PakListings.',
  ' Compare similar options nearby before you decide.',
  ' See more on its PakListings profile.',
  ' More on its PakListings profile.',
  ' More on PakListings.',
  ' Call now.',
]

/**
 * Description (150-160 chars) from a Firestore business's own
 * description. Longer descriptions are word-boundary truncated;
 * shorter ones are topped up with the tails above. A description
 * under 50 chars is treated as missing and replaced with a
 * factual name + category + city sentence — never invented detail.
 */
function firestoreMetaDescription(business: any): string {
  const raw = (business.description || '').replace(/\s+/g, ' ').trim()
  const categoryLabel = business.category || business.mainCategory || 'Business'
  const text = raw.length >= 50
    ? raw
    : `${business.name} is a ${categoryLabel} business in ${business.city || 'Pakistan'}.`
  return fitMetaDescription(text, DESCRIPTION_TAILS)
}

// Clause pools for topping up a short seed description (150-160).
// Phone seeds may reference calling the number listed here;
// phone-less seeds never claim contact details exist.
const SEED_PHONE_CLAUSES = [
  ' Call the number listed here for services, timings and availability — the profile also lists its address and opening hours.',
  ' Call the number listed here to check services, timings and availability before you visit.',
  ' Call the number listed here to check services and availability.',
  ' Call the number listed here to check availability.',
  ' The profile also lists its address and opening hours.',
  ' Compare similar options in this city before you decide.',
  ' Call the number listed here.',
  ' The profile also lists its address.',
  ' See its address and opening hours.',
]

const SEED_NOPHONE_CLAUSES = [
  ' The profile lists its address, opening hours and services — browse more options in this city and category to compare.',
  ' Browse more options in this city and category to compare choices, check what suits you, and find the right fit.',
  ' Browse more options in this city and category to compare and choose.',
  ' The profile lists its address, opening hours and services.',
  ' Compare similar options in this city before you decide.',
  ' Browse more options in this city to compare.',
  ' See its address and opening hours.',
  ' Its address and hours are listed.',
  ' Compare similar options nearby.',
]

/**
 * Seed description (150-160 chars) built ONLY from the seed's
 * own attributes: name, city, category and phone presence.
 * A single clause is tried first, then a pair, so every seed
 * lands in range whatever its name length.
 */
function seedMetaDescription(seed: SeedBusiness): string {
  const base = `Find ${seed.name} in ${seed.city} — ${seed.category} on PakListings.`
  return fitMetaDescription(base, seed.phone ? SEED_PHONE_CLAUSES : SEED_NOPHONE_CLAUSES)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (seed) {
    const title = businessTitle(seed.name, seed.category, seed.city, !!seed.phone)
    const description = seedMetaDescription(seed)
    const canonical = `https://www.paklistings.com/business/${seed.slug}/`
    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: 'PakListings',
        locale: 'en_PK',
        type: 'website',
      },
      twitter: {
        card: 'summary',
        title,
        description,
      },
    }
  }

  const business = await loadBusiness(slug)
  if (!business) {
    // The page calls notFound(); noindex keeps this slug out of the
    // index instead of inheriting the homepage meta.
    return { robots: { index: false, follow: false } }
  }
  const canonical = `https://www.paklistings.com/business/${slug}/`
  const title = businessTitle(business.name, business.category || business.mainCategory, business.city, !!business.phone)
  if (!isReleased(business.approvedAt, Date.now())) {
    // Approved but not yet released: an honest title only, no
    // description (the profile itself is still hidden) and noindex.
    return { title, robots: { index: false, follow: false } }
  }
  const description = firestoreMetaDescription(business)
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'PakListings',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const seed = getSeedBusiness(slug)
  if (seed) {
    return <SeedBusinessDetail business={seed} />
  }

  const business = await loadBusiness(slug)
  if (!business) notFound()

  let initialBusiness: any = null
  let initialUnreleased: { name: string; releaseLabel: string } | null = null
  // Weekly batch release (lib/release.ts): an approved business
  // stays hidden until the next 7-day cycle boundary passes. This
  // state is intentional release-cycle UX, NOT a soft-404.
  if (!isReleased(business.approvedAt, Date.now())) {
    initialUnreleased = {
      name: business.name || 'This business',
      releaseLabel: releaseDateLabel(Date.now()),
    }
  } else {
    initialBusiness = business
  }
  return (
    <BusinessDetailClient
      slug={slug}
      initialBusiness={initialBusiness}
      initialUnreleased={initialUnreleased}
    />
  )
}
