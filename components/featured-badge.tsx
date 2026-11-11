/**
 * "Featured" badge for public listing cards — rendered only when a
 * listing's `featured` flag is set (Featured tier, admin-approved).
 * The badge is the visible half of the Featured tier; the other half
 * is featured-first sorting (sortFeaturedFirst in lib/public-listings).
 * PakListings brand: vivid violet #7C3AED (not LocalePak's amber/gold).
 */
import { Star } from 'lucide-react'

export default function FeaturedBadge() {
  return (
    <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-violet-600 text-white text-[11px] font-bold">
      <Star className="w-3 h-3 fill-white" />
      Featured
    </span>
  )
}
