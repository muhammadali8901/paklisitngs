import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import OwnerCtaBand from '@/components/owner-cta-band'
import { Megaphone, CheckCircle2, ArrowRight, UserPlus, ClipboardList, SearchCheck, ShieldCheck, Sparkles, BadgeCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Advertise on PakListings | Business Plans from PKR 99',
  description: 'List your business on PakListings from PKR 99 one-time: Basic, Premium and Featured plans, what each includes, and how the Verified Badge waitlist works.',
  alternates: {
    canonical: 'https://www.paklistings.com/advertise-with-us/',
  },
}

const basicFeatures = [
  'Your own business profile page',
  'Placement in your category and your city',
  'Call and WhatsApp buttons — customers contact you directly',
  'Opening hours, services and products on your profile',
  'Links to your website and social pages',
]

const faqs = [
  {
    q: 'How much does a basic listing cost?',
    a: 'A Basic listing costs PKR 99, once — not monthly. It includes your business profile page, placement in your category and city, call and WhatsApp buttons, hours, services and products, and links to your website and social pages. Premium is PKR 199 one-time (adds edit requests and up to 3 projects) and Featured is PKR 299 one-time (adds up to 5 projects and up to 2 blog posts). Browsing and searching the directory are free for visitors.',
  },
  {
    q: 'When will the Verified Badge launch?',
    a: 'It is in development. We do not publish a launch date we cannot keep — join the waitlist through the contact page and we will email you as soon as it opens, before it is announced publicly. Featured listings, by contrast, are available now as a PKR 299 one-time tier.',
  },
  {
    q: 'What will the Verified Badge require?',
    a: 'A document check: proof that the business is real and that you are authorised to represent it — for example business registration or utility documentation in the business name, plus a working phone number we can confirm. Exact requirements will be published with the launch.',
  },
  {
    q: 'Do you guarantee rankings, leads or sales?',
    a: 'No — and you should be wary of any directory that does. A complete, accurate profile on the pages customers search is a solid foundation, but results depend on your market, your offer and how you respond to enquiries.',
  },
]

export default function AdvertiseWithUsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />
      <main id="main-content" className="flex-1">
        <section className="bg-[#0F172A] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              <Megaphone className="w-3.5 h-3.5" /> Advertise on PakListings
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Put Your Business Where Customers Look
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              PakListings is a new, growing business directory for Pakistan — 183 cities, 24 categories.
              Here is the honest picture: listings start at PKR 99 one-time, and the Verified Badge is the
              one option still being built. No invented audience numbers — just what each option actually includes.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Link href="/add-business" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors">
                List Your Business — from PKR 99 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm rounded-xl border border-white/20 transition-colors">
                Join the Waitlist
              </Link>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Packages</h2>
            <p className="text-sm text-slate-500 max-w-xl mx-auto">
              Three one-time tiers, all live today. The Verified Badge is the one option still on the
              roadmap — join the waitlist through the contact page.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Basic Listing */}
            <div className="bg-white rounded-3xl border-2 border-cyan-500 p-8 flex flex-col space-y-5 shadow-sm">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[11px] font-extrabold uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Available now
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">Basic Listing</h3>
                <p className="text-3xl font-extrabold text-slate-900">PKR 99</p>
                <p className="text-xs font-bold text-slate-500">One-time fee — no subscription</p>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                {basicFeatures.map((f) => (
                  <li key={f} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link href="/add-business" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors">
                Add Your Business <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Premium Listing */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col space-y-5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100 text-[11px] font-extrabold uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Available now
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-500" /> Premium Listing
                </h3>
                <p className="text-3xl font-extrabold text-slate-900">PKR 199</p>
                <p className="text-xs font-bold text-slate-500">One-time fee — no subscription</p>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                <li className="flex gap-2"><Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" /><span>Everything in Basic</span></li>
                <li className="flex gap-2"><Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" /><span>Edit your listing — request changes from your dashboard</span></li>
                <li className="flex gap-2"><Sparkles className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" /><span>Up to 3 projects showcased on your listing</span></li>
              </ul>
              <Link href="/add-business" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors">
                Add Your Business <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured Listing */}
            <div className="bg-white rounded-3xl border border-slate-200 p-8 flex flex-col space-y-5">
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 text-violet-700 border border-violet-100 text-[11px] font-extrabold uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Available now
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-cyan-700" /> Featured Listing
                </h3>
                <p className="text-3xl font-extrabold text-slate-900">PKR 299</p>
                <p className="text-xs font-bold text-slate-500">One-time fee — no subscription</p>
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 flex-1">
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>Everything in Premium</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>Placement on the homepage and category pages</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>Priority position within your category and city</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>A &quot;Featured&quot; label on your profile</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>Up to 5 projects on your listing</span></li>
                <li className="flex gap-2"><ShieldCheck className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" /><span>Publish up to 2 blog posts</span></li>
              </ul>
              <Link href="/add-business" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-colors">
                Add Your Business <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <p className="text-center text-sm text-slate-600 max-w-2xl mx-auto">
            The <strong className="text-slate-900">Verified Badge</strong> is still being built: when it opens it will
            involve a document check of your business. Join the waitlist through the{' '}
            <Link href="/contact" className="text-cyan-700 font-semibold hover:underline">contact page</Link> and
            we will email you as soon as it launches.
          </p>
        </section>

        {/* How it works */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-5xl mx-auto space-y-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-3xl border border-slate-200 p-7 space-y-3">
                <UserPlus className="w-8 h-8 text-cyan-700" />
                <h3 className="font-extrabold text-slate-900">1. Register</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Create your free PakListings account with your name, email and a Pakistani phone number.
                </p>
                <Link href="/register" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:underline">
                  Create free account <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="rounded-3xl border border-slate-200 p-7 space-y-3">
                <ClipboardList className="w-8 h-8 text-cyan-700" />
                <h3 className="font-extrabold text-slate-900">2. Add your business</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Complete the eight-step form — contact details, category, location, hours, services
                  and products. It takes a few minutes and you can update it later.
                </p>
                <Link href="/add-business" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:underline">
                  Start the form <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="rounded-3xl border border-slate-200 p-7 space-y-3">
                <SearchCheck className="w-8 h-8 text-cyan-700" />
                <h3 className="font-extrabold text-slate-900">3. Get discovered</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our team reviews your submission and your payment proof. Once approved, your profile goes live at the next weekly release, and then appears in your
                  category, your city and search — customers call or WhatsApp you directly.
                </p>
                <Link href="/business-listing-guidelines" className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:underline">
                  Read the listing guidelines <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight text-center">Advertising FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl border border-slate-200 p-6">
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">{faq.q}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">{faq.a}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-500">
            Questions about how listings are checked? Read our{' '}
            <Link href="/verification-policy" className="text-cyan-700 font-semibold hover:underline">verification policy</Link>{' '}
            and{' '}
            <Link href="/editorial-policy" className="text-cyan-700 font-semibold hover:underline">editorial policy</Link>.
          </p>
        </section>

        <OwnerCtaBand
          title="Start with a Basic listing today."
          text="Listings start at PKR 99 one-time. Register, add your business, upload your payment proof, and be listed from the next weekly release."
          links={[
            { label: 'Browse businesses', href: '/businesses' },
            { label: 'Browse companies', href: '/companies' },
            { label: 'Listing guidelines', href: '/business-listing-guidelines' },
            { label: 'FAQs', href: '/faqs' },
          ]}
        />
      </main>
      <Footer />
    </div>
  )
}
