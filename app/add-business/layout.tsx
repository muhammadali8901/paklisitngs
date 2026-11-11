import type { Metadata } from 'next'

// Public, indexable add page: the form itself renders for signed-out
// visitors (and Googlebot); only the submit is gated behind sign-in,
// which returns the user here via /login?next=/add-business.
export const metadata: Metadata = {
  title: 'Add Business in Pakistan – List Your Business | PakListings',
  description:
    'List your business on PakListings across 183 cities. Submit name, category, city, address, hours and services — approved listings go live at the weekly release.',
  alternates: {
    canonical: 'https://www.paklistings.com/add-business/',
  },
  openGraph: {
    title: 'Add Business in Pakistan – List Your Business | PakListings',
    description:
      'List your business on PakListings across 183 cities. Submit name, category, city, address, hours and services — approved listings go live at the weekly release.',
    url: 'https://www.paklistings.com/add-business/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function AddBusinessLayout({ children }: { children: React.ReactNode }) {
  return children
}
