import { Search, Users, Globe, Award, TrendingUp, MapPin } from 'lucide-react'

export default function AboutSection() {
  return (
    <section className="w-full border-y border-gray-100 bg-gradient-to-b from-slate-50/80 to-white" aria-labelledby="what-is-paklistings">
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20 max-w-5xl">
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wide mb-4">
            <Globe className="w-3.5 h-3.5" />
            Pakistan Business Directory
          </span>
          <h2 id="what-is-paklistings" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 tracking-tight">
            What is PakListings?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            PakListings is Pakistan's open business directory — no login walls, no hidden numbers. Browse verified <strong>local businesses by city</strong> and{' '}
            <a className="text-primary font-medium hover:underline" href="/categories/" title="Browse all business categories in Pakistan">
              business categories in Pakistan
            </a>
            , and put your own business up from PKR 99 one-time — so customers from Karachi to Islamabad can reach you directly.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 sm:mb-12">
          <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Search & Discover</h3>
              <p className="text-sm text-gray-600">Pick a city and a trade, open a profile, and call or message straight away.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">One-Time Listing Fee</h3>
              <p className="text-sm text-gray-600">Your profile goes live once approved — a one-time fee from PKR 99, no subscription, no card.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-cyan-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Pakistan Wide</h3>
              <p className="text-sm text-gray-600">Local guides for towns and cities across Pakistan, big and small.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 p-4 sm:p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Verified Info</h3>
              <p className="text-sm text-gray-600">Every listing is reviewed before it goes public.</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex flex-col items-center gap-3 sm:gap-4">
            <a 
              href="/add-business/"
              title="Add your business listing on PakListings — from PKR 99 one-time"
              className="relative overflow-visible inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold bg-cyan-700 hover:bg-cyan-800 text-white h-12 px-6 py-4 sm:py-5 md:py-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 transition-colors"
            >
              <span className="relative z-10 inline-flex items-center">
                <span>Add Your Business</span>
                <span className="ml-2 underline underline-offset-4 decoration-cyan-300">from PKR 99</span>
              </span>
            </a>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">Be among the first businesses listed</p>
          </div>
        </div>
      </div>
    </section>
  )
}
