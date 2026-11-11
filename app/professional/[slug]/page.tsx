import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, Mail, Globe, Clock, Briefcase, GraduationCap, Languages, UserRound, ArrowLeft, Wrench, MessageCircle, Github, Linkedin, Facebook, ExternalLink, Star } from 'lucide-react'
import { fetchProfessionalBySlug, fetchApprovedProfessionals, type ListingDoc } from '@/lib/public-listings'
import { applyPendingEdit } from '@/lib/edit-requests'
import { isValidProject } from '@/lib/tiers'
import { pickTitleInRange, fitMetaDescription } from '@/lib/seo-content'

// Approved professional profiles go live immediately — there is
// no /api/revalidate route and no lib/revalidate.ts in PakListings,
// so the detail page uses a short 1-hour cache: an approved
// profile is viewable within the hour, and a 7-day cache would
// serve a stale 404 for a week after approval.
export const revalidate = 604800
export const dynamicParams = true

export async function generateStaticParams() {
  const rows = await fetchApprovedProfessionals()
  return rows.filter((r) => typeof r.data?.slug === 'string' && r.data.slug).map((r) => ({ slug: r.data.slug as string }))
}

async function loadProfessional(slug: string): Promise<ListingDoc | null> {
  const row = await fetchProfessionalBySlug(slug)
  if (!row) return null
  // Merge any approved pending edit so the page shows the latest
  // approved details, exactly like the business/company/job pages.
  const merged = applyPendingEdit(row.data, 'professional', Date.now())
  return { id: row.id, data: merged }
}

function titleFor(name: string, profession: string, city: string): string {
  const raw = (v: unknown) => (typeof v === 'string' ? v : '')
  const citySuffix = city ? ` in ${city}` : ''
  const namePart = name || 'Professional'
  return pickTitleInRange([
    `${namePart} — ${profession || 'Professional'}${citySuffix} | PakListings`,
    `${namePart} | PakListings`,
    `${profession || 'Professional'}${citySuffix} | PakListings`,
  ])
}

/** "8" → "8 years of experience"; "8 years" → "8 years experience". */
function experienceLabel(raw: string): string {
  const v = raw.trim()
  if (!v) return ''
  if (/^\d+$/.test(v)) return `${v} years of experience`
  if (/year/i.test(v)) return `${v} experience`
  return `${v} experience`
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const row = await loadProfessional(slug)
  if (!row) return { title: 'Professional Not Found | PakListings', robots: { index: false, follow: false } }
  const d = row.data || {}
  const raw = (v: unknown) => (typeof v === 'string' ? v : '')
  const name = raw(d.name) || 'Professional'
  const profession = raw(d.profession) || 'Professional'
  const city = raw(d.city)
  const description = fitMetaDescription(
    [
      `${name} is a ${profession.toLowerCase()}${city ? ` in ${city}` : ''}.`,
      raw(d.headline),
      raw(d.description).slice(0, 80),
    ]
      .filter(Boolean)
      .join(' '),
    [' See experience, services, skills and contact details on PakListings.', ' PakListings — Pakistan Business Directory.']
  )
  return {
    title: titleFor(name, profession, city),
    description,
    alternates: { canonical: `https://www.paklistings.com/professional/${slug}/` },
    robots: { index: true, follow: true },
  }
}

export default async function ProfessionalDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const row = await loadProfessional(slug)
  if (!row) notFound()
  const d = row.data || {}
  const raw = (v: unknown) => (typeof v === 'string' ? v : '')
  const arr = (v: unknown): string[] =>
    Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0) : []
  const name = raw(d.name) || 'Professional'
  const headline = raw(d.headline)
  const profession = raw(d.profession)
  const specialization = raw(d.specialization)
  const city = raw(d.city)
  const phone = raw(d.phone)
  const whatsapp = raw(d.whatsapp) || phone
  const email = raw(d.email)
  const website = raw(d.website)
  const address = raw(d.address)
  const description = raw(d.description)
  const experience = experienceLabel(raw(d.experience))
  const skills = arr(d.skills)
  const services = arr(d.services)
  const education = raw(d.education)
  const languages = raw(d.languages)
  const projects = arr(d.projects).filter((p) => isValidProject(p))
  const github = raw(d.github)
  const linkedin = raw(d.linkedin)
  const facebook = raw(d.facebook)
  const portfolioUrl = raw(d.portfolioUrl)
  const wa = whatsapp.replace(/[^0-9+]/g, '')
  const waHref = wa ? `https://wa.me/${wa.replace(/^\+/, '')}` : ''

  // Person schema: the profile is a person, not a business.
  // sameAs only includes links the professional chose to list.
  const personJsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name,
    ...(headline ? { description: headline } : {}),
    ...(profession ? { jobTitle: profession } : {}),
    url: `https://www.paklistings.com/professional/${slug}/`,
    ...(city ? { address: { '@type': 'PostalAddress', addressLocality: city, addressCountry: 'PK' } } : {}),
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(website ? { sameAs: [website, ...(github ? [github] : []), ...(linkedin ? [linkedin] : []), ...(facebook ? [facebook] : [])] } : {}),
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <main className="max-w-4xl mx-auto px-4 py-10">
        <Link href="/professionals" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-800 hover:text-cyan-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> All Professionals
        </Link>

        {/* Header card */}
        <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <span className="shrink-0 w-16 h-16 rounded-3xl bg-violet-600 text-white flex items-center justify-center">
              <UserRound className="w-8 h-8" />
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">{name}</h1>
                {d.featured === true && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-200 text-[11px] font-bold">
                    <Star className="w-3 h-3" /> Featured
                  </span>
                )}
              </div>
              {headline && <p className="mt-2 text-base text-slate-600 leading-relaxed">{headline}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {profession && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 text-violet-800 border border-violet-100 text-xs font-bold">
                    <Briefcase className="w-3.5 h-3.5" /> {profession}
                  </span>
                )}
                {specialization && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-100 text-xs font-bold">
                    {specialization}
                  </span>
                )}
                {city && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    <MapPin className="w-3.5 h-3.5 text-violet-600" /> {city}
                  </span>
                )}
                {experience && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                    <Clock className="w-3.5 h-3.5 text-violet-600" /> {experience}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Contact actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            {phone && (
              <a href={`tel:${phone.replace(/[\s-]/g, '')}`} className="inline-flex items-center gap-2 bg-violet-600 text-white font-bold px-5 py-3 rounded-full hover:bg-violet-700 transition-colors shadow">
                <Phone className="w-4 h-4" /> Call {phone}
              </a>
            )}
            {waHref && (
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-5 py-3 rounded-full hover:bg-emerald-700 transition-colors shadow">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-800 font-bold px-5 py-3 rounded-full hover:bg-slate-50 transition-colors">
                <Mail className="w-4 h-4 text-violet-600" /> Email
              </a>
            )}
            {website && (
              <a href={website} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-800 font-bold px-5 py-3 rounded-full hover:bg-slate-50 transition-colors">
                <Globe className="w-4 h-4 text-violet-600" /> Website <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </section>

        {/* About */}
        {description && (
          <section className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-3">About {name.split(' ')[0]}</h2>
            <p className="text-slate-600 leading-relaxed whitespace-pre-line">{description}</p>
          </section>
        )}

        {/* Services + skills */}
        {(services.length > 0 || skills.length > 0) && (
          <section className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            {services.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-violet-600" /> Services Offered
                </h2>
                <ul className="space-y-2">
                  {services.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-600 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {skills.length > 0 && (
              <div className={services.length > 0 ? 'mt-7' : ''}>
                <h2 className="font-display text-xl font-bold text-slate-900 mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full bg-violet-50 text-violet-800 border border-violet-100 text-xs font-bold">{s}</span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* Background */}
        {(education || languages || address) && (
          <section className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Background</h2>
            <dl className="space-y-3 text-sm">
              {education && (
                <div className="flex gap-3">
                  <dt className="w-32 shrink-0 font-bold text-slate-900 flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-violet-600" /> Education</dt>
                  <dd className="text-slate-600 leading-relaxed">{education}</dd>
                </div>
              )}
              {languages && (
                <div className="flex gap-3">
                  <dt className="w-32 shrink-0 font-bold text-slate-900 flex items-center gap-1.5"><Languages className="w-4 h-4 text-violet-600" /> Languages</dt>
                  <dd className="text-slate-600 leading-relaxed">{languages}</dd>
                </div>
              )}
              {address && (
                <div className="flex gap-3">
                  <dt className="w-32 shrink-0 font-bold text-slate-900 flex items-center gap-1.5"><MapPin className="w-4 h-4 text-violet-600" /> Address</dt>
                  <dd className="text-slate-600 leading-relaxed">{address}</dd>
                </div>
              )}
            </dl>
          </section>
        )}

        {/* Projects (Premium / Featured tiers) */}
        {projects.length > 0 && (
          <section className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Selected Work</h2>
            <ul className="space-y-2">
              {projects.map((p, i) => (
                <li key={i} className="flex items-start gap-2.5 text-slate-600 leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        {(github || linkedin || facebook || portfolioUrl) && (
          <section className="mt-6 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-bold text-slate-900 mb-4">Links</h2>
            <div className="flex flex-wrap gap-3">
              {github && (
                <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 text-white font-bold px-4 py-2.5 rounded-full hover:bg-slate-800 transition-colors text-sm">
                  <Github className="w-4 h-4" /> GitHub
                </a>
              )}
              {linkedin && (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-bold px-4 py-2.5 rounded-full hover:bg-[#0959aa] transition-colors text-sm">
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
              )}
              {facebook && (
                <a href={facebook} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#1877F2] text-white font-bold px-4 py-2.5 rounded-full hover:bg-[#1669d6] transition-colors text-sm">
                  <Facebook className="w-4 h-4" /> Facebook
                </a>
              )}
              {portfolioUrl && (
                <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white border border-slate-300 text-slate-800 font-bold px-4 py-2.5 rounded-full hover:bg-slate-50 transition-colors text-sm">
                  <ExternalLink className="w-4 h-4 text-violet-600" /> Portfolio
                </a>
              )}
            </div>
          </section>
        )}

        <p className="mt-8 text-xs text-slate-500 leading-relaxed text-center max-w-2xl mx-auto">
          This profile was submitted by the professional and reviewed by PakListings. Always verify qualifications, ask for a written quote, and agree on scope and fees before paying for any service. Report a problem with this profile from the <Link href="/report-abuse" className="underline underline-offset-2 font-semibold text-slate-600">Report Abuse</Link> page.
        </p>
      </main>
    </div>
  )
}
