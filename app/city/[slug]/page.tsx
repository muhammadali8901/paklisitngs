import React, { cache } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import ListBusinessCta from '@/components/list-business-cta'
import { CITIES, CATEGORIES } from '@/lib/data'
import { CITY_INFO, generateCityContent, CONTACT_DESCRIPTION_TAILS, fitMetaDescription, pickTitleInRange } from '@/lib/seo-content'
import { getCitySeoCopy } from '@/lib/seo-directory-content'
import { BreadcrumbSchema } from '@/components/seo/breadcrumb-schema'
import MarkdownContent from '@/components/seo/markdown-content'
import { getCityCards, getApprovedReviewAverages, getTopRatedCards } from '@/lib/public-listings'
import FeaturedBadge from '@/components/featured-badge'
import { MapPin, Building2, Phone, ArrowRight } from 'lucide-react'

export const revalidate = 604800

// Shared between generateMetadata and the page component so the
// merged city listings are fetched once per render, not twice.
const getCachedCityCards = cache((city: string, citySlug: string) => getCityCards(city, citySlug))
const getCachedReviewAverages = cache(() => getApprovedReviewAverages())

// Title formulas (verified over all 183 cities: every title lands
// 50-60 chars). The chain tries the longest honest form first and
// falls back to shorter ones; the plain form alone is too short
// for small cities and too long for the longest names.
function cityTitle(city: string): string {
  return pickTitleInRange([
    `Businesses in ${city} – Find Phone Numbers | PakListings`,
    `Businesses in ${city} – Directory | PakListings`,
    `${city} Business Directory | PakListings`,
  ])
}

// Top-rated variant, used ONLY when the page actually has a
// top-rated section (real approved reviews) — the title never
// promises a ranking the page does not show.
function cityTitleBest(city: string): string {
  return pickTitleInRange([
    `Best Businesses in ${city} – Rated & Reviewed | PakListings`,
    `Best Businesses in ${city} – Top Rated | PakListings`,
    `Top Rated Businesses in ${city} | PakListings`,
    `Best Businesses in ${city} | PakListings`,
  ])
}

// Description (verified over all 183 cities: every description
// lands 150-160 chars). The tail states what the page offers —
// categories, areas, phone numbers, hours, addresses, direct contact.
function cityDescription(city: string, province: string | undefined): string {
  const prefix = province
    ? `Browse ${city} businesses in ${province} on PakListings`
    : `Browse businesses in ${city}, Pakistan on PakListings`
  return fitMetaDescription(prefix, CONTACT_DESCRIPTION_TAILS)
}

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

function resolveCity(slug: string): string | null {
  return CITIES.find(c => cityToSlug(c) === slug.toLowerCase()) || null
}

export function generateStaticParams() {
  return CITIES.map(city => ({ slug: cityToSlug(city) }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const city = resolveCity(params.slug)
  if (!city) {
    return { title: 'City Not Found | PakListings', robots: { index: false, follow: false } }
  }
  const info = CITY_INFO[city]
  const cards = await getCachedCityCards(city, cityToSlug(city))
  // The "Best businesses in {city}" title is used ONLY when the page
  // actually has a top-rated section (real approved reviews);
  // otherwise the existing title stays, so the title never promises
  // a ranking the page does not show.
  const averages = await getCachedReviewAverages()
  const topRated = getTopRatedCards(cards, averages)
  const title = topRated.length > 0 ? cityTitleBest(city) : cityTitle(city)
  const description = cityDescription(city, info?.province)
  const canonical = `https://www.paklistings.com/city/${cityToSlug(city)}/`
  return {
    title,
    description,
    ...(cards.length === 0 ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical },
    openGraph: { title, description, url: canonical, siteName: 'PakListings', locale: 'en_PK', type: 'website' },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export default async function CityPage(props: {
  params: Promise<{ slug: string }>
}) {
  const params = await props.params
  const city = resolveCity(params.slug)
  if (!city) notFound()

  const slug = cityToSlug(city)
  const listings = await getCachedCityCards(city, slug)
  const averages = await getCachedReviewAverages()
  const topRated = getTopRatedCards(listings, averages)
  const info = CITY_INFO[city]
  const copy = getCitySeoCopy(slug)
  const guide = generateCityContent(city)
  const otherCities = CITIES.filter(c => c !== city).slice(0, 12)
  const provinceCities = info?.province
    ? CITIES.filter(c => c !== city && CITY_INFO[c]?.province === info.province).slice(0, 8)
    : []

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <BreadcrumbSchema pathname={`/city/${slug}`} />

      <main id="main-content" className="flex-1">
        {/* Hero */}
        <section className="bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">
              <MapPin className="w-3.5 h-3.5" />
              {info ? `${info.province}, Pakistan` : 'Pakistan'}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Businesses in <span className="text-cyan-400">{city}</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              {copy?.intro || (info
                ? `${city} is ${info.description}. Use this guide to explore the city's main business sectors and browse services by category.`
                : `Explore the main business sectors of ${city} and browse local services by category on PakListings.`)}
            </p>
            {info?.districts && (
              <p className="text-xs text-slate-400">
                Popular areas:{' '}
                {info.districts.map((district, i) => (
                  <span key={district}>
                    {i > 0 && ' · '}
                    <Link href={`/city/${slug}/area/${slugify(district)}`} className="hover:text-cyan-300 font-semibold">
                      {district}
                    </Link>
                  </span>
                ))}
              </p>
            )}
          </div>
        </section>

        {/* Top rated in this city — rendered ONLY when real approved
            reviews exist; averages come from approved reviews, never invented. */}
        {topRated.length > 0 && (
          <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Top rated in {city}
            </h2>
            <p className="text-sm text-slate-500">
              The highest-rated {city} businesses on PakListings, ranked by their approved customer reviews.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {topRated.map(biz => (
                <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h3>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {biz.featured && <FeaturedBadge />}
                      <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[11px] font-bold">
                        ★ {biz.avgRating.toFixed(1)} · {biz.reviewCount} review{biz.reviewCount === 1 ? '' : 's'}
                      </span>
                    </span>
                  </div>
                  {biz.city && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-700" /> {biz.city}
                    </p>
                  )}
                  {biz.phone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-cyan-700" /> {biz.phone}
                    </p>
                  )}
                  {biz.description && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{biz.description}</p>
                  )}
                  <Link
                    href={`/business/${biz.slug}`}
                    prefetch={false}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:text-cyan-800"
                  >
                    View Business <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Categories in this city */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Browse Categories in {city}
            </h2>
            <Link href="/categories" className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 shrink-0">
              <span>All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => {
              const count = listings.filter(biz => biz.category === cat.name || slugify(biz.category) === cat.id || slugify(biz.category) === slugify(cat.name)).length
              return (
                <Link
                  key={cat.id}
                  href={`/city/${slug}/${cat.id}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-cyan-500 hover:shadow-md transition-all group"
                >
                  <Building2 className="w-6 h-6 text-cyan-700 mb-2" />
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-cyan-700">{cat.name} in {city}</h3>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{cat.desc}</p>
                  <p className="text-[11px] font-bold text-cyan-800 mt-2">
                    {count === 0 ? 'No listings yet' : count === 1 ? '1 listing' : `${count} listings`}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        {/* Businesses in this city */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Businesses in {city}
          </h2>
          {listings.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center space-y-4">
              <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="font-extrabold text-slate-900 text-lg">
                No businesses listed in {city} yet — be the first
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                This page is ready for its first {city} listing. If you run a business here,
                add it for a one-time fee from PKR 99 and, once approved, your profile will appear here at the next weekly release.
              </p>
              <Link
                href="/add-business"
                prefetch={false}
                className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors"
              >
                Add Your Business <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {listings.map(biz => (
                <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h3>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {biz.featured && <FeaturedBadge />}
                      <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[11px] font-bold">
                        {biz.category}
                      </span>
                    </span>
                  </div>
                  {biz.city && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-700" /> {biz.city}
                    </p>
                  )}
                  {biz.phone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-cyan-700" /> {biz.phone}
                    </p>
                  )}
                  {biz.description && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{biz.description}</p>
                  )}
                  <Link
                    href={`/business/${biz.slug}`}
                    prefetch={false}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:text-cyan-800"
                  >
                    View Business <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* City guide */}
        <section className="bg-white py-14 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-4xl mx-auto">
            <MarkdownContent content={guide} />
            {copy?.guidance && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mt-6">{copy.guidance}</p>
            )}
          </div>
        </section>

        {/* Other cities */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Explore Other Cities</h2>
          <div className="flex flex-wrap gap-2.5">
            {otherCities.map(c => (
              <Link
                key={c}
                href={`/city/${cityToSlug(c)}`}
                className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-cyan-500 text-xs font-medium"
              >
                Businesses in {c}
              </Link>
            ))}
            <Link href="/cities" className="px-3.5 py-2 bg-cyan-700 text-white rounded-xl hover:bg-cyan-800 text-xs font-bold">
              View All Cities
            </Link>
          </div>
          {provinceCities.length > 0 && info && (
            <div className="space-y-3 pt-2">
              <h3 className="font-bold text-slate-900 text-sm">More Cities in {info.province}</h3>
              <div className="flex flex-wrap gap-2.5">
                {provinceCities.map(c => (
                  <Link
                    key={c}
                    href={`/city/${cityToSlug(c)}`}
                    className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl hover:border-cyan-500 text-xs font-medium"
                  >
                    Businesses in {c}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <OwnerCtaBand
          title={`Run a business in ${city}? Get listed.`}
          text={`Join the ${city} directory: create an account, complete the eight-step form, and once approved, your profile appears at the next weekly release — then on this page, in your category and in search. Listing costs a one-time fee from PKR 99.`}
          links={[
            { label: `All businesses in ${city}`, href: '/businesses' },
            { label: 'Browse categories', href: '/categories' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'All cities', href: '/cities' },
          ]}
        />
      </main>

      <Footer />
      <ListBusinessCta />
    </div>
  )
}
