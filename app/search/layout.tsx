import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search the PakListings Directory',
  description: 'Search businesses and companies across Pakistan by name, keyword, category, and city on PakListings.',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.paklistings.com/search/' },
}

export default function SearchLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
