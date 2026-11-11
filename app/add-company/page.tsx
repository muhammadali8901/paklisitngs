'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Factory, ArrowRight, Info } from 'lucide-react'
import { toast } from 'sonner'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CATEGORIES, CITIES } from '@/lib/data'
import CityCombobox from '@/components/city-combobox'
import { isValidPakistaniPhone, normalizePakistaniPhone, sanitizePhoneInput } from '@/lib/validation'
import { writeOwnerContact } from '@/lib/owner-contact'
import { safeErrorMessage } from '@/lib/user-error'
import { queueSubmissionEmails } from '@/lib/mail'
import TierSelect from '@/components/tier-select'
import PaymentScreen from '@/components/payment-screen'
import TurnstileWidget from '@/components/turnstile-widget'
import { isTurnstileWidgetEnabled, verifyTurnstileTokenClient } from '@/lib/turnstile'
import type { ListingTier } from '@/lib/tiers'

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const DRAFT_KEY = 'paklistings_add_company_draft'

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-700'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AddCompanyPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  // True once Firebase has reported the first auth state. The form
  // renders before that (and for signed-out visitors) so Googlebot
  // and first-time visitors see the real page; only the submit is
  // gated behind sign-in.
  const [authChecked, setAuthChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [tier, setTier] = useState<ListingTier>('basic')
  // After the profile SAVES, the payment screen takes over this page —
  // the submission email goes out only once the proof is submitted.
  const [saved, setSaved] = useState<{ id: string; name: string } | null>(null)
  const [industry, setIndustry] = useState('')
  const [city, setCity] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')

  // Draft restore: a signed-out visitor who filled the form, was sent
  // to sign in on submit, and came back via /login?next= lands here
  // with their entries intact (same tab, sessionStorage).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as {
          name?: string
          industry?: string
          city?: string
          phone?: string
          email?: string
          website?: string
          address?: string
          description?: string
          tier?: ListingTier
        }
        if (draft.name && typeof draft.name === 'string') {
          setName(draft.name)
          if (draft.industry) setIndustry(draft.industry)
          if (draft.city) setCity(draft.city)
          if (draft.phone) setPhone(draft.phone)
          if (draft.email) setEmail(draft.email)
          if (draft.website) setWebsite(draft.website)
          if (draft.address) setAddress(draft.address)
          if (draft.description) setDescription(draft.description)
          if (draft.tier) setTier(draft.tier)
        }
      }
    } catch {
      // Corrupt draft — ignore it and start with a blank form.
    }
    try {
      sessionStorage.removeItem(DRAFT_KEY)
    } catch {
      // Storage unavailable — nothing to clean up.
    }
  }, [])

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setAuthChecked(true)
    })
    return () => unsub()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidPakistaniPhone(phone)) {
      toast.error('Please enter a valid Pakistani mobile number (e.g. 0300 1234567 or +92 300 1234567).')
      return
    }
    if (!user) {
      // Save the completed form so the sign-in round-trip does not
      // wipe it; /login?next= brings the user straight back here.
      try {
        sessionStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ name, industry, city, phone, email, website, address, description, tier })
        )
      } catch {
        // Storage unavailable — continue to sign-in anyway.
      }
      toast.info('Please sign in to submit your company — you will come straight back here.')
      router.push('/login?next=/add-company')
      return
    }
    // Cloudflare Turnstile: when keys are set (user's job), a completed
    // check is required and verified server-side via /api/turnstile/verify.
    // With no keys configured the check is skipped and submit proceeds.
    if (isTurnstileWidgetEnabled()) {
      if (!turnstileToken) {
        toast.error('Please complete the security check before submitting.')
        return
      }
      const check = await verifyTurnstileTokenClient(turnstileToken)
      if (!check.success) {
        toast.error('Security check failed. Please try again.')
        return
      }
    }
    setIsSubmitting(true)
    try {
      const ref = await addDoc(collection(db, 'companies'), {
        name: name.trim(),
        slug: `${slugify(name)}-${slugify(city)}`,
        industry,
        city,
        phone: normalizePakistaniPhone(phone),
        email: email.trim(),
        website: website.trim(),
        address: address.trim(),
        description: description.trim(),
        ownerId: user.uid,
        ownerName: user.displayName || '',
        tier,
        paymentStatus: 'awaiting_payment',
        projects: [],
        status: 'pending',
        createdAt: serverTimestamp(),
      })
      // Owner contact (login email) is private: it goes to the
      // owner/admin-only subcollection, never into the main document
      // (see lib/owner-contact.ts). The write is non-fatal, but a
      // failure is surfaced: without it, admin reject/delete emails
      // silently fall back to the listing's public email field, which
      // may not be the owner's login email.
      const contactSaved = await writeOwnerContact('companies', ref.id, user.uid, user.email || '')
      if (!contactSaved) {
        toast.warning('Company saved, but your contact email could not be stored — admin messages about this listing may not reach you. Please contact support.')
      }
      // The profile is SAVED now; the payment screen below collects the
      // tier payment. Submission emails go out only after the proof is
      // submitted (see onSubmitted on the PaymentScreen).
      setSaved({ id: ref.id, name: name.trim() })
      toast.success('Company saved — complete your payment below.')
    } catch (err: any) {
      toast.error(`Could not submit your company: ${safeErrorMessage(err)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Payment step: the profile is saved; collect the tier payment here.
  if (saved && user) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
            <PaymentScreen
              tier={tier}
              listingType="company"
              listingId={saved.id}
              listingName={saved.name}
              ownerId={user.uid}
              ownerEmail={user.email || ''}
              onSubmitted={async () => {
                // Emails: owner gets "received, under review", admin gets
                // a new-submission notification. Both only queue into
                // `mail` and never throw.
                await queueSubmissionEmails({
                  kind: 'company',
                  name: saved.name,
                  city,
                  ownerEmail: user.email || '',
                  ownerName: user.displayName || '',
                })
                toast.success('Payment proof submitted — we will email you once it is verified.')
                router.push('/dashboard')
              }}
            />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
        <div className="max-w-lg w-full">
          {authChecked && !user && (
            <div className="mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                You can fill in the form now — you will be asked to sign in when you submit.{' '}
                <Link href="/login?next=/add-company" className="text-cyan-700 font-bold hover:underline">
                  Sign in
                </Link>
                {' '}or{' '}
                <Link href="/register?next=/add-company" className="text-cyan-700 font-bold hover:underline">
                  create an account
                </Link>
                .
              </span>
            </div>
          )}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-50 text-cyan-700 mb-3">
              <Factory className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Add Your Company</h1>
            <p className="text-xs text-slate-500 mt-1">One-time company profile from PKR 99 — put your firm in front of buyers</p>
            <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto">
              Buyers looking for a manufacturer, supplier or exporter start with industry and city.
              Give them both, plus what your firm actually makes or supplies, a working phone number
              and an address they can trust — then your profile is reviewed before it appears.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Company Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Pak Industries (Pvt) Ltd" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Industry *</label>
                <select required value={industry} onChange={(e) => setIndustry(e.target.value)} className={inputClass}>
                  <option value="" disabled>Select an industry</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>City *</label>
                <CityCombobox required value={city} onChange={setCity} className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" inputMode="tel" required value={phone} onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))} placeholder="+92 300 1234567" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="info@company.pk" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Website</label>
              <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://yourcompany.pk" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Office 303, Evacuee Trust Complex, F-5/1" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Tell buyers what your company does, your products or services, and your track record." className={inputClass} />
            </div>

            <div className="flex gap-2.5 p-3.5 bg-cyan-50 border border-cyan-100 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <span>Your company profile is reviewed after you submit. Once the payment is verified and the profile is approved, it appears publicly on PakListings.</span>
            </div>

            <TierSelect value={tier} onChange={setTier} />

            <TurnstileWidget onToken={setTurnstileToken} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Submitting...' : 'Submit Company'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          </div>

          <section className="mt-8" aria-label="Frequently asked questions">
            <h2 className="text-lg font-extrabold text-slate-900 mb-4">Frequently asked questions</h2>
            <div className="space-y-3">
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">What should a company profile include?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your company name, industry, city and phone number are required. Email, website,
                  address and a description are optional — but buyers judge a firm on them, so name
                  the products or services you actually supply and the sectors you serve.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">What happens after I submit?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Your company profile is saved, then you pay for your plan and upload a payment
                  screenshot. We verify the payment and review the profile — once approved, it goes
                  public on PakListings and we email you.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">How much does a company profile cost?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  A one-time payment, not a monthly subscription: Basic PKR 99, Premium PKR 199 or
                  Featured PKR 299. Premium and Featured let you request edits and showcase projects
                  on your profile; Basic does not.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">Do I need an account to add a company?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Yes. You can fill in the form first, and when you submit you will be asked to sign
                  in or create an account — you come straight back to this page afterwards, with your
                  entries intact.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-900 text-sm">How do buyers find my company?</h3>
                <p className="text-sm text-slate-600 mt-1">
                  Approved companies appear on the companies list and in search, so buyers can find
                  you by industry and city and contact you directly. If you are hiring, post the role
                  on the jobs board as well — it points candidates back to your firm.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
