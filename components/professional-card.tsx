import Link from 'next/link'
import { MapPin, UserRound, Clock, ArrowRight } from 'lucide-react'
import type { PublicProfessionalCard } from '@/lib/public-listings'
import FeaturedBadge from '@/components/featured-badge'

/**
 * The professional profile card — same visual language as the
 * business/company/job listing cards (rounded-3xl, hover shadow),
 * with professional-specific rows: name, tagline, profession
 * badge, city, experience, and a View Profile link.
 */
export default function ProfessionalCard({ pro }: { pro: PublicProfessionalCard }) {
  const snippet = (pro.description || '').replace(/\s+/g, ' ').trim()
  return (
    <article className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="shrink-0 w-12 h-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center font-extrabold text-sm">
          <UserRound className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h2 className="font-extrabold text-slate-900 leading-snug">{pro.name}</h2>
          {pro.headline && (
            <p className="text-xs text-slate-500 font-semibold mt-0.5 line-clamp-2">{pro.headline}</p>
          )}
          {(pro.profession || pro.featured) && (
            <span className="mt-1 flex flex-wrap items-center gap-1.5">
              {pro.profession && (
                <span className="inline-block px-2.5 py-1 rounded-full bg-violet-50 text-violet-800 border border-violet-100 text-[11px] font-bold">
                  {pro.profession}
                </span>
              )}
              {pro.featured && <FeaturedBadge />}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500 font-medium">
        {pro.city && (
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-violet-600" /> {pro.city}
          </span>
        )}
        {pro.experience && (
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-violet-600" /> {pro.experience} experience
          </span>
        )}
      </div>
      {snippet && (
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{snippet}</p>
      )}
      <Link
        href={`/professional/${pro.slug}`}
        prefetch={false}
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-violet-800 hover:text-violet-900"
      >
        View Profile <ArrowRight className="w-4 h-4" />
      </Link>
    </article>
  )
}
