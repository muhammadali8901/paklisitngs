import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, ArrowRight } from 'lucide-react'
import { getApprovedJobCards } from '@/lib/public-listings'
import JobCard from '@/components/job-card'

export async function generateMetadata(): Promise<Metadata> {
  const jobs = await getApprovedJobCards()
  const title = 'Jobs in Pakistan – Open Roles & Salaries | PakListings'
  const description =
    'Browse approved job posts across Pakistan — full-time, part-time, contract, remote and internship roles with salary ranges and a direct contact to apply to.'
  return {
    title,
    description,
    ...(jobs.length === 0 ? { robots: { index: false, follow: false } } : {}),
    alternates: {
      canonical: 'https://www.paklistings.com/jobs/',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.paklistings.com/jobs/',
      siteName: 'PakListings',
      locale: 'en_PK',
      type: 'website',
    },
  }
}

// SERVER component: approved job posts are fetched on the server, so
// the grid is part of the initial HTML and no Firestore list query
// ever runs in a visitor's browser (anti-scrape). Jobs have no
// release cycle — approved posts are public immediately.
export const revalidate = 604800

export default async function JobsPage() {
  const jobs = await getApprovedJobCards()

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <section className="bg-[#0F172A] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold border border-cyan-500/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Open Roles</span>
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Jobs in Pakistan</h1>
          <p className="text-slate-400 text-sm">
            Open roles from employers across Pakistan. Each post shows the salary range where the
            employer gave one, and a phone number or email you can apply to directly.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {jobs.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <h2 className="font-extrabold text-slate-900 text-lg">
              No job posts listed yet — be the first to post yours
            </h2>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Create an account and post your open role — job posts start at PKR 99 one-time.
            </p>
            <Link
              href="/add-job"
              prefetch={false}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors"
            >
              Post a Job <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        <section className="mt-14 bg-white rounded-3xl border border-slate-200 p-8" aria-label="How to use the jobs board">
          <h2 className="font-extrabold text-slate-900 text-xl">How to use the jobs board</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Filter by role type first</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Posts are marked full-time, part-time, contract, remote or internship. Pick the type
                that fits your situation before you read the description — a remote post and an
                on-site post in another city are very different commitments.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Read the salary range before applying</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Where the employer gave one, the salary range is shown on the post itself. If no
                range is listed, ask about pay in your first message rather than after two rounds
                of interviews.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Apply through the contact on the post</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Every post carries a phone number or email to apply to. Send a short message with
                the role title, your experience in one line, and your CV attached — and keep a copy
                of what you sent, so you can follow up by name.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Jobs by city</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Most posts come from the big hiring cities. Start with{' '}
                <Link href="/city/lahore" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">Lahore</Link>,{' '}
                <Link href="/city/karachi" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">Karachi</Link>{' '}
                or{' '}
                <Link href="/city/islamabad" prefetch={false} className="font-bold text-cyan-700 hover:text-cyan-800">Islamabad</Link>{' '}
                if you are open to relocating, or check the companies list to see which firms are
                hiring in your own city.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
