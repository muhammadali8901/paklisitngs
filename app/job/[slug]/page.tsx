import { cache } from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { MapPin, Briefcase, Banknote, Building2, ArrowLeft } from 'lucide-react'
import { fetchJobBySlug } from '@/lib/public-listings'
import { applyPendingEdit } from '@/lib/edit-requests'
import { fitMetaDescription, pickTitleInRange, truncateTitleName } from '@/lib/seo-content'

// Job detail route — SERVER component (same pattern as
// /company/[slug]): the job is fetched HERE, on the server, and
// rendered into the initial HTML. The browser makes no Firestore
// read for it (anti-scrape), and the per-listing SEO is real
// server output — generateMetadata plus an inline JobPosting
// JSON-LD script.
//
// Visibility posture: jobs have NO release cycle, and the public
// URL reflects PUBLIC visibility only — the server reads
// anonymously, so a job appears here exactly when a visitor could
// see it: status 'approved'. Owners manage pending jobs from
// their dashboard; admins from the admin panel.

// Job posts refresh hourly: jobs have no release cycle, so an approved
// job goes live immediately — a 7-day cache could serve a stale 404 for
// a week after approval. (There is no /api/revalidate route and no
// lib/revalidate.ts in PakListings; freshness comes from ISR only.)
export const revalidate = 604800

/** One anonymous read per request, shared by metadata + page. */
const loadJob = cache(async (slug: string): Promise<any | null> => {
  const found = await fetchJobBySlug(slug)
  if (!found || found.data?.status !== 'approved') return null
  const raw = { id: found.id, ...found.data }
  return applyPendingEdit(raw, 'job', Date.now())
})

// Tails for topping up a short job description (150-160). All
// state what the post shows — salary, role details, application
// contact — never a fact about the role itself.
const DESCRIPTION_TAILS = [
  ' Salary, role details and application contact on PakListings.',
  ' See salary, role details and how to apply on PakListings.',
  ' Find salary details and application contact on PakListings.',
  ' Browse similar jobs to compare and choose.',
  ' See the full job post on PakListings.',
  ' See salary, role details, benefits and how to apply on PakListings.',
  ' See more on its PakListings post.',
  ' More on its PakListings post.',
  ' More on PakListings.',
  ' Apply now.',
]

function metaDescriptionFor(job: any): string {
  const rawDesc = (job.description || '').replace(/\s+/g, ' ').trim()
  const text = rawDesc.length >= 50
    ? rawDesc
    : `${job.title} at ${job.companyName || 'a Pakistani employer'} in ${job.city || 'Pakistan'}.`
  return fitMetaDescription(text, DESCRIPTION_TAILS)
}

// Title guard (50-60, hard cap 60) — same rule as business and
// company detail pages: the company is dropped first, then honest
// extenders are tried; only a very long job title is truncated,
// at a word boundary with an ellipsis, and the city is never dropped.
function jobTitle(title: string, companyName: string | undefined, city: string | undefined): string {
  const cityLabel = city || 'Pakistan'
  // The old title used 'Employer' when no company was stored;
  // keeping it here also guarantees the "at …" candidates exist
  // for very short titles.
  const companyLabel = companyName || 'Employer'
  const dropped = `${title} in ${cityLabel} | PakListings`
  const candidates: string[] = [
    `${title} at ${companyLabel} in ${cityLabel} | PakListings`,
    `${title} at ${companyLabel} in ${cityLabel}, Pakistan | PakListings`,
    dropped,
    `${title} in ${cityLabel}, Pakistan | PakListings`,
    `${title} in ${cityLabel}: Salary & Role Details | PakListings`,
    `${title} in ${cityLabel}: Role Details & How to Apply | PakListings`,
    `${title} in ${cityLabel}: Salary, Role & How to Apply | PakListings`,
    `${title} in ${cityLabel}: Salary, Role & Contact Details | PakListings`,
    `${title} in ${cityLabel}: Role, Salary & Application Details | PakListings`,
    `${title} in ${cityLabel}: Apply Now — Role & Salary Details | PakListings`,
  ]
  const picked = pickTitleInRange(candidates)
  if (picked.length >= 50 && picked.length <= 60) return picked
  if (dropped.length > 60) return truncateTitleName(title, cityLabel)
  return picked
}

/** Stored job-type label → schema.org employmentType (Remote is a location, not a type). */
function employmentTypeFor(jobType: string): string | null {
  if (jobType === 'Full-time') return 'FULL_TIME'
  if (jobType === 'Part-time') return 'PART_TIME'
  if (jobType === 'Contract') return 'CONTRACTOR'
  if (jobType === 'Internship') return 'INTERN'
  return null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const job = await loadJob(slug)
  // The page calls notFound(); noindex keeps this slug out of the
  // index instead of inheriting the homepage meta.
  if (!job) return { robots: { index: false, follow: false } }
  const title = jobTitle(job.title, job.companyName, job.city)
  const description = metaDescriptionFor(job)
  const canonical = `https://www.paklistings.com/job/${job.slug || slug}/`
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'PakListings',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const job = await loadJob(slug)
  if (!job) notFound()

  // JobPosting JSON-LD — only fields stored on the job document.
  const employmentType = employmentTypeFor(job.jobType || '')
  // createdAt arrives as a Firestore Timestamp on some paths and as
  // serialized epoch millis on others (lib/public-listings serializes
  // Timestamps) — accept both, so datePosted is actually emitted.
  const postedMs =
    job.createdAt?.toMillis?.() ||
    (typeof job.createdAt === 'number' && job.createdAt > 0 ? job.createdAt : null)
  const jsonLd: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || '',
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName || 'Employer',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.city || 'Pakistan',
        addressCountry: 'PK',
      },
    },
    ...(employmentType ? { employmentType } : {}),
    ...(job.jobType === 'Remote' ? { jobLocationType: 'TELECOMMUTE' } : {}),
    ...(postedMs ? { datePosted: new Date(postedMs).toISOString() } : {}),
    url: `https://www.paklistings.com/job/${job.slug || slug}/`,
  }

  const paragraphs = (job.description || '')
    .split(/\n+/)
    .map((p: string) => p.trim())
    .filter(Boolean)

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <Link
          href="/jobs"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-800 hover:text-cyan-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> All Jobs
        </Link>

        <article className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
          <div className="flex items-start gap-4">
            <span className="shrink-0 w-14 h-14 rounded-2xl bg-cyan-700 text-white flex items-center justify-center">
              <Briefcase className="w-6 h-6" />
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">{job.title}</h1>
              {job.companyName && (
                <p className="text-sm text-slate-500 font-semibold mt-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-cyan-700" /> {job.companyName}
                </p>
              )}
              {job.jobType && (
                <span className="inline-block mt-2 px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[11px] font-bold">
                  {job.jobType}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600 font-medium">
            {job.city && (
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-cyan-700" /> {job.city}
              </span>
            )}
            {job.salaryRange && (
              <span className="flex items-center gap-1.5">
                <Banknote className="w-4 h-4 text-cyan-700" /> {job.salaryRange}
              </span>
            )}
          </div>

          {paragraphs.length > 0 && (
            <div className="space-y-3">
              {paragraphs.map((p: string, i: number) => (
                <p key={i} className="text-sm text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          )}

          {job.contact && (
            <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4">
              <p className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 mb-1">
                How to apply
              </p>
              <p className="text-sm text-slate-800 font-semibold break-words">{job.contact}</p>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  )
}
