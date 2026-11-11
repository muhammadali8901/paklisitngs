import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'User & Business Dashboard | PakListings',
  description: 'Manage your listings, profile settings, saved bookmarks, and notifications on PakListings.',
  robots: { index: false, follow: false },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return children
}
