import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import SearchResults, { type Result } from '@/components/search-results'
import { fetchApprovedBusinesses, fetchApprovedCompanies } from '@/lib/public-listings'
import { isReleased } from '@/lib/release'

// SERVER component (Round 3): the live part of the search index —
// approved + released businesses and approved companies — is built
// HERE, on the server, and passed to the client search UI as initial
// data. The browser runs no Firestore list query for search, and the
// index/filter interactions keep working on this server-provided set.
// ISR refreshes the live set hourly (well inside the 7-day cycle).
export const metadata = {
  robots: { index: false, follow: false },
}

export const revalidate = 604800

async function buildLiveItems(): Promise<Result[]> {
  const items: Result[] = []
  const now = Date.now()

  const bizRows = await fetchApprovedBusinesses()
  for (const row of bizRows) {
    const data = row.data
    if (!data.name || !data.slug) continue
    // Weekly batch release (lib/release.ts): approved businesses go
    // public at the next 7-day cycle boundary, not immediately.
    if (!isReleased(data.approvedAt, now)) continue
    const label = data.category || data.mainCategory || 'Business'
    items.push({
      type: 'Business',
      title: data.name,
      snippet: `${label}${data.city ? ` in ${data.city}` : ''} — view contact details, hours, services and reviews.`,
      href: `/business/${data.slug}`,
    })
  }

  const compRows = await fetchApprovedCompanies()
  for (const row of compRows) {
    const data = row.data
    if (!data.name || !data.slug) continue
    const label = data.industry || data.category || 'Company'
    items.push({
      type: 'Company',
      title: data.name,
      snippet: `${label} company${data.city ? ` based in ${data.city}` : ''} — view the company profile and contact details.`,
      href: `/company/${data.slug}`,
    })
  }

  return items
}

export default async function SearchPage() {
  const liveItems = await buildLiveItems()
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      {/* No Suspense wrapper: the island must SSR its default view
          into the initial HTML (Round 4 — see search-results.tsx). */}
      <SearchResults initialLiveItems={liveItems} />
      <Footer />
    </div>
  )
}
