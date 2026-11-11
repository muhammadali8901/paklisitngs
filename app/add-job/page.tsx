'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { Briefcase, ArrowRight, Info } from 'lucide-react'
import { toast } from 'sonner'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { CITIES } from '@/lib/data'
import { writeOwnerContact } from '@/lib/owner-contact'
import { safeErrorMessage } from '@/lib/user-error'
import { queueSubmissionEmails } from '@/lib/mail'
import TierSelect from '@/components/tier-select'
import PaymentScreen from '@/components/payment-screen'
import TurnstileWidget from '@/components/turnstile-widget'
import { isTurnstileWidgetEnabled, verifyTurnstileTokenClient } from '@/lib/turnstile'
import type { ListingTier } from '@/lib/tiers'
import CityCombobox from '@/components/city-combobox'

const DRAFT_KEY = 'paklistings_add_job_draft'

type JobDraft = {
  title?: string
  companyName?: string
  city?: string
  jobType?: string
  salaryRange?: string
  contact?: string
  description?: string
  tier?: ListingTier
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const JOB_TYPES = ['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship']

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-700'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AddJobPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  // True once Firebase has reported the first auth state. The form
  // renders before that (and for signed-out visitors) so Googlebot
  // and first-time visitors see the real page; only the submit is
  // gated behind sign-in.
  const [authChecked, setAuthChecked] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [tier, setTier] = useState<ListingTier>('basic')
  // After the post SAVES, the payment screen takes over this page —
  // the submission email goes out only once the proof is submitted.
  const [saved, setSaved] = useState<{ id: string; name: string } | null>(null)
  const [companyName, setCompanyName] = useState('')
  const [city, setCity] = useState('')
  const [jobType, setJobType] = useState('')
  const [salaryRange, setSalaryRange] = useState('')
  const [contact, setContact] = useState('')
  const [description, setDescription] = useState('')

  // Draft restore: a signed-out visitor who filled the form, was sent
  // to sign in on submit, and came back via /login?next= lands here
  // with their entries intact (same tab, sessionStorage).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as JobDraft
        if (typeof draft.title === 'string') setTitle(draft.title)
        if (typeof draft.companyName === 'string') setCompanyName(draft.companyName)
        if (typeof draft.city === 'string') setCity(draft.city)
        if (typeof draft.jobType === 'string') setJobType(draft.jobType)
        if (typeof draft.salaryRange === 'string') setSalaryRange(draft.salaryRange)
        if (typeof draft.contact === 'string') setContact(draft.contact)
        if (typeof draft.description === 'string') setDescription(draft.description)
        if (draft.tier) setTier(draft.tier)
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
    if (!user) {
      // Save the completed form so the sign-in round-trip does not
      // wipe it; /login?next= brings the user straight back here.
      try {
        sessionStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ title, companyName, city, jobType, salaryRange, contact, description, tier })
        )
      } catch {
        // Storage unavailable — continue to sign-in anyway.
      }
      toast.info('Please sign in to post your job — you will come straight back here.')
      router.push('/login?next=/add-job')
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
      const ref = await addDoc(collection(db, 'jobs'), {
        title: title.trim(),
        slug: `${slugify(title)}-${slugify(city)}`,
        companyName: companyName.trim(),
        city,
        jobType,
        salaryRange: salaryRange.trim(),
        contact: contact.trim(),
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
      const contactSaved = await writeOwnerContact('jobs', ref.id, user.uid, user.email || '')
      if (!contactSaved) {
        toast.warning('Job saved, but your contact email could not be stored — admin messages about this listing may not reach you. Please contact support.')
      }
      // The post is SAVED now; the payment screen below collects the
      // tier payment. Submission emails go out only after the proof is
      // submitted (see onSubmitted on the PaymentScreen).
      setSaved({ id: ref.id, name: title.trim() })
      toast.success('Job saved — complete your payment below.')
    } catch (err: any) {
      toast.error(`Could not submit your job post: ${safeErrorMessage(err)}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Payment step: the post is saved; collect the tier payment here.
  if (saved && user) {
    return (
      <>
        <Navbar />
        <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4 flex items-center justify-center">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
            <PaymentScreen
              tier={tier}
              listingType="job"
              listingId={saved.id}
              listingName={saved.name}
              ownerId={user.uid}
              ownerEmail={user.email || ''}
              onSubmitted={async () => {
                // Emails: owner gets "received, under review", admin gets
                // a new-submission notification. Both only queue into
                // `mail` and never throw.
                await queueSubmissionEmails({
                  kind: 'job',
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
      <main className="bg-[#F8FAFC] text-slate-800 font-sans min-h-screen py-16 px-4">
        {authChecked && !user && (
          <div className="max-w-lg mx-auto mb-4 p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 font-medium flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              You can fill in the form now — you will be asked to sign in when you submit.{' '}
              <Link href="/login?next=/add-job" className="text-cyan-700 font-bold hover:underline">
                Sign in
              </Link>
              {' '}or{' '}
              <Link href="/register?next=/add-job" className="text-cyan-700 font-bold hover:underline">
                create an account
              </Link>
              .
            </span>
          </div>
        )}
        <div className="max-w-lg w-full mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-violet-50 text-violet-600 mb-3">
              <Briefcase className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Post a Job</h1>
            <p className="text-xs text-slate-500 mt-1">One-time job post from PKR 99 — reach candidates across Pakistan</p>
            <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto">
              Write the post the way a candidate reads it: the exact role, what the job pays, where
              it is and how to apply. Posts are reviewed before they go public, and applicants
              contact you directly on the phone or email you give.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Job Title *</label>
              <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Sales Executive" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Company Name *</label>
              <input type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Pak Tech Solutions" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City *</label>
                <CityCombobox required value={city} onChange={setCity} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Job Type *</label>
                <select required value={jobType} onChange={(e) => setJobType(e.target.value)} className={inputClass}>
                  <option value="" disabled>Select job type</option>
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Salary Range</label>
              <input type="text" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} placeholder="PKR 60,000 – 80,000 / month" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Apply — Phone or Email *</label>
              <input type="text" required value={contact} onChange={(e) => setContact(e.target.value)} placeholder="+92 300 1234567 or hr@company.pk" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Job Description *</label>
              <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe the role, responsibilities, required experience, and how to apply." className={inputClass} />
            </div>

            <div className="flex gap-2.5 p-3.5 bg-cyan-50 border border-cyan-100 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <span>Your job post is reviewed after you submit. Once the payment is verified and the post is approved, it appears publicly on PakListings.</span>
            </div>

            <TierSelect value={tier} onChange={setTier} />

            <TurnstileWidget onToken={setTurnstileToken} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Posting...' : 'Post Job'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <section className="max-w-lg mx-auto mt-8" aria-label="Frequently asked questions">
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">What should a job post include?</h3>
              <p className="text-sm text-slate-600 mt-1">
                The exact job title, your company name, the city, the job type and a phone number or
                email candidates can apply to. Add a salary range — posts that state pay get more
                serious applicants — and describe the role, the experience needed and how to apply.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">What happens after I submit?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your post is saved, then you pay for your plan and upload a payment screenshot. We
                verify the payment and review the post — once approved, it appears publicly on the
                jobs board and we email you.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">How much does a job post cost?</h3>
              <p className="text-sm text-slate-600 mt-1">
                A one-time payment, not a monthly subscription: Basic PKR 99, Premium PKR 199 or
                Featured PKR 299. Premium and Featured let you request edits to your post later;
                Basic does not.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">How do candidates apply?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Directly to you, on the phone number or email you put on the post. There is no
                application form in between — a candidate who calls you has already read the role,
                the city and the salary range.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
