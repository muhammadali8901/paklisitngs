import type { Metadata } from 'next'

// Public, indexable add page: metadata lives in this layout because
// the page itself is a client component (form + sign-in gate), which
// cannot export metadata. Mirrors the add-business / add-company
// / add-job layout pattern.
export const metadata: Metadata = {
  title: 'Add Your Professional Profile in Pakistan | PakListings',
  description:
    'Add your professional profile on PakListings — name, tagline, experience, services, skills and contact details. Plans from PKR 99, reviewed before going public.',
  alternates: {
    canonical: 'https://www.paklistings.com/add-professional/',
  },
  openGraph: {
    title: 'Add Your Professional Profile in Pakistan | PakListings',
    description:
      'Add your professional profile on PakListings — name, tagline, experience, services, skills and contact details. Plans from PKR 99, reviewed before going public.',
    url: 'https://www.paklistings.com/add-professional/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function AddProfessionalLayout({ children }: { children: React.ReactNode }) {
  return children
}
