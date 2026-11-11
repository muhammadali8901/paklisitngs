import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Factory, MapPin, Phone, ArrowRight } from 'lucide-react'
import { getApprovedCompanyCards } from '@/lib/public-listings'
import FeaturedBadge from '@/components/featured-badge'

export const metadata: Metadata = {
  title: 'List of Companies in Pakistan – Suppliers & Exporters',
  description: 'Find approved companies in Pakistan — manufacturers, suppliers and exporters by industry and city. Check what each firm offers, then ask for a quote directly.',
  alternates: {
    canonical: 'https://www.paklistings.com/companies/',
  },
  openGraph: {
    title: 'List of Companies in Pakistan – Suppliers & Exporters',
    description: 'Find approved companies in Pakistan — manufacturers, suppliers and exporters by industry and city. Check what each firm offers, then ask for a quote directly.',
    url: 'https://www.paklistings.com/companies/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
}

// SERVER component (Round 3 parity with /businesses): the approved
// Firestore companies are fetched on the server, so the full grid is
// part of the initial HTML — real LCP content, no layout shift, and NO
// Firestore list query ever runs in a visitor's browser (anti-scrape:
// the data layer is no longer downloadable; only what is rendered on
// the page is visible). Companies have no weekly release cycle —
// approved companies are public immediately, as before.
// ISR keeps the data fresh without a read per visitor.
export const revalidate = 604800

export default async function CompaniesPage() {
  const companies = await getApprovedCompanyCards()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Factory className="w-3.5 h-3.5" />
            <span>Approved Companies</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Companies in Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Find a manufacturer, supplier or exporter by industry and city. Each profile says what the
            firm makes or supplies, where it is based, and how to reach it for a quote.
          </p>
          <Link href="/add-company" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md">
            Add Your Company <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <p className="text-sm text-slate-500 max-w-3xl mb-8">
          Buying in bulk, sourcing a product or looking for a trade partner? Start with the industry
          and city, open the profiles that match, and contact the firm directly — the phone number and
          email on each profile go straight to the company, not through an agent. Firms in the
          manufacturing sector are also listed under{' '}
          <Link href="/category/manufacturing" className="font-bold text-cyan-700 hover:text-cyan-800">
            Manufacturing &amp; Industrial
          </Link>
          .
        </p>
        {companies.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Factory className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-slate-900 text-lg">No companies listed yet — be the first to add yours</h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Create an account and add your company profile — listings start at PKR 99 one-time.
            </p>
            <Link href="/register" prefetch={false} className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors">
              Add Your Company <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {companies.map((company) => (
              <article key={company.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-extrabold text-slate-900 leading-snug">{company.name}</h2>
                  <span className="flex shrink-0 items-center gap-1.5">
                    {company.featured && <FeaturedBadge />}
                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[11px] font-bold">
                      {company.industry}
                    </span>
                  </span>
                </div>
                {company.city && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-700" /> {company.city}
                  </p>
                )}
                {company.phone && (
                  <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                    <Phone className="w-3.5 h-3.5 text-cyan-700" /> {company.phone}
                  </p>
                )}
                {company.description && (
                  <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{company.description}</p>
                )}
                <Link
                  href={`/company/${company.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:text-cyan-800"
                >
                  View Company <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        )}

        <section className="mt-14 bg-white rounded-3xl border border-slate-200 p-8" aria-label="How buyers use this list">
          <h2 className="font-extrabold text-slate-900 text-xl">How buyers use this list of companies</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Start with industry, then city</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                A supplier in your own city answers faster and delivers cheaper than one three
                provinces away. Narrow by industry first — textiles, surgical instruments, basmati
                rice, cement, sports goods, machinery — then pick the city closest to you.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Ask for a quote, not a catalogue</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                The description on each profile tells you what the firm makes or supplies. When you
                call or email, say the product, the quantity and the delivery city — that is what a
                supplier needs to give you a real price instead of a brochure answer.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Which sectors are covered</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Manufacturing &amp; Industrial, Agriculture &amp; Farming, Construction &amp; Building,
                Solar &amp; Renewable Energy, Logistics &amp; Courier and Technology &amp; IT are among the
                sectors on PakListings, alongside service firms such as legal, finance and media
                companies.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Hiring? Check the jobs board too</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Companies that are hiring post their open roles on our{' '}
                <Link href="/jobs" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">
                  jobs page
                </Link>
                , with salary ranges and a direct contact to apply to. If a firm you like is not
                hiring today, its company profile still gives you the number to call.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
