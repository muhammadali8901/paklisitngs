import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight, ExternalLink, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { FIND_US_CATEGORIES, FIND_US_LINK_COUNT } from '@/lib/find-us-links'

// Revalidate every 30 days: profile links change rarely, so the page stays
// cached and cheap to serve between deploys.
export const revalidate = 2592000

export function generateMetadata(): Metadata {
  const title = 'Find Us Online | PakListings'
  const description =
    'Discover PakListings’ official online profiles, business listings, social media accounts, and other platforms where you can connect with us.'

  return {
    title,
    description,
    alternates: {
      // Trailing slash, matching the site-wide canonical convention
      // (see /about and the sitemap's canonicalUrl helper).
      canonical: 'https://www.paklistings.com/find-us/',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.paklistings.com/find-us/',
      siteName: 'PakListings',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default function FindUsPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': 'https://www.paklistings.com/find-us/#webpage',
        url: 'https://www.paklistings.com/find-us/',
        name: 'Find Us Online | PakListings',
        description:
          'Discover our official online profiles, business listings, social media accounts, and other platforms where you can connect with us.',
        isPartOf: { '@id': 'https://www.paklistings.com/#website' },
        breadcrumb: { '@id': 'https://www.paklistings.com/find-us/#breadcrumb' },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.paklistings.com/find-us/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.paklistings.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Find Us Online',
            item: 'https://www.paklistings.com/find-us/',
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0E7490] via-[#155E75] to-[#7C3AED] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-violet-300/20 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-cyan-100">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-cyan-200/70" />
                </li>
                <li aria-current="page" className="text-white">
                  Find Us Online
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                <ShieldCheck className="h-4 w-4" />
                {FIND_US_LINK_COUNT} official profiles
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                Find Us Online
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-cyan-50 sm:text-lg">
                Discover our official online profiles, business listings, social media accounts,
                and other platforms where you can connect with us.
              </p>

              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-cyan-100/90">
                Every profile below is an official PakListings listing —{' '}
                <strong className="font-semibold text-white">
                  Pakistan Business Directory — List Your Business
                </strong>
                , founded in 2026, covering 183 cities and 24 categories. If a profile is not
                listed here, it is not ours.
              </p>
            </div>
          </div>
        </section>

        {/* Category sections — rendered from lib/find-us-links.ts */}
        {FIND_US_CATEGORIES.map((category) => (
          <section
            key={category.id}
            id={category.id}
            aria-labelledby={`${category.id}-heading`}
            className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8"
          >
            <div className="mb-8 max-w-3xl">
              <h2
                id={`${category.id}-heading`}
                className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl"
              >
                {category.title}
              </h2>
              <p className="mt-3 leading-relaxed text-slate-600">{category.description}</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {category.links.map((link) => {
                const Icon = link.icon
                return (
                  <article
                    key={link.url}
                    className="flex flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:border-[#0E7490]/40 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0E7490]/10 text-[#0E7490]">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold text-slate-900">{link.name}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                      {link.description}
                    </p>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit PakListings on ${link.name} (opens in a new tab)`}
                      className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-[#0E7490] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#155E75] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C3AED] focus-visible:ring-offset-2"
                    >
                      Visit Profile
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </article>
                )
              })}
            </div>
          </section>
        ))}

        {/* Contact strip — NAP, matching the footer */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Prefer to reach us directly?
            </h2>
            <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">
              Our office, helpline and email are the same on every profile above — if a page
              shows different contact details, it is not an official PakListings profile.
            </p>
            <div className="mt-7 grid gap-5 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0E7490]/10 text-[#0E7490]">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Office</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#0E7490]/10 text-[#0E7490]">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Helpline</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    <a
                      href="tel:+923345636230"
                      className="font-bold text-[#0E7490] hover:text-[#155E75]"
                    >
                      +92 334 5636230
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#7C3AED]/10 text-[#7C3AED]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">Email</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    <a
                      href="mailto:support@paklistings.com"
                      className="font-bold text-[#0E7490] hover:text-[#155E75]"
                    >
                      support@paklistings.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0E7490] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#155E75]"
              >
                Visit the Contact Page
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
