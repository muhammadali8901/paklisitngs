import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Building2, MapPin, Phone, ArrowRight } from 'lucide-react'
import { getMergedBusinessCards } from '@/lib/public-listings'
import FeaturedBadge from '@/components/featured-badge'

export const metadata: Metadata = {
  title: 'Businesses in Pakistan – Phone, Hours & Prices | PakListings',
  description: 'Find approved businesses across Pakistan by city and category. Compare phone numbers, WhatsApp, opening hours, services and prices, then ring the one that fits.',
  alternates: {
    canonical: 'https://www.paklistings.com/businesses/',
  },
  openGraph: {
    title: 'Businesses in Pakistan – Phone, Hours & Prices | PakListings',
    description: 'Find approved businesses across Pakistan by city and category. Compare phone numbers, WhatsApp, opening hours, services and prices, then ring the one that fits.',
    url: 'https://www.paklistings.com/businesses/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
}

// SERVER component (Round 3): the approved + released Firestore
// listings are fetched on the server and merged with the static seed
// listings here, so the full grid is part of the initial HTML — real
// LCP content, no layout shift, and NO Firestore list query ever runs
// in a visitor's browser (anti-scrape: the data layer is no longer
// downloadable; only what is rendered on the page is visible).
// ISR keeps the data fresh without a read per visitor; the weekly
// release cycle makes an hourly refresh more than sufficient.
export const revalidate = 604800

export default async function BusinessesPage() {
  const businesses = await getMergedBusinessCards()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Building2 className="w-3.5 h-3.5" />
            <span>Checked &amp; Approved Listings</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Businesses in Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Look up shops, clinics, restaurants and tradespeople by city and category. Every profile
            lists a phone number, WhatsApp, opening hours and prices — check them before you ring.
          </p>
          <p className="text-slate-400 text-xs">
            Know the name already? Find it in the{' '}
            <Link href="/businesses/a-z" prefetch={false} className="font-bold text-cyan-400 hover:text-cyan-300">
              A–Z index
            </Link>
            {' '}instead of searching.
          </p>
          <Link href="/add-business" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md">
            Add Your Business <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {businesses.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Building2 className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-slate-900 text-lg">No businesses listed yet — be the first to add yours</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Create an account and add your business — listings start at PKR 99 one-time and go live
              at the next weekly release once approved.
            </p>
            <Link href="/register" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors">
              Add Your Business <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-h-[480px]">
            {businesses.map((biz) => (
              <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h2>
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

        <section className="mt-14 bg-white rounded-3xl border border-slate-200 p-8" aria-label="How to use this directory">
          <h2 className="font-extrabold text-slate-900 text-xl">How to use this business directory</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Find a business by name</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                If you already know the shop, clinic or firm you want, skip the search and open the{' '}
                <Link href="/businesses/a-z" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">
                  A–Z index
                </Link>
                . It lists every business on PakListings alphabetically, so a phone number is two clicks away.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">What “approved” means</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Every business on this page has been checked by our team before it appears here. New
                listings are reviewed after the owner submits payment proof, and approved listings go
                live together at the next weekly release — never the moment they are submitted.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Compare before you call</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Open two or three profiles side by side and check the phone number, WhatsApp, opening
                hours, services and product prices. A profile with prices and hours filled in tells you
                most of what a first phone call would — including whether the place is open right now.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Where coverage is deepest</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                PakListings covers 183 cities and 24 categories, with the most listings in{' '}
                <Link href="/city/lahore" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">Lahore</Link>,{' '}
                <Link href="/city/karachi" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">Karachi</Link>{' '}
                and{' '}
                <Link href="/city/islamabad" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">Islamabad</Link>.
                Tradespeople — plumbers, electricians, AC technicians, tailors and beauticians — sit
                under{' '}
                <Link href="/category/home-services" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">
                  Home Services &amp; Repairs
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
