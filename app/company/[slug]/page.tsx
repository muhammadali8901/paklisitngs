import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Phone, Globe, Mail, ArrowLeft } from 'lucide-react'
import { fetchCompanyBySlug } from '@/lib/public-listings'
import { detailTitle, fitMetaDescription } from '@/lib/seo-content'

// Company detail route — SERVER component (Round 3 parity with
// /business/[slug]): the company is fetched HERE, on the server, and
// rendered into the initial HTML. The browser makes no Firestore read
// for it (anti-scrape), and the per-listing SEO that the old client
// page applied with effects (document.title, meta description,
// Organization JSON-LD) is now real server output — generateMetadata
// plus an inline JSON-LD script — which is strictly better for
// crawlers than the post-hydration DOM edits it replaces.
//
// Visibility posture (unchanged): companies have NO weekly release
// cycle, and the public URL reflects PUBLIC visibility only — the
// server reads anonymously, so a company appears here exactly when a
// visitor could see it: status 'approved'. Owners manage pending
// companies from their dashboard; admins from the admin panel.

// A newly approved company should appear without a rebuild.
export const revalidate = 604800

/** One anonymous read per request, shared by metadata + page. */
const loadCompany = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchCompanyBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  return { id: found.id, ...found.data }
})

// Tails for topping up a short company description (150-160).
// All state what the profile shows — contact details, address,
// website — never a fact about the company itself.
const DESCRIPTION_TAILS = [
  ' Contact details and company profile on PakListings.',
  ' See its PakListings profile for contact details and more.',
  ' Find its phone, address and website on its profile.',
  ' Browse similar companies to compare and choose.',
  ' See the full company profile on PakListings.',
  ' See its PakListings profile for contact details, address, email and website.',
  ' See more on its PakListings profile.',
  ' More on its PakListings profile.',
  ' See its full profile.',
  ' More on PakListings.',
  ' Get in touch.',
  ' Reach out.',
]

function metaDescriptionFor(company: any): string {
  const rawDesc = (company.description || '').replace(/\s+/g, ' ').trim()
  const industryLabel = company.industry || company.category || 'Company'
  const text = rawDesc.length >= 50
    ? rawDesc
    : `${company.name} is a ${industryLabel} company in ${company.city || 'Pakistan'}.`
  return fitMetaDescription(text, DESCRIPTION_TAILS)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const company = await loadCompany(slug)
  // The page calls notFound(); noindex keeps this slug out of the
  // index instead of inheriting the homepage meta.
  if (!company) return { robots: { index: false, follow: false } }
  const industryLabel = company.industry || company.category || 'Company'
  // Title guard (50-60, hard cap 60) — same rule as business
  // detail pages: the company name is truncated at a word boundary
  // with an ellipsis only when it cannot fit any other way, and
  // the city is never dropped.
  const title = detailTitle(company.name, industryLabel, company.city, false)
  const description = metaDescriptionFor(company)
  const canonical = `https://www.paklistings.com/company/${company.slug || slug}/`
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

export default async function CompanyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const company = await loadCompany(slug)
  if (!company) notFound()

  // Organization JSON-LD — same fields the old client page injected.
  let jsonLd: Record<string, any> | null = null
  if (company) {
    const sameAs = [company.website].filter(Boolean)
    jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: company.name,
      url: `https://www.paklistings.com/company/${company.slug || slug}`,
    }
    if (company.description) jsonLd.description = company.description
    if (company.phone) jsonLd.telephone = company.phone
    if (company.email) jsonLd.email = company.email
    if (company.address || company.city) {
      jsonLd.address = {
        '@type': 'PostalAddress',
        ...(company.address ? { streetAddress: company.address } : {}),
        ...(company.city ? { addressLocality: company.city } : {}),
        addressCountry: 'PK',
      }
    }
    if (sameAs.length > 0) jsonLd.sameAs = sameAs
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <Link href="/companies" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:text-cyan-800 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Companies
        </Link>

        {company && (
          <section className="bg-white rounded-3xl border border-slate-200 p-8 space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              {(company.industry || company.category) && (
                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[11px] font-bold">
                  {company.industry || company.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900">{company.name}</h1>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500 font-medium">
              {company.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-cyan-700" /> {company.city}
                </span>
              )}
              {company.phone && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-cyan-700" /> {company.phone}
                </span>
              )}
              {company.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-slate-400" /> {company.email}
                </span>
              )}
            </div>

            {company.description && (
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{company.description}</p>
            )}

            {company.address && (
              <p className="text-sm text-slate-600">
                <strong className="text-slate-800">Address:</strong> {company.address}
                {company.city ? `, ${company.city}` : ''}
              </p>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {company.phone && (
                <a
                  href={`tel:${company.phone}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Phone className="w-4 h-4" /> Call Now
                </a>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4" /> Send Email
                </a>
              )}
              {company.website && (
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-cyan-500 text-slate-700 font-bold text-sm rounded-xl transition-colors"
                >
                  <Globe className="w-4 h-4" /> Visit Website
                </a>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
