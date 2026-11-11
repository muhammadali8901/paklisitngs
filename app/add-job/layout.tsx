import type { Metadata } from 'next'

// Public, indexable add page: metadata lives in this layout because
// the page itself is a client component (form + sign-in gate), which
// cannot export metadata. Mirrors the add-business / add-company
// layout pattern.
export const metadata: Metadata = {
  title: 'Post a Job in Pakistan – Reach Candidates | PakListings',
  description:
    'Post a job on PakListings and reach candidates across Pakistan. Add role, company, city, job type and salary range — reviewed, then published for applicants.',
  alternates: {
    canonical: 'https://www.paklistings.com/add-job/',
  },
  openGraph: {
    title: 'Post a Job in Pakistan – Reach Candidates | PakListings',
    description:
      'Post a job on PakListings and reach candidates across Pakistan. Add role, company, city, job type and salary range — reviewed, then published for applicants.',
    url: 'https://www.paklistings.com/add-job/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function AddJobLayout({ children }: { children: React.ReactNode }) {
  return children
}
