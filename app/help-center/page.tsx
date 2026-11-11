import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import { LifeBuoy, UserPlus, ClipboardList, Building2, Briefcase, ShieldCheck, Star, Mail, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PakListings Help Center – Listings, Jobs & Account Help',
  description: 'PakListings help, step by step: create an account, add a business or company, post a job, learn how approval and verification work, and contact support.',
  alternates: {
    canonical: 'https://www.paklistings.com/help-center/',
  },
}

const steps = [
  { n: 1, title: 'Basic Info', text: 'The business name customers know, plus the email and phone the business actually answers. That phone number becomes the call and WhatsApp button on the profile.' },
  { n: 2, title: 'Categories', text: 'One main category for the trade customers search for, and a second one only if the business genuinely does a second trade.' },
  { n: 3, title: 'Location', text: 'City, area and street address, with an optional Google Maps link so customers can find the door, not just the neighbourhood.' },
  { n: 4, title: 'Business Hours', text: 'Opening and closing times for every day, including the weekly off-day. Hours that match reality stop wasted trips and “they were closed” reviews.' },
  { n: 5, title: 'Services', text: 'Each service in the words customers use when they ask for it — this is the part visitors scan first when they compare two profiles.' },
  { n: 6, title: 'Products', text: 'Key products, with prices where showing them helps a buyer decide before visiting. This step is optional.' },
  { n: 7, title: 'Online Presence', text: 'Website and social links where they exist. WhatsApp uses the business phone number unless you give a different one.' },
  { n: 8, title: 'Description & Payment', text: 'A plain description of what the business does and who it serves, then pick a tier — Basic PKR 99, Premium PKR 199 or Featured PKR 299, each a one-time fee — and upload the payment proof.' },
]

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="bg-[#0F172A] text-white py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <LifeBuoy className="w-3.5 h-3.5" /> Help Center
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">How Can We Help?</h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Step-by-step help for finding a business on PakListings, getting your own listed,
              hiring through the jobs board, or sorting out an account problem. Pick the section
              that matches your question.
            </p>
          </div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 space-y-12">
          {/* Getting started */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <UserPlus className="w-6 h-6 text-cyan-700" /> Getting Started
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Searching costs nothing and needs no account.</strong> Browse by{' '}
                <Link href="/categories" className="text-cyan-700 font-semibold hover:underline">category</Link> or{' '}
                <Link href="/cities" className="text-cyan-700 font-semibold hover:underline">city</Link>, open a profile,
                and call or WhatsApp the business directly — PakListings never stands between you and the
                business, and never charges a visitor for an enquiry.
              </p>
              <p>
                <strong className="text-slate-900">Listing costs a one-time fee, starting at PKR 99.</strong>{' '}
                <Link href="/register" className="text-cyan-700 font-semibold hover:underline">Create an account</Link>{' '}
                first — owner name, email and a Pakistani mobile number, with a password of at least eight
                characters mixing letters, numbers and a special character. Creating the account itself is
                free; the fee applies when you submit a listing, and you choose the tier at that point:{' '}
                Basic PKR 99, Premium PKR 199 or Featured PKR 299. Then{' '}
                <Link href="/login" className="text-cyan-700 font-semibold hover:underline">sign in</Link> to reach
                your dashboard, which is private to your account and shows only your own submissions.
              </p>
            </div>
          </section>

          {/* Adding a business */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <ClipboardList className="w-6 h-6 text-cyan-700" /> Adding a Business — The 8 Steps
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              From your dashboard, choose <strong className="text-slate-900">Add Business</strong>. The form walks you
              through eight short steps, and you can move back and forth before submitting — nothing is final
              until the last step. Gather the facts first (name, phone, address, hours, services) and the form
              takes a few minutes.
            </p>
            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <li key={step.n} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm">
                    <span className="text-cyan-700">Step {step.n}:</span> {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
            <p className="text-sm text-slate-600 leading-relaxed">
              After you submit, the listing shows as <em>pending</em> in your dashboard while our team reviews
              it and checks your payment proof. Read the{' '}
              <Link href="/business-listing-guidelines" className="text-cyan-700 font-semibold hover:underline">listing guidelines</Link>{' '}
              before submitting — accurate details and the right category are what get a listing through review
              without corrections. Basic listings cannot be edited after submission, so check every field before
              you pay; Premium and Featured owners can request edits from the dashboard instead.
            </p>
          </section>

          {/* Companies & jobs */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Building2 className="w-6 h-6 text-cyan-700" /> Companies &amp; Jobs
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                <strong className="text-slate-900">Add Company</strong> is for registered firms, agencies and larger
                organisations. Approved companies appear in the{' '}
                <Link href="/companies" className="text-cyan-700 font-semibold hover:underline">companies directory</Link>{' '}
                with their industry, city and contact details, on the same one-time tiers as business listings
                (Basic PKR 99, Premium PKR 199, Featured PKR 299).
              </p>
              <p>
                <strong className="text-slate-900">Post a Job</strong> is also on your dashboard and uses the same
                three tiers. Give the role title, company, city, job type and exactly how candidates should
                apply. Like listings, jobs are reviewed before they appear — write the requirements as they
                really are, and never charge candidates a fee to apply.
              </p>
              <p className="flex items-start gap-2">
                <Briefcase className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                <span>Your dashboard groups everything you have submitted — businesses, companies and jobs — each with its current status and its tier.</span>
              </p>
            </div>
          </section>

          {/* Verification & approval */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <ShieldCheck className="w-6 h-6 text-cyan-700" /> Verification &amp; Approval
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                A person on our team reviews every submission before it goes public. We check that the business
                name is genuine, the phone number is a real, working number, the category and city match what
                the business actually does, the description is about the business — not keyword stuffing or
                copied text — and that the payment proof matches the tier chosen. We aim to check most
                submissions within a few working days; that is an aim, not a guaranteed timeframe, and it can
                take longer when volume is high or we need to clarify details with the owner.
              </p>
              <p>
                Approved listings do not go live the same hour: PakListings publishes approved listings in a
                weekly release, so an approved listing appears publicly at the next weekly release boundary.
                If a submission is not approved, it usually needs a fixable correction — a wrong category, an
                unreachable phone number, a rejected payment proof, or details that do not match. The reasons
                are shown on the listing in your dashboard: correct the issue and resubmit, or contact us and
                we will explain what we found. Our full standards are in the{' '}
                <Link href="/verification-policy" className="text-cyan-700 font-semibold hover:underline">verification policy</Link>{' '}
                and{' '}
                <Link href="/editorial-policy" className="text-cyan-700 font-semibold hover:underline">editorial policy</Link>.
              </p>
              <p className="flex items-start gap-2">
                <Star className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span>
                  Customer reviews are moderated the same way: they are held as pending and only appear on a
                  business profile after a team check, which keeps ratings honest. Approval is not an
                  endorsement, and no listing — at any tier — can promise a Google ranking.
                </span>
              </p>
            </div>
          </section>

          {/* Contact support */}
          <section className="space-y-4">
            <h2 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2.5">
              <Mail className="w-6 h-6 text-cyan-700" /> Contact Support
            </h2>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3 text-sm text-slate-600 leading-relaxed">
              <p>
                Still stuck? Message us through the{' '}
                <Link href="/contact" className="text-cyan-700 font-semibold hover:underline">contact page</Link> or the{' '}
                <Link href="/support" className="text-cyan-700 font-semibold hover:underline">support page</Link>.
                Include the page URL and the name of the listing involved — that one detail saves a full round
                of back-and-forth. To report a listing that looks fake, closed or abusive, use{' '}
                <Link href="/report-abuse" className="text-cyan-700 font-semibold hover:underline">Report Abuse</Link>{' '}
                so it reaches the review queue directly.
              </p>
              <p>
                Short answers are faster in the{' '}
                <Link href="/faqs" className="text-cyan-700 font-semibold hover:underline">FAQs</Link> — check there
                first for listing costs, approval timing and the weekly release, the Verified Badge, and how reviews work.
              </p>
              <Link href="/contact" className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-colors">
                Contact Support <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>
        </div>

        <OwnerCtaBand
          title="Ready to list your business?"
          text="From PKR 99 one-time: register, complete the eight steps, upload your payment proof, and we handle the review — approved listings go live at the next weekly release."
          links={[
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'FAQs', href: '/faqs' },
            { label: 'Browse businesses', href: '/businesses' },
            { label: 'Verification policy', href: '/verification-policy' },
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
