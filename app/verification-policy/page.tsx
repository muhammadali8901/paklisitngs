import { Metadata } from 'next'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Verification Policy | PakListings Badges & Business Checks',
  description: 'How PakListings checks businesses and professionals before awarding a Verified Badge: phone and address checks, documents, and when verification can be removed.',
  alternates: {
    canonical: 'https://www.paklistings.com/verification-policy/',
  },
  openGraph: {
    title: 'Verification Policy | PakListings Badges & Business Checks',
    description: 'How PakListings checks businesses and professionals before awarding a Verified Badge: phone and address checks, documents, and when verification can be removed.',
    url: 'https://www.paklistings.com/verification-policy/',
    type: 'website',
  },
}

export default function VerificationPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Verification Policy & Badge Protocol
          </h1>
          <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4">
            Last Updated: August 2026 • PakListings Directory Ecosystem
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            {/* Core Disclaimer Box */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-5 text-cyan-950 font-medium space-y-1">
              <strong className="block text-cyan-950 font-bold">Important Verification Notice:</strong>
              <p>
                When the Verified Badge launches, PakListings verification will indicate that the listing or profile completed PakListings&apos;s verification process. Verification does not independently guarantee every claim made by the business or individual.
              </p>
            </div>

            <p>
              The <strong>Verified Badge</strong> on PakListings is launching soon and is not available yet. When it opens, it will indicate that a business listing or professional profile has undergone a document check to confirm primary identity, operational contact details, and administrative legitimacy.
            </p>

            <h2 className="text-xl font-bold text-slate-900 pt-4">1. Business Verification Steps (When the Badge Launches)</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Phone & WhatsApp Confirmation:</strong> Will involve direct contact confirmation with authorized business representatives.</li>
              <li><strong>Physical Address Validation:</strong> Will involve a geolocation check and mapping to verified Pakistani commercial areas.</li>
              <li><strong>Official Documentation (Optional/Enterprise):</strong> May involve review of FBR NTN certificate, SECP corporate incorporation, or commercial utility bills.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">2. Professional Profile Verification</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Identity & Role Confirmation:</strong> Will involve verification of public work, official website, portfolio, or verified LinkedIn presence.</li>
              <li><strong>Direct Contact Routes:</strong> Will involve validation that listed phone, email, and WhatsApp channels reach the individual professional.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 pt-4">3. Revocation of Verified Status</h2>
            <p>
              When the badge launches, PakListings will reserve the right to suspend or revoke verification status if an entity changes contact information without notification, provides misleading information, or receives substantiated unresolved user complaints.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
