import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { HelpCircle, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PakListings FAQs – Listing Costs, Jobs, Reviews & More',
  description: 'PakListings FAQs: listing costs from PKR 99 one-time, approval and the weekly release, posting jobs, reviews, companies, and fixing a rejected listing.',
  alternates: {
    canonical: 'https://www.paklistings.com/faqs/',
  },
}

const faqs = [
  {
    q: "How much does it cost to list a business on PakListings?",
    a: "Listing is paid, not free: a one-time fee of PKR 99 for Basic, PKR 199 for Premium, or PKR 299 for Featured. There is no monthly subscription and no commission on enquiries. Browsing the directory, searching, and calling or messaging a listed business are free for visitors, and creating an owner account costs nothing — the fee applies when you submit a listing."
  },
  {
    q: "How do I pay for a listing?",
    a: "Choose your tier at the end of the Add Business form, then pay through one of the payment methods shown on the payment screen and upload a screenshot of your payment as proof. Our team checks the proof before approving the listing. If the proof does not match the tier, or cannot be read, the listing is sent back with the reason shown in your dashboard."
  },
  {
    q: "What is the difference between Basic, Premium and Featured?",
    a: "Basic (PKR 99, one-time) lists your business after approval, with no edits afterwards — if details change, you delete the listing and submit a new one. Premium (PKR 199) adds edit requests from your dashboard and up to 3 projects on your listing. Featured (PKR 299) adds up to 5 projects and up to 2 blog posts, plus the same edit requests. All three appear in search, on their city page and on their category page."
  },
  {
    q: "How long does approval take, and when does my listing go live?",
    a: "Every submission is reviewed by a person on our team — business details, category and city fit, duplicates, and the payment proof. We aim to check most submissions within a few working days, but that is an aim, not a guarantee; it can take longer when volume is high or we need to clarify details with you. An approved listing goes live at the next weekly release, not the same hour, and then appears on its own page, in the businesses index, and on its category and city pages."
  },
  {
    q: "My listing was rejected — what now?",
    a: "The rejection reasons are shown on the listing in your dashboard and sent to your account email, so you can see exactly what to fix. Correct those points and resubmit. If the rejection was about the payment, a rejected paid-tier listing shows an 'Upload New Proof' option in your dashboard — upload a fresh, readable proof for the same listing instead of starting over."
  },
  {
    q: "How do I get a Verified Badge on PakListings?",
    a: "There is no Verified Badge to apply for yet — the badge programme has not opened. Once it does, expect a document check: evidence that the business is genuine and that you are allowed to speak for it. Until then, ask through the Advertise page or the contact page and we will tell you when it launches."
  },
  {
    q: "What happens to a review after someone writes it?",
    a: "A review only shows up after a person on our team has read it. Submissions that pass that check are the ones you see as ratings on the profile; made-up, paid-for or rewarded reviews are taken down, and a business owner can answer the reviews left on their own listing."
  },
  {
    q: "Can my company advertise a vacancy here?",
    a: "Yes — sign in, open your dashboard and choose 'Post a Job'. The form asks for the role, the company, the city and the way candidates should reach you. A job post uses the same one-time tiers as a business listing, and our team reads it before it appears. Candidates always apply to you directly, and you must never ask them to pay to apply."
  },
  {
    q: "How do I change or remove a listing I own?",
    a: "It depends on your tier. A Basic listing cannot be edited after submission — delete it from your dashboard and submit a new listing with the corrected details. Premium and Featured owners can request edits from their dashboard; an approved edit goes live at the next weekly release. To delete a listing, or if you cannot sign in to the owner account, contact us through the Contact Page or email admin@paklistings.com with proof of business ownership."
  },
  {
    q: "Who is the founder and CEO of PakListings?",
    a: "Muhammad Imran is the Founder and Chief Executive Officer (CEO) of PakListings (https://www.paklistings.com). His day job is building websites and AI tools — full-stack development, software engineering and technical SEO — and Imran Digitals (https://www.imrandigitals.com/) is his other venture. He built PakListings to give Pakistani businesses a findable place online across 183 cities and 24 categories. You can read about his background on the official PakListings About page (https://www.paklistings.com/about/)."
  }
]

export default function FAQsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a
      }
    }))
  }

  return (
    <>
      <Navbar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Short answers on listing costs, approval and the weekly release, jobs, reviews, companies and your account.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold text-slate-900 text-base flex items-start gap-2">
                  <HelpCircle className="w-5 h-5 text-cyan-700 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2.5 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
