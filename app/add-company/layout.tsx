import type { Metadata } from 'next'

// Public, indexable add page: the form itself renders for signed-out
// visitors (and Googlebot); only the submit is gated behind sign-in,
// which returns the user here via /login?next=/add-company.
export const metadata: Metadata = {
  title: 'Add Company in Pakistan – List Your Company | PakListings',
  description:
    'List your company on PakListings for buyers across Pakistan. Submit industry, city, products and contact details for review — approved profiles go public.',
  alternates: {
    canonical: 'https://www.paklistings.com/add-company/',
  },
  openGraph: {
    title: 'Add Company in Pakistan – List Your Company | PakListings',
    description:
      'List your company on PakListings for buyers across Pakistan. Submit industry, city, products and contact details for review — approved profiles go public.',
    url: 'https://www.paklistings.com/add-company/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function AddCompanyLayout({ children }: { children: React.ReactNode }) {
  return children
}
