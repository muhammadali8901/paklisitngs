import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact PakListings – Support, Listings & Partnerships',
  description: 'Contact PakListings: email support@paklistings.com or admin@paklistings.com, call +92 334 5636230, or visit Office 303, Evacuee Trust Complex, F-5/1, Islamabad.',
  alternates: { canonical: 'https://www.paklistings.com/contact/' },
  openGraph: {
    title: 'Contact PakListings – Support, Listings & Partnerships',
    description: 'Contact PakListings: email support@paklistings.com or admin@paklistings.com, call +92 334 5636230, or visit Office 303, Evacuee Trust Complex, F-5/1, Islamabad.',
    url: 'https://www.paklistings.com/contact/',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
