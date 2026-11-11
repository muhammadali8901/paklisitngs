import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import Link from 'next/link'
import {
  Search, MapPin, ChevronRight, ArrowRight, ShieldCheck, Globe,
  BookOpen, Sparkles, LayoutGrid, Compass, Building2, MessageCircle, ListChecks, Phone
} from 'lucide-react'
import { CATEGORIES, CITIES, TOP_CITIES } from '@/lib/data'
import ListBusinessCta from '@/components/list-business-cta'
import WebMcpRegister from '@/components/webmcp-register'
import FeaturedBadge from '@/components/featured-badge'
import { getFeaturedBusinessCards } from '@/lib/public-listings'
import { BLOG_POSTS } from '@/lib/blog-data'

export const metadata: Metadata = {
  title: "Pakistan Business Directory – Find Companies | PakListings",
  description: "Find companies, suppliers and local services across 183 cities on PakListings, the Pakistan business directory — or list your business from PKR 99, one-time.",
  alternates: {
    canonical: 'https://www.paklistings.com/',
    types: {
      'text/markdown': '/index.md',
    },
  },
  openGraph: {
    title: "Pakistan Business Directory – Find Companies | PakListings",
    description: "Find companies, suppliers and local services across 183 cities on PakListings, the Pakistan business directory — or list your business from PKR 99, one-time.",
    url: 'https://www.paklistings.com/',
    siteName: 'PakListings',
    locale: 'en_PK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Pakistan Business Directory – Find Companies | PakListings",
    description: "Find companies, suppliers and local services across 183 cities on PakListings, the Pakistan business directory — or list your business from PKR 99, one-time.",
  },
}

const FAQS = [
  {
    question: 'What is PakListings?',
    answer: 'PakListings is a Pakistan business directory — the online equivalent of the yellow pages of Pakistan. It organises companies, suppliers, manufacturers and local services across 183 cities and 24 categories, with phone numbers and WhatsApp details shown openly so you can call a business without signing in.'
  },
  {
    question: 'How much does it cost to list a business on PakListings?',
    answer: 'Searching, browsing and calling a business on PakListings costs nothing — no account, no payment. Listing a business costs a one-time fee: Basic PKR 99, Premium PKR 199, or Featured PKR 299. There are no monthly charges and no renewals.'
  },
  {
    question: 'Which cities and categories does PakListings cover?',
    answer: 'PakListings covers 183 cities — Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar and many more — across 24 categories including restaurants, real estate, technology, healthcare and home services. You can also find trades such as plumbers, electricians, AC technicians, tailors and beauticians, plus suppliers, manufacturers and exporters.'
  },
  {
    question: 'Is PakListings the yellow pages of Pakistan?',
    answer: 'Think of it as the yellow pages rebuilt for search: a list of companies in Pakistan organised by city and trade, with a phone number, address and profile page for each business — no printed book, no login wall, and no payment needed just to see how to reach a business.'
  },
  {
    question: 'I run a business. How does my listing go live?',
    answer: 'Create an account and complete the Add Business form — eight short steps for your contact details, category, city, hours, services and products — then choose a tier and upload your payment proof. Our team reviews each submission; once approved, it publishes at the next weekly release and appears on your city page, your category page and in search.'
  }
]

function cityToSlug(name: string): string {
  return name.toLowerCase().replace(/\s+/g, '-')
}

export default async function HomePage() {
  // Featured Businesses: approved businesses with featured == true,
  // newest featuredAt first, cap 8 (lib/public-listings). Empty means
  // the whole section is hidden — no empty state, no filler.
  const featuredBusinesses = await getFeaturedBusinessCards(8)

  const latestPosts = Object.values(BLOG_POSTS)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Navbar />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main id="main-content">
        {/* HERO */}
        <section className="bg-slate-50 text-slate-900 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/80 text-cyan-800 border border-cyan-200 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-cyan-700" />
                <span>Pakistan Business Directory — 183 Cities</span>
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Find Businesses in Pakistan — <span className="text-cyan-800">Call Them Directly</span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                From a plumber in Lahore to a textile supplier in Faisalabad: search 183 cities and 24 categories, compare providers, and call or WhatsApp them directly. Searching and calling costs nothing — listing a business is a one-time fee from PKR 99.
              </p>
            </div>

            {/* Hero Search Box */}
            <div className="max-w-4xl mx-auto bg-white rounded-3xl p-3 sm:p-4 shadow-xl shadow-slate-900/5 border border-slate-200/90 text-left">
              <form action="/search" method="GET" className="grid grid-cols-1 md:grid-cols-12 gap-3">
                <div className="md:col-span-6 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <Search className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-search-q" className="sr-only">Search businesses, categories or guides</label>
                  <input
                    id="hero-search-q"
                    type="text"
                    name="q"
                    placeholder="Try plumber in Lahore, textile supplier, clinic..."
                    className="w-full bg-transparent text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none"
                  />
                </div>

                <div className="md:col-span-4 flex items-center gap-3 px-4 py-3 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                  <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                  <label htmlFor="hero-city-select" className="sr-only">Select City</label>
                  <select
                    id="hero-city-select"
                    name="city"
                    className="w-full bg-transparent text-slate-900 text-sm focus:outline-none cursor-pointer"
                  >
                    <option value="">All Cities in Pakistan</option>
                    {CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <button
                    type="submit"
                    aria-label="Search PakListings Directory"
                    className="w-full h-full py-3.5 bg-gradient-to-r from-cyan-700 to-cyan-800 hover:from-cyan-800 hover:to-cyan-900 text-white font-bold text-sm rounded-2xl shadow-lg shadow-cyan-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              <div className="pt-3 px-2 flex items-center gap-2 flex-wrap text-xs text-slate-500">
                <span className="font-bold text-slate-400">Popular:</span>
                <Link href="/category/restaurants" className="hover:text-cyan-700 font-semibold">Restaurants</Link>
                <span>•</span>
                <Link href="/category/real-estate" className="hover:text-cyan-700 font-semibold">Real Estate</Link>
                <span>•</span>
                <Link href="/category/technology" className="hover:text-cyan-700 font-semibold">Technology</Link>
                <span>•</span>
                <Link href="/category/healthcare" className="hover:text-cyan-700 font-semibold">Healthcare</Link>
                <span>•</span>
                <Link href="/blog" className="hover:text-cyan-700 font-bold">Guides &rarr;</Link>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  <strong className="text-slate-900">Own a business?</strong> Get a public profile page customers can call — a listing costs a one-time fee from PKR 99.
                </p>
                <div className="flex items-center gap-2.5 shrink-0">
                  <Link
                    href="/add-business" prefetch={false}
                    className="px-5 py-2.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-colors"
                  >
                    Add Your Business
                  </Link>
                  <Link
                    href="/register" prefetch={false}
                    className="px-5 py-2.5 bg-white border border-slate-200 hover:border-cyan-500 text-slate-700 font-bold text-xs rounded-xl transition-colors"
                  >
                    Create Your Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="bg-white py-10 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-slate-900">From PKR 99</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">One-time listing fee, no monthly charges</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-cyan-700">183 Cities</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">City pages across Pakistan</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-cyan-700">24 categories</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Food, tech, health, home services & more</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-3xl font-extrabold text-violet-500">43 listed businesses</span>
                <p className="text-xs font-semibold text-slate-500 mt-1">Seed listings from national brands</p>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURED BUSINESSES — rendered only when at least one approved
            business carries featured == true (Featured tier approval or
            the admin Feature toggle). No filler when none exist. */}
        {featuredBusinesses.length > 0 && (
          <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600">Featured on PakListings</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Featured Businesses
                </h2>
              </div>
              <Link href="/businesses" className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1">
                <span>View All Businesses</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {featuredBusinesses.map((biz) => (
                <article key={biz.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-extrabold text-slate-900 leading-snug">{biz.name}</h3>
                    <span className="flex shrink-0 items-center gap-1.5">
                      {biz.featured && <FeaturedBadge />}
                      <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-100 text-[11px] font-bold">
                        {biz.category}
                      </span>
                    </span>
                  </div>
                  {biz.city && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-cyan-700" /> {biz.city}
                    </p>
                  )}
                  {biz.phone && (
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-cyan-700" /> {biz.phone}
                    </p>
                  )}
                  {biz.description && (
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{biz.description}</p>
                  )}
                  <Link
                    href={`/business/${biz.slug}`}
                    prefetch={false}
                    className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-cyan-700 hover:text-cyan-800"
                  >
                    View Business <ArrowRight className="w-4 h-4" />
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* CATEGORIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Browse by Industry</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Find a Trade, a Service or a Supplier
              </h2>
            </div>
            <Link href="/categories" className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1">
              <span>View All 24 Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 12).map((cat) => (
              <Link
                key={cat.id}
                href={`/category/${cat.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all text-center space-y-2 group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center mx-auto group-hover:bg-cyan-700 group-hover:text-white transition-colors">
                  <LayoutGrid className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-xs line-clamp-1 group-hover:text-cyan-700">
                  {cat.name}
                </h3>
                <p className="text-[11px] font-semibold text-cyan-700">
                  Browse {cat.name} in Pakistan
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CITIES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-slate-900 text-white rounded-3xl my-8">
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Near You</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  183 Cities, One Directory
                </h2>
                <p className="text-xs text-slate-400 mt-1">Pick your city to see its businesses, trades and guides — from Karachi and Lahore to Abbottabad and Hyderabad.</p>
              </div>
              <Link href="/cities" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                <span>Explore All Cities</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
              {CITIES.map((city) => (
                <Link
                  key={city}
                  href={`/city/${cityToSlug(city)}`}
                  className="p-3.5 bg-slate-800/80 hover:bg-cyan-700 rounded-xl border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center justify-between font-semibold group"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 group-hover:text-white" />
                    <span>{city}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 text-slate-500 group-hover:text-white group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WHY PAKLISTINGS */}
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200/80">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Why PakListings</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Checked Listings, Visible Numbers, One-Time Fees
              </h2>
              <p className="text-slate-500 text-xs sm:text-sm">A directory that starts from how people really search — a service, in a place, near them — and tells you plainly what listing on it costs.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Compass className="w-8 h-8 text-cyan-700" />
                <h3 className="font-bold text-slate-900 text-base">Organised by City and Trade</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Every listing sits on a city page and a category page, so a search for a plumber in Lahore or a supplier in Sialkot lands on a page built for exactly that.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <BookOpen className="w-8 h-8 text-cyan-700" />
                <h3 className="font-bold text-slate-900 text-base">Guides That Say What to Ask</h3>
                <p className="text-xs text-slate-600 leading-relaxed">City and trade guides cover what to check before you hire — licences, quotes, warranties — so you call a business knowing what to ask first.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <ShieldCheck className="w-8 h-8 text-violet-600" />
                <h3 className="font-bold text-slate-900 text-base">Reviewed Before It Goes Public</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Every submission is checked — a genuine name, a working phone number, the right city and category — and approved listings publish at the next weekly release, not instantly.</p>
              </div>

              <div className="bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200/80 space-y-3">
                <Globe className="w-8 h-8 text-purple-600" />
                <h3 className="font-bold text-slate-900 text-base">Numbers You Can See Without Signing In</h3>
                <p className="text-xs text-slate-600 leading-relaxed">Phone and WhatsApp details are shown openly on every profile. You never need an account — or a payment — just to see how to reach a business.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FOR BUSINESS OWNERS */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">For Business Owners</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              List Your Business — From PKR 99, Once
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Create an account and complete the eight-step Add Business form, then choose a tier — Basic PKR 99, Premium PKR 199 or Featured PKR 299, each a one-time fee — and upload your payment proof. Once approved, your listing publishes at the next weekly release.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <Building2 className="w-8 h-8 text-cyan-700" />
              <h3 className="font-bold text-slate-900 text-base">A Profile Page Google Can Read</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Your own page with your name, description, address and contact details — structured so search engines can show it when someone searches for your business by name.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <Search className="w-8 h-8 text-cyan-700" />
              <h3 className="font-bold text-slate-900 text-base">Shown Where Customers Look</h3>
              <p className="text-xs text-slate-600 leading-relaxed">An approved listing appears in three places: its category page, its city page and PakListings search — the same places people use to find a trade or a supplier.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <MessageCircle className="w-8 h-8 text-cyan-700" />
              <h3 className="font-bold text-slate-900 text-base">Enquiries Come Straight to You</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Call and WhatsApp buttons sit on your profile, so customers reach you directly — no middleman, no commission taken on enquiries.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3">
              <ListChecks className="w-8 h-8 text-violet-600" />
              <h3 className="font-bold text-slate-900 text-base">Hours, Services & Products on Show</h3>
              <p className="text-xs text-slate-600 leading-relaxed">List your opening hours, services and main products on the profile, so a customer knows what you do — and what you charge for — before they call.</p>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center flex-wrap">
            <Link
              href="/register" prefetch={false}
              className="px-7 py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-2xl shadow-lg shadow-cyan-700/20 transition-all"
            >
              Create a free account
            </Link>
            <Link
              href="/add-business" prefetch={false}
              className="px-7 py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-2xl transition-all"
            >
              Start your listing
            </Link>
          </div>
        </section>

        {/* BLOG / GUIDES */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-700">Guides & Insights</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Guides That Help You Choose Before You Call
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-cyan-700 hover:underline">
              Explore Blog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-3 hover:border-cyan-500 transition-colors">
                <span className="text-[11px] font-bold text-cyan-700">{post.category}</span>
                <h3 className="font-bold text-slate-900 text-sm">{post.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{post.excerpt}</p>
                <p className="text-[11px] text-slate-400 pt-1">{post.readTime}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm">
              Answers about searching, listing, pricing and contacting businesses on PakListings.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-2">
                <h3 className="font-bold text-slate-900 text-base">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DIRECTORY CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center max-w-4xl mx-auto space-y-6">
            <Building2 className="w-10 h-10 text-cyan-400 mx-auto" />
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Search 183 Cities — or Put Your Business in Them
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Look through businesses by category and city — or list your own business for a one-time fee from PKR 99, with a profile page customers can call or WhatsApp straight away.
            </p>
            <div className="flex items-center gap-3 justify-center flex-wrap">
              <Link
                href="/categories"
                className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Browse Categories
              </Link>
              <Link
                href="/add-business" prefetch={false}
                className="px-6 py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-xs rounded-xl transition-colors"
              >
                Start your listing — from PKR 99
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS + VERIFICATION */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              From Submission to the Next Weekly Release
            </h2>
            <p className="text-sm text-slate-500 max-w-2xl mx-auto">
              No profile appears here by accident. Every listing is submitted by the business itself, checked by our team, and published in the next weekly release.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3">
              <ListChecks className="w-8 h-8 text-cyan-700" />
              <h3 className="font-extrabold text-slate-900">1. The owner submits</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The owner creates an account and fills in the eight-step form: contact details, category, city, hours, services and products — then picks a tier and uploads payment proof.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3">
              <ShieldCheck className="w-8 h-8 text-cyan-700" />
              <h3 className="font-extrabold text-slate-900">2. Our team reviews</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Before approving, we check the essentials: a genuine business name, a working phone number, the right category and city, and a valid payment proof. Spam and duplicates get rejected.
              </p>
            </div>
            <div className="bg-white rounded-3xl border border-slate-200 p-7 space-y-3">
              <MessageCircle className="w-8 h-8 text-cyan-700" />
              <h3 className="font-extrabold text-slate-900">3. It publishes at the weekly release</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Approved profiles go live at the next weekly release — in their category, city and search. Customers reach the business by phone or WhatsApp themselves, with no commission taken and nobody in the middle.
              </p>
            </div>
          </div>
          <p className="text-center text-xs text-slate-500">
            Read the full standards in our{' '}
            <Link href="/verification-policy" className="text-cyan-700 font-semibold hover:underline">verification policy</Link>{' '}
            and{' '}
            <Link href="/editorial-policy" className="text-cyan-700 font-semibold hover:underline">editorial policy</Link>,
            and report a listing that is wrong via{' '}
            <Link href="/report-abuse" className="text-cyan-700 font-semibold hover:underline">Report Abuse</Link>.
          </p>
        </section>

        {/* FINAL CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-cyan-800 via-cyan-900 to-violet-900 rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col lg:flex-row justify-between items-center gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Be the Business They Find — and Can Call
              </h2>
              <p className="text-cyan-100 text-xs sm:text-sm leading-relaxed">
                Create an account, add your business in eight short steps and upload your payment proof. Approved listings publish at the next weekly release — in your category, your city and search.
              </p>
            </div>

            <div className="flex items-center gap-4 flex-wrap justify-center shrink-0">
              <Link
                href="/add-business" prefetch={false}
                className="px-8 py-4 bg-violet-500 hover:bg-violet-600 text-white font-extrabold text-sm rounded-2xl shadow-xl transition-all flex items-center gap-2"
              >
                <span>Get your business listed — from PKR 99</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/register" prefetch={false}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-extrabold text-sm rounded-2xl transition-all"
              >
                Join PakListings free
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <ListBusinessCta />
      {/* WebMCP: registers the in-page search tool only where the browser
          exposes document.modelContext; inert everywhere else. */}
      <WebMcpRegister />
    </div>
  )
}
