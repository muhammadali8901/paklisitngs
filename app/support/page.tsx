import { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Headphones, Mail, Phone, MessageSquare, ClipboardList } from 'lucide-react'

export const metadata: Metadata = {
  title: 'PakListings Support – Help Desk, Email, Phone & WhatsApp',
  description: 'Reach the PakListings support desk by email, phone or WhatsApp for help with listings, payments, jobs and reviews — plus what to include so we can help fast.',
  alternates: {
    canonical: 'https://www.paklistings.com/support/',
  },
}

const topics = [
  { title: 'A listing stuck in review', text: 'Approval timing, what “pending” means, and why a submission was sent back.' },
  { title: 'Payment proof problems', text: 'A rejected proof, a wrong tier amount, or a duplicate payment on a listing.' },
  { title: 'Edits and deletions', text: 'Edit requests for Premium and Featured listings, and removing a listing you own.' },
  { title: 'Jobs and companies', text: 'Posting a job, a company profile that will not submit, or a vacancy that never appeared.' },
  { title: 'Reviews and reports', text: 'A review that should not be there, a fake listing, or abusive behaviour to report.' },
  { title: 'Account access', text: 'Signing in, a forgotten password, or an account that no longer matches your business.' },
]

export default function SupportPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen pb-16">
        <section className="bg-gradient-to-b from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white py-16 text-center border-b border-slate-800">
          <div className="max-w-4xl mx-auto px-4">
            <Headphones className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              PakListings Customer Support Desk
            </h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Talk to a person on the PakListings team about a listing, a payment, a job post or your
              account. Pick a channel below — email is best for anything that needs a screenshot or a
              document attached.
            </p>
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-4 py-12 space-y-10">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Need Assistance?</h2>
            <p className="text-sm text-slate-600 mb-6">Choose your preferred channel below or submit an online support inquiry.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Phone className="w-6 h-6 text-cyan-700 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Helpline</h4>
                <p className="text-xs text-slate-500 mt-1">+92 334 5636230</p>
                <p className="text-[11px] text-slate-400 mt-1">Call for listing and account help</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <Mail className="w-6 h-6 text-cyan-700 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">support@paklistings.com</p>
                <p className="text-[11px] text-slate-400 mt-1">Listing questions &amp; payment proofs</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <MessageSquare className="w-6 h-6 text-violet-600 mx-auto mb-2" />
                <h4 className="font-bold text-slate-900 text-sm">WhatsApp</h4>
                <p className="text-xs text-slate-500 mt-1">+92 334 5636230</p>
                <p className="text-[11px] text-slate-400 mt-1">Quick questions and screenshots</p>
              </div>
            </div>

            <p className="text-xs text-slate-500 mb-6">
              For account and administration matters you can also write to{' '}
              <a href="mailto:admin@paklistings.com" className="text-cyan-700 font-semibold hover:underline">admin@paklistings.com</a>.
              Messages are answered in the order they arrive — a clear message with the details below gets
              answered faster than a follow-up asking for an update.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md"
            >
              Open Support Ticket
            </Link>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
              <ClipboardList className="w-5 h-5 text-cyan-700" /> What to include in your message
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Most support threads stall on one missing detail. Before you send anything, gather these —
              with them, we can usually answer in a single reply:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600 leading-relaxed">
              <li><strong className="text-slate-900">The listing or job name</strong> exactly as it appears on the site, plus the page URL if you have it.</li>
              <li><strong className="text-slate-900">Your account email</strong> — the one the listing was submitted from.</li>
              <li><strong className="text-slate-900">What happened, in one or two lines</strong> — what you did, what you expected, and what you saw instead.</li>
              <li><strong className="text-slate-900">A screenshot</strong> of any error, rejection notice or payment proof, where relevant.</li>
            </ul>
            <p className="text-sm text-slate-600 leading-relaxed mt-4">
              Short answers are faster in the{' '}
              <Link href="/faqs" className="text-cyan-700 font-semibold hover:underline">FAQs</Link> — listing costs,
              approval timing and the weekly release, and the Verified Badge are all covered there. Step-by-step
              instructions for adding a business live in the{' '}
              <Link href="/help-center" className="text-cyan-700 font-semibold hover:underline">help center</Link>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">What support can help with</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topics.map((topic) => (
                <div key={topic.title} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-sm">{topic.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1.5">{topic.text}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mt-4">
              Support cannot promise a Google ranking, approve a listing that fails review, or share another
              owner&apos;s account details. Approval decisions follow the{' '}
              <Link href="/verification-policy" className="text-cyan-700 font-semibold hover:underline">verification policy</Link>{' '}
              and the{' '}
              <Link href="/business-listing-guidelines" className="text-cyan-700 font-semibold hover:underline">listing guidelines</Link>.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
