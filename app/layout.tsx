import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import './globals.css'
import ClientProviders from '@/components/client-providers'
import AnalyticsConsent from '@/components/analytics-consent'
import GtmConsent from '@/components/gtm-consent'
import { founderPersonSchema, organizationSchema } from '@/lib/organization-schema'

// Font: Raleway for headings AND body — matches rehbar.pk (body{font-family:Raleway}),
// chosen by the owner 2026-11-10 (Fraunces serif headings looked bad).
const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['400', '500', '600', '700', '800'],
})

// Search verification (Google Search Console / Bing) — codes supplied by the
// user 2026-11-07 for paklistings.com. NOTE: the Bing msvalidate.01 code is
// identical to LocalePak's — verify in Bing Webmaster Tools that it verifies
// paklistings.com; if Bing rejects it, replace with the code Bing issues for
// the paklistings.com property. Google Analytics / gtag IDs are unchanged
// (not domain-bound).

export const metadata: Metadata = {
  title: "PakListings – Pakistan Business Directory & Yellow Pages",
  description: "PakListings — Pakistan business directory and yellow pages. Find businesses, companies and jobs by city and category. Browsing is free; listings from PKR 99.",
  metadataBase: new URL('https://www.paklistings.com'),
  keywords: [
    'business directory Pakistan',
    'businesses in Pakistan',
    'yellow pages Pakistan',
    'list of companies in Pakistan',
    'companies in Pakistan',
    'local services Pakistan',
    'jobs in Pakistan',
    'PakListings'
  ],
  icons: {
    icon: [{ url: '/favicon.png', sizes: 'any' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    title: "PakListings – Pakistan Business Directory & Yellow Pages",
    description: "PakListings — Pakistan business directory and yellow pages. Find businesses, companies and jobs by city and category. Browsing is free; listings from PKR 99.",
    url: 'https://www.paklistings.com/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PakListings – Pakistan Business Directory & Yellow Pages",
    description: "PakListings — Pakistan business directory and yellow pages. Find businesses, companies and jobs by city and category. Browsing is free; listings from PKR 99.",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'A8XcQ1zkhbytCkZQ9BSxcrgWk8TLo1Ed2z08SQI4AE4',
    other: {
      'msvalidate.01': '207473D434A6B2FA4E2217EFA3CB53DB',
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'PakListings',
    url: 'https://www.paklistings.com/',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.paklistings.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }

  // Canonical Organization + founder Person nodes live in
  // lib/organization-schema.ts so every page references one entity.

  return (
    <html lang="en" className={raleway.variable}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
        <link rel="help" href="/llms.txt" type="text/plain" title="LLM Context" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([organizationSchema, founderPersonSchema, websiteSchema]) }}
        />
      </head>
      <body className="font-sans antialiased bg-[#FAFAFA] text-[#09090B] pb-16 md:pb-0 min-h-screen selection:bg-cyan-700 selection:text-white">
        {children}
        <ClientProviders />
        <AnalyticsConsent />
        <GtmConsent />
      </body>
    </html>
  )
}
