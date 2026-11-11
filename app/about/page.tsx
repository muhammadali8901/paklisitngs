import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronRight,
  Code2,
  Cpu,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Headphones,
  HeartHandshake,
  HelpCircle,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Users,
} from 'lucide-react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

import {
  FOUNDER_LINKEDIN_URL,
  FOUNDER_PORTFOLIO_URL,
  PAKLISTINGS_ORGANIZATION_ID,
} from '@/lib/organization-schema'

// Public, stack-free expertise list used only in structured data.
const FOUNDER_SCHEMA_KNOWS_ABOUT = [
  'Full-Stack Web Development',
  'Artificial Intelligence',
  'Technical SEO',
  'Local Search',
]

export function generateMetadata(): Metadata {
  const title = 'About PakListings – Founder Muhammad Imran | PakListings'
  const description =
    'Muhammad Imran founded PakListings in 2026 — a Pakistan business directory across 183 cities and 24 categories. Listing costs a one-time fee from PKR 99.'

  return {
    title,
    description,
    alternates: {
      canonical: 'https://www.paklistings.com/about/',
    },
    openGraph: {
      title,
      description,
      url: 'https://www.paklistings.com/about/',
      siteName: 'PakListings',
      locale: 'en_PK',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

const STATS = [
  {
    value: '183',
    label: 'Cities Covered',
    detail: 'City pages across Pakistan',
    icon: MapPin,
  },
  {
    value: '24',
    label: 'Business Categories',
    detail: 'Organised for local discovery',
    icon: Building2,
  },
  {
    value: '43',
    label: 'Businesses Listed',
    detail: 'Seed listings from national brands',
    icon: BadgeCheck,
  },
  {
    value: 'PKR 99',
    label: 'Listing Fee From',
    detail: 'One-time fee, no monthly charges',
    icon: ShieldCheck,
  },
]

const FOUNDER_SKILLS = [
  'Full-Stack Web Architecture',
  'Modern Web Technologies',
  'JavaScript Backend Development',
  'Artificial Intelligence & Agentic AI',
  'Technical SEO & Core Web Vitals',
  'Generative Engine Optimization (GEO)',
  'Cloud Database Architecture',
  'Local Search Engineering',
  'High-Performance PWA Development',
  'REST & GraphQL API Design',
]

const CORE_VALUES = [
  {
    title: 'Fair One-Time Pricing',
    description:
      'A listing costs a small one-time fee from PKR 99 — no monthly charges, no renewals — and a customer never pays, in money or in personal data, to see a business’s phone or WhatsApp number.',
    icon: BadgeCheck,
  },
  {
    title: 'Built for the Person Searching',
    description:
      'The directory is arranged the way people actually look: a trade, in a city, near them. Phone numbers sit in the open, and the guides say what to ask a plumber, tailor or supplier before hiring.',
    icon: HeartHandshake,
  },
  {
    title: 'Only Claims We Can Show',
    description:
      'Every figure on this page is a real one — 183 cities, 24 categories, 43 seed listings, fees from PKR 99. We publish no invented rankings, no estimates dressed as facts, and no paid placement passed off as a recommendation.',
    icon: Eye,
  },
  {
    title: 'Checked Listings, Weekly Releases',
    description:
      'Every submission is reviewed before it goes public, and approved listings publish in the next weekly release rather than one by one — so the directory grows in order, not in a rush.',
    icon: Cpu,
  },
  {
    title: 'Same Format for Every Size',
    description:
      'A tailor in Multan and a manufacturer in Sialkot get the same review and the same public profile format. Extra visibility comes only from the published Featured tier — never from a quiet deal.',
    icon: Users,
  },
  {
    title: 'Numbers That Ring, Addresses That Exist',
    description:
      'A directory is only as good as its details. Review checks that the phone number works, the address is real and the WhatsApp button reaches a human — and visitors can report any listing that falls short.',
    icon: ShieldCheck,
  },
]

const FUTURE_GOALS = [
  {
    title: 'More reviewed listings, in more cities',
    description:
      'Grow from 43 seed listings by adding owner-submitted, reviewed businesses city by city — starting with the trades people search for most: plumbers, electricians, AC technicians, tailors and beauticians.',
    icon: MapPin,
  },
  {
    title: 'Featured placement and a Verified badge',
    description:
      'Businesses that want more visibility can choose the Featured tier (PKR 299, one-time). A Verified badge is granted only to listings that pass the checks in our verification policy — it is not sold on its own.',
    icon: BadgeCheck,
  },
  {
    title: 'Reviews that reflect real customers',
    description:
      'Build the review system around genuine customer experiences with real moderation, so a business earns its standing from what its customers say — not from what it pays.',
    icon: Star,
  },
]

const TEAM_FUNCTIONS = [
  {
    name: 'Engineering & Product Team',
    role: 'Platform Engineering & Product',
    description:
      'The team that keeps search fast, keeps listing pages readable by search engines, and keeps the path from submission to the weekly release working.',
    icon: Code2,
  },
  {
    name: 'Customer & Listing Support',
    role: 'Owner Support & Listing Help',
    description:
      'The people who answer owners’ questions on verification, profile changes and payment proof — and help visitors report a listing that is wrong.',
    icon: Headphones,
  },
  {
    name: 'Content & SEO Strategy',
    role: 'Content, Taxonomy & Local SEO',
    description:
      'The function that keeps the 183-city, 24-category taxonomy tidy and the city guides practical — what to ask, what to check, and how to compare providers.',
    icon: FileText,
  },
]

const ABOUT_FAQS = [
  {
    question: 'Who is the founder of PakListings?',
    answer:
      'PakListings was founded by Muhammad Imran, who runs it as CEO (paklistings.com). He is a Pakistani full-stack web and AI developer and technical SEO specialist, and the founder of Imran Digitals.',
  },
  {
    question: 'Who is the CEO of PakListings?',
    answer:
      'Muhammad Imran is the CEO of PakListings and its lead software architect — engineering, technical SEO and growth all sit with him.',
  },
  {
    question: 'When was PakListings founded, and what is its mission?',
    answer:
      'Muhammad Imran founded PakListings in 2026. Its mission is to make Pakistan’s small and medium businesses findable online — a reviewed directory across 183 cities, where listing costs a small one-time fee from PKR 99 and customers never pay to see a phone number.',
  },
  {
    question: 'What is Muhammad Imran’s official website?',
    answer:
      'Muhammad Imran’s official website and portfolio is https://www.imrandigitals.com/. His LinkedIn profile is https://www.linkedin.com/in/muhammad-imran-972364373/.',
  },
  {
    question: 'What is the relationship between PakListings and Imran Digitals?',
    answer:
      'PakListings is Muhammad Imran’s own venture, designed and engineered by him. Imran Digitals is his separate digital agency and engineering consultancy — custom web apps, SaaS architecture, AI automation and technical SEO.',
  },
  {
    question: 'What technology is PakListings built on?',
    answer:
      'PakListings runs on a fast, mobile-first build with structured data on every listing page, so search engines and AI assistants can read the directory’s businesses, cities and categories directly.',
  },
  {
    question: 'How can I contact PakListings?',
    answer:
      'You can reach PakListings on its helpline +92 334 563 6230, or by email at admin@paklistings.com or support@paklistings.com. PakListings is an online service, available 24/7, and its office is at Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan. Full contact details are on the Contact page.',
  },
  {
    question: 'When will my approved listing go live?',
    answer:
      'Approved listings publish at the next weekly release. Once your listing passes review and your payment proof is verified, it is queued for the next release — then it appears on your city page, your category page and in search. Listings never go live one by one the moment they are approved.',
  },
]

export default function AboutPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': 'https://www.paklistings.com/about/#webpage',
        url: 'https://www.paklistings.com/about/',
        name: 'About PakListings – Founder Muhammad Imran',
        about: { '@id': PAKLISTINGS_ORGANIZATION_ID },
        mainEntity: { '@id': 'https://www.paklistings.com/about/#muhammad-imran' },
      },
      {
        '@type': 'Person',
        '@id': 'https://www.paklistings.com/about/#muhammad-imran',
        name: 'Muhammad Imran',
        jobTitle: 'Founder, Owner & CEO',
        description:
          'Muhammad Imran is the Founder, Owner and CEO of PakListings, a Pakistani full-stack web and AI developer, software architect and technical SEO specialist, and the founder of Imran Digitals.',
        url: FOUNDER_PORTFOLIO_URL,
        sameAs: [FOUNDER_PORTFOLIO_URL, FOUNDER_LINKEDIN_URL],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Multan',
          addressRegion: 'Punjab',
          addressCountry: 'PK',
        },
        worksFor: { '@id': PAKLISTINGS_ORGANIZATION_ID },
        founderOf: [
          { '@id': PAKLISTINGS_ORGANIZATION_ID },
          {
            '@type': 'Organization',
            name: 'Imran Digitals',
            url: FOUNDER_PORTFOLIO_URL,
          },
        ],
        knowsAbout: FOUNDER_SCHEMA_KNOWS_ABOUT,
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://www.paklistings.com/about/#faq',
        mainEntity: ABOUT_FAQS.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': 'https://www.paklistings.com/about/#breadcrumb',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.paklistings.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'About',
            item: 'https://www.paklistings.com/about/',
          },
        ],
      },
    ],
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-900">
      <Navbar />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#0F172A] text-white">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-cyan-700/20 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl"
          />

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <nav aria-label="Breadcrumb" className="mb-10">
              <ol className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-300">
                <li>
                  <Link href="/" className="transition-colors hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </li>
                <li aria-current="page" className="text-white">
                  About
                </li>
              </ol>
            </nav>

            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-200">
                <Sparkles className="h-4 w-4" />
                Founded by Muhammad Imran
              </span>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                About PakListings
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300 sm:text-lg">
                PakListings is a Pakistan business directory, started in 2026 by{' '}
                <strong className="font-semibold text-white">Muhammad Imran</strong>, Founder of{' '}
                <a
                  href={FOUNDER_PORTFOLIO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cyan-300 underline decoration-cyan-300/50 underline-offset-4 transition-colors hover:text-cyan-200"
                >
                  Imran Digitals
                </a>
                . It organises businesses across 183 cities and 24 categories — from restaurants and
                clinics to suppliers, manufacturers and home trades — and keeps every phone and
                WhatsApp number visible, so a customer can call without signing in. Listing a
                business costs a one-time fee from PKR 99.
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#founder"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-950/30 transition-colors hover:bg-cyan-500"
                >
                  Meet the Founder
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/businesses"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-600 bg-white/5 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-white/10"
                >
                  Explore Businesses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Honest platform stats */}
        <section aria-label="PakListings platform facts" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat) => {
              const Icon = stat.icon
              return (
                <article
                  key={stat.label}
                  className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-4xl font-extrabold tracking-tight text-slate-900">
                        {stat.value}
                      </p>
                      <h2 className="mt-2 text-sm font-bold text-slate-900">{stat.label}</h2>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">{stat.detail}</p>
                    </div>
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* Founder spotlight */}
        <section id="founder" className="scroll-mt-24 px-4 pb-20 pt-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                Founder Spotlight
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Muhammad Imran — Founder, Owner & CEO
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                PakListings is run by the developer who built it — shaped by day-to-day work with
                Pakistan’s local businesses, and by a simple belief: a customer should never have
                to pay, or sign up, just to see a shop’s phone number. An owner, meanwhile, should
                know exactly what a listing costs before submitting one.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.82fr_1.55fr]">
                {/* Founder profile card */}
                <aside className="border-b border-slate-200 bg-slate-50 p-7 sm:p-9 lg:border-b-0 lg:border-r">
                  <div className="relative mx-auto w-fit lg:mx-0">
                    <div
                      aria-hidden="true"
                      className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-cyan-700 via-cyan-800 to-cyan-500 text-5xl font-extrabold tracking-tight text-white shadow-xl shadow-cyan-700/20 ring-8 ring-white"
                    >
                      MI
                    </div>
                    <span className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-cyan-700 px-3 py-1.5 text-xs font-bold text-white shadow-md">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Founder
                    </span>
                  </div>

                  <div className="mt-9 text-center lg:text-left">
                    <h3 className="text-3xl font-extrabold tracking-tight text-slate-900">
                      Muhammad Imran
                    </h3>
                    <p className="mt-2 font-bold text-cyan-800">
                      Founder & Chief Executive Officer (CEO)
                    </p>
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Founder, owner and lead software architect of PakListings
                    </p>
                    <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600">
                      <MapPin className="h-4 w-4 text-cyan-700" />
                      Multan & Lahore, Punjab, Pakistan
                    </p>
                  </div>

                  <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                      Key Ventures
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm font-semibold text-slate-700">
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-700" />
                        Founder & CEO @ PakListings
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-cyan-700" />
                        Founder @ Imran Digitals
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 grid gap-3">
                    <a
                      href={FOUNDER_PORTFOLIO_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-800"
                    >
                      <Globe className="h-4 w-4" />
                      Visit Portfolio
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <a
                      href={FOUNDER_LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold text-slate-800 transition-colors hover:border-cyan-300 hover:text-cyan-800"
                    >
                      <Linkedin className="h-4 w-4 text-[#0A66C2]" />
                      LinkedIn
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </aside>

                {/* Founder biography */}
                <div className="p-7 sm:p-9 lg:p-11">
                  <span className="inline-flex items-center gap-2 rounded-full bg-cyan-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800">
                    <Sparkles className="h-4 w-4" />
                    The Visionary Behind PakListings
                  </span>

                  <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                    Why a developer who builds websites started a directory
                  </h3>

                  <div className="mt-6 space-y-5 leading-relaxed text-slate-600">
                    <p>
                      <strong className="font-semibold text-slate-900">Muhammad Imran</strong> is a
                      Pakistani full-stack web & AI developer, software architect and technical SEO
                      specialist. As the founder of{' '}
                      <a
                        href={FOUNDER_PORTFOLIO_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-cyan-800 underline decoration-cyan-300 underline-offset-4 hover:text-cyan-900"
                      >
                        Imran Digitals
                      </a>
                      , he works across custom web applications, SaaS architecture, AI automation and
                      technical SEO — building the kind of sites local businesses actually need.
                    </p>
                    <p>
                      Through Imran Digitals he kept running into the same gap from both sides. A
                      customer searching for a plumber in Lahore or a darzi in Multan found scattered
                      Facebook pages and dead numbers. And the shop itself — serving its street for
                      years — had no page a search engine could show, because nobody had built one
                      for it.
                    </p>
                    <p>
                      PakListings is his answer to that gap: a directory organised by city and trade,
                      where every listing is reviewed and published at the next weekly release, and
                      where phone and WhatsApp details stay visible without an account. Owners pay a
                      one-time fee — Basic PKR 99, Premium PKR 199, Featured PKR 299 — instead of a
                      yearly subscription, and customers never pay to see a number.
                    </p>
                  </div>

                  <div className="mt-9 border-t border-slate-200 pt-8">
                    <h4 className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-wider text-slate-900">
                      <Cpu className="h-5 w-5 text-cyan-700" />
                      Founder’s Core Engineering & SEO Competencies
                    </h4>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Muhammad Imran skills">
                      {FOUNDER_SKILLS.map((skill) => (
                        <li
                          key={skill}
                          className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700"
                        >
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-start gap-3 rounded-2xl border border-cyan-100 bg-cyan-50 p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-800" />
                    <p className="text-sm leading-relaxed text-cyan-950">
                      <strong className="font-bold">Founder fact:</strong> Muhammad Imran is the
                      founder, owner and CEO of PakListings and the founder of Imran Digitals, his
                      digital agency and engineering consultancy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission and vision */}
        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                Purpose
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Our Mission & Vision
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 shadow-sm sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-700 text-white shadow-lg shadow-cyan-700/20">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">Our Mission</h3>
                <p className="mt-4 leading-relaxed text-slate-600">
                  To make every Pakistani business findable by the people already searching for it —
                  organised by city and trade, reviewed before it goes public, and reachable by phone
                  or WhatsApp without an account.
                </p>
              </article>

              <article className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 shadow-sm sm:p-9">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-700 text-white shadow-lg shadow-cyan-700/20">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-extrabold text-slate-900">Our Vision</h3>
                <p className="mt-4 leading-relaxed text-slate-600">
                  A Pakistan where searching for a plumber in Lahore, a textile supplier in
                  Faisalabad or a clinic in Islamabad ends with a working number and a real address —
                  not a dead link.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* Core values */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
              How We Work
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Core Values
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              These principles shape how PakListings is engineered, reviewed and improved — and how we
              state what the platform charges and what it does not promise.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value) => {
              const Icon = value.icon
              return (
                <article
                  key={value.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{value.description}</p>
                </article>
              )
            })}
          </div>

          <p className="mt-8 text-sm leading-relaxed text-slate-500">
            Our full standards are in the{' '}
            <Link href="/editorial-policy" className="font-bold text-cyan-800 hover:text-cyan-900">
              Editorial Policy
            </Link>{' '}
            and{' '}
            <Link href="/verification-policy" className="font-bold text-cyan-800 hover:text-cyan-900">
              Verification Policy
            </Link>
            .
          </p>
        </section>

        {/* Our story */}
        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.35fr_0.85fr]">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                Our Story
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                How Muhammad Imran Built PakListings
              </h2>

              <div className="mt-7 space-y-5 leading-relaxed text-slate-600">
                <p>
                  While building websites for local enterprises through Imran Digitals, Muhammad Imran
                  kept seeing the same pattern. A business could have loyal customers on its street
                  and still be invisible to anyone searching online — no page, no working number, no
                  WhatsApp contact a search engine could surface.
                </p>
                <p>
                  The directories that existed were built for someone else: print-era phone books
                  moved online, or listings locked behind logins and yearly subscriptions. None of
                  them was organised around how people here actually search — a trade, in a city,
                  near them — and none of them told an owner plainly what a listing would cost.
                </p>
                <p>
                  PakListings was founded in 2026 as the answer. It was engineered from the ground up
                  with modern web technologies and secure cloud infrastructure, organised around cities and categories, and built
                  with a review step, after which approved listings publish at the next weekly release. Customers can discover a business and
                  reach it through direct phone and WhatsApp details; owners pay a one-time fee from PKR 99 instead of a yearly subscription, and nobody pays to see a contact number.
                </p>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Founded
                  </p>
                  <p className="mt-2 font-extrabold text-slate-900">2026</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Founder
                  </p>
                  <p className="mt-2 font-extrabold text-slate-900">Muhammad Imran</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-5">
                  <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Listing Model
                  </p>
                  <p className="mt-2 font-extrabold text-slate-900">One-Time Fee</p>
                </div>
              </div>
            </div>

            <figure className="rounded-3xl bg-[#0F172A] p-8 text-white shadow-sm sm:p-10">
              <Quote className="h-10 w-10 text-cyan-400" />
              <blockquote className="mt-6 text-2xl font-bold leading-snug tracking-tight">
                “A shop that serves its street every day should have a page the whole city can find —
                and a phone number that actually rings.”
              </blockquote>
              <figcaption className="mt-7 border-t border-slate-700 pt-6">
                <p className="font-bold text-white">Muhammad Imran</p>
                <p className="mt-1 text-sm text-slate-300">
                  The founding question behind PakListings
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        {/* Where we are headed */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-800">
                Looking Ahead
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Where We’re Headed
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                These are the next steps for PakListings — concrete work, not promises: more reviewed
                listings, a Featured tier and Verified badge done properly, and reviews worth reading.
              </p>
            </div>
            <span className="w-fit rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800">
              Future Goals
            </span>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {FUTURE_GOALS.map((goal) => {
              const Icon = goal.icon
              return (
                <article
                  key={goal.title}
                  className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold leading-snug text-slate-900">
                    {goal.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{goal.description}</p>
                </article>
              )
            })}
          </div>
        </section>

        {/* People and functions behind PakListings */}
        <section className="border-y border-slate-200 bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 max-w-3xl">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
                People & Expertise
              </span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                The People Behind PakListings
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                PakListings is powered by Muhammad Imran and the specialist functions at Imran Digitals
                that support its engineering, customer experience and local search strategy — the same
                people who answer when a listing is wrong or a payment proof needs checking.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-3xl border border-cyan-200 bg-cyan-50/60 p-7 shadow-sm">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-700 to-cyan-500 text-lg font-extrabold text-white"
                >
                  MI
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-slate-900">Muhammad Imran</h3>
                <p className="mt-1 text-sm font-bold text-cyan-800">
                  Founder, Owner & CEO
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Sets the platform’s direction and builds it himself — architecture, development,
                  AI features and the local-search strategy.
                </p>
                <div className="mt-5 flex gap-4 border-t border-cyan-100 pt-4 text-sm font-bold">
                  <a
                    href={FOUNDER_PORTFOLIO_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-cyan-800 hover:text-cyan-950"
                  >
                    Portfolio
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={FOUNDER_LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-700 hover:text-cyan-800"
                  >
                    LinkedIn
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </article>

              {TEAM_FUNCTIONS.map((team) => {
                const Icon = team.icon
                return (
                  <article
                    key={team.name}
                    className="rounded-3xl border border-slate-200 bg-[#F8FAFC] p-7 shadow-sm"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-cyan-700 shadow-sm">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-extrabold leading-snug text-slate-900">
                      {team.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-cyan-800">{team.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {team.description}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </section>

        {/* Founder FAQs */}
        <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-10 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-cyan-800">
              <HelpCircle className="h-4 w-4" />
              About PakListings FAQs
            </span>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Questions About PakListings & Its Founder
            </h2>
            <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-600">
              Clear answers about who founded PakListings, who leads it, how it relates to Imran
              Digitals, what a listing costs, how to contact us and when approved listings go live.
            </p>
          </div>

          <div className="space-y-4">
            {ABOUT_FAQS.map((faq, index) => (
              <details
                key={faq.question}
                open={index === 0}
                className="group rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-6 font-extrabold text-slate-900 marker:hidden [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-cyan-700 transition-transform group-open:rotate-90" />
                </summary>
                <p className="border-t border-slate-100 px-6 pb-6 pt-4 leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Contact PakListings */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="mb-10 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">
              Get In Touch
            </span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Contact PakListings
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              PakListings is an online service, available 24/7. Reach the team on the helpline, by
              email, or through the Contact page.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Phone className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">Helpline</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                <a
                  href="tel:+923345636230"
                  className="font-bold text-cyan-800 hover:text-cyan-900"
                >
                  +92 334 563 6230
                </a>
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">Email</h3>
              <p className="mt-3 space-y-1 text-sm leading-relaxed text-slate-600">
                <a
                  href="mailto:admin@paklistings.com"
                  className="block font-bold text-cyan-800 hover:text-cyan-900"
                >
                  admin@paklistings.com
                </a>
                <a
                  href="mailto:support@paklistings.com"
                  className="block font-bold text-cyan-800 hover:text-cyan-900"
                >
                  support@paklistings.com
                </a>
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-extrabold text-slate-900">Office</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Office 303, Evacuee Trust Complex, F-5/1, Islamabad 44000, Pakistan
              </p>
            </article>
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-cyan-500"
            >
              Visit the Contact Page
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 pb-20 sm:px-6 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#0F172A] px-6 py-14 text-center text-white shadow-sm sm:px-10 sm:py-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 rounded-full bg-cyan-700/20 blur-3xl"
            />
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                List Your Business on PakListings
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-relaxed text-slate-300">
                A public profile page, a working phone number, and a place in 183 cities — for a
                one-time fee from PKR 99.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-cyan-500"
                >
                  Create Your Account
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/add-business"
                  className="inline-flex items-center gap-2 rounded-xl bg-cyan-700 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-cyan-500"
                >
                  Add Your Business
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
