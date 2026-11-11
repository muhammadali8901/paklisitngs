import { CheckCircle2, ShieldCheck, Zap, Users } from 'lucide-react'

const features = [
  {
    title: "Verified Listings",
    description: "Nothing goes public unchecked — our team reviews each submission's contact details and address before it appears.",
    icon: <CheckCircle2 className="w-8 h-8 text-cyan-500" />
  },
  {
    title: "Nationwide Reach",
    description: "Businesses, professionals and jobs from 150+ Pakistani cities, all in one searchable place.",
    icon: <Users className="w-8 h-8 text-cyan-500" />
  },
  {
    title: "Direct Contact",
    description: "Phone, WhatsApp and email sit on the public profile — talk to the business, not to a login screen.",
    icon: <ShieldCheck className="w-8 h-8 text-purple-500" />
  },
  {
    title: "Fast & Mobile First",
    description: "Built mobile-first, so finding a nearby business takes seconds even on a slow connection.",
    icon: <Zap className="w-8 h-8 text-violet-500" />
  }
]

export default function TrustSection() {
  return (
    <section className="py-20 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#0F172A] mb-4">Why Trust PakListings?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            An open directory only works if people believe what they read on it — so every PakListings
            profile is reviewed, every number is shown in the open, and nothing sits behind a paywall.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-center"
            >
              <div className="inline-flex items-center justify-center p-3 bg-gray-50 rounded-xl mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 opacity-70 transition-all duration-500">
          <div className="flex items-center gap-2 font-bold text-gray-500 text-sm">
            <span className="text-xl">✅</span> Listings from PKR 99
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-500 text-sm">
            <span className="text-xl">🛡️</span> Verified Contact Details
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-500 text-sm">
            <span className="text-xl">📍</span> 150+ Pakistani Cities
          </div>
          <div className="flex items-center gap-2 font-bold text-gray-500 text-sm">
            <span className="text-xl">🤝</span> Direct WhatsApp Connect
          </div>
        </div>
      </div>
    </section>
  )
}
