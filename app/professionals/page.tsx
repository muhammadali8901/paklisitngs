import type { Metadata } from 'next'
import Link from 'next/link'
import { UserRound, MapPin, Search, BadgeCheck, MessageSquareText } from 'lucide-react'
import ProfessionalCard from '@/components/professional-card'
import { getApprovedProfessionalCards } from '@/lib/public-listings'

export const dynamic = 'force-static'
export const revalidate = 604800

export const metadata: Metadata = {
  title: 'Professionals in Pakistan — Find Experts | PakListings',
  description:
    'Browse professional profiles in Pakistan — doctors, lawyers, accountants, designers, engineers and tradespeople. See experience, services and contact details.',
  alternates: { canonical: 'https://www.paklistings.com/professionals/' },
  robots: { index: true, follow: true },
}

export default async function ProfessionalsPage() {
  const pros = await getApprovedProfessionalCards()

  if (pros.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-br from-teal-800 via-cyan-800 to-violet-900 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 text-center">
            <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 text-xs font-bold tracking-wide">
              <UserRound className="w-4 h-4" /> Pakistan&apos;s Professional Profiles
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold mt-6 leading-tight">
              Find the right professional for the job
            </h1>
            <p className="mt-4 text-teal-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              Doctors, lawyers, accountants, designers, engineers, teachers, plumbers, electricians and more — every profile shows real experience, services and contact details, so you can reach the right person directly.
            </p>
            <Link
              href="/add-professional"
              className="mt-8 inline-flex items-center gap-2 bg-white text-cyan-800 font-bold px-6 py-3.5 rounded-full hover:bg-teal-50 transition-colors shadow-lg"
            >
              <UserRound className="w-5 h-5" /> Add Your Professional Profile
            </Link>
          </div>
        </section>
        <main className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
            No professional profiles listed yet
          </h2>
          <p className="mt-3 text-slate-600 max-w-xl mx-auto leading-relaxed">
            This is a new section of PakListings — the first verified professionals are on their way. If you offer a service or practice a profession, add your profile now and be among the first people visitors find here.
          </p>
          <Link
            href="/add-professional"
            className="mt-8 inline-flex items-center gap-2 bg-violet-600 text-white font-bold px-6 py-3.5 rounded-full hover:bg-violet-700 transition-colors shadow-lg"
          >
            <UserRound className="w-5 h-5" /> Create Your Profile — Plans from PKR 99
          </Link>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-teal-800 via-cyan-800 to-violet-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur rounded-full px-4 py-2 text-xs font-bold tracking-wide">
            <UserRound className="w-4 h-4" /> Pakistan&apos;s Professional Profiles
          </span>
          <h1 className="font-display text-3xl sm:text-5xl font-bold mt-6 leading-tight">
            Find the right professional for the job
          </h1>
          <p className="mt-4 text-teal-100 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Doctors, lawyers, accountants, designers, engineers, teachers, plumbers, electricians and more — every profile shows real experience, services and contact details, so you can reach the right person directly.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/add-professional"
              className="inline-flex items-center gap-2 bg-white text-cyan-800 font-bold px-6 py-3.5 rounded-full hover:bg-teal-50 transition-colors shadow-lg"
            >
              <UserRound className="w-5 h-5" /> Add Your Professional Profile
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center gap-2 bg-white/10 border border-white/25 text-white font-bold px-6 py-3.5 rounded-full hover:bg-white/20 transition-colors"
            >
              <Search className="w-5 h-5" /> Search All Listings
            </Link>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            {pros.length} professional profile{pros.length === 1 ? '' : 's'} on PakListings
          </h2>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-slate-500">
            <MapPin className="w-4 h-4 text-violet-600" /> Across Pakistan
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {pros.map((pro) => (
            <ProfessionalCard key={pro.id} pro={pro} />
          ))}
        </div>

        <section className="mt-14 bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
            How to hire a professional on PakListings
          </h2>
          <div className="grid sm:grid-cols-3 gap-6 mt-6 text-sm leading-relaxed text-slate-600">
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-700 mb-3">
                <Search className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-slate-900 mb-1.5">1. Check the profile</h3>
              <p>Read the tagline, profession, years of experience, services offered and skills. A detailed profile with real information is the first sign of a serious professional.</p>
            </div>
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-700 mb-3">
                <BadgeCheck className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-slate-900 mb-1.5">2. Verify before you pay</h3>
              <p>Ask for proof of qualifications, past work or a written quote before agreeing to anything — especially for doctors, lawyers, engineers and other regulated work.</p>
            </div>
            <div>
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-violet-50 text-violet-700 mb-3">
                <MessageSquareText className="w-5 h-5" />
              </span>
              <h3 className="font-bold text-slate-900 mb-1.5">3. Contact directly</h3>
              <p>Every profile lists a phone number and, where the professional chose to share one, an email or website. Agree on the scope, the fee and the timeline in writing first.</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-slate-500 leading-relaxed">
            PakListings lists professionals so you can find them; it does not verify qualifications, guarantee work quality, or take part in your agreement with them. Always check credentials yourself before paying for any service.
          </p>
        </section>
      </main>
    </div>
  )
}
