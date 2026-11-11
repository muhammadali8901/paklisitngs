'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import { UserRound, ArrowRight, Info } from 'lucide-react'
import { toast } from 'sonner'
import { auth, db } from '@/lib/firebase'
import { onAuthStateChanged, User } from 'firebase/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { PROFESSIONS, PROFESSION_OTHER } from '@/lib/professions'
import { writeOwnerContact } from '@/lib/owner-contact'
import { safeErrorMessage } from '@/lib/user-error'
import { queueSubmissionEmails } from '@/lib/mail'
import { isValidPakistaniPhone, normalizePakistaniPhone, sanitizePhoneInput, isValidUrl, normalizeUrl, isValidEmail } from '@/lib/validation'
import TierSelect from '@/components/tier-select'
import PaymentScreen from '@/components/payment-screen'
import TurnstileWidget from '@/components/turnstile-widget'
import { isTurnstileWidgetEnabled, verifyTurnstileTokenClient } from '@/lib/turnstile'
import type { ListingTier } from '@/lib/tiers'
import CityCombobox from '@/components/city-combobox'

const DRAFT_KEY = 'paklistings_add_professional_draft'

type ProfessionalDraft = {
  name?: string
  profession?: string
  customProfession?: string
  specialization?: string
  headline?: string
  city?: string
  experience?: string
  phone?: string
  whatsapp?: string
  email?: string
  website?: string
  address?: string
  description?: string
  skills?: string
  services?: string
  education?: string
  languages?: string
  github?: string
  linkedin?: string
  facebook?: string
  portfolioUrl?: string
  tier?: ListingTier
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const inputClass =
  'w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-cyan-700'
const labelClass = 'block text-xs font-bold text-slate-700 mb-1'

export default function AddProfessionalPage() {
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
  const [profession, setProfession] = useState('')
  const [customProfession, setCustomProfession] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [headline, setHeadline] = useState('')
  const [city, setCity] = useState('')
  const [experience, setExperience] = useState('')
  const [phone, setPhone] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')
  const [skills, setSkills] = useState('')
  const [services, setServices] = useState('')
  const [education, setEducation] = useState('')
  const [languages, setLanguages] = useState('')
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [facebook, setFacebook] = useState('')
  const [portfolioUrl, setPortfolioUrl] = useState('')
  const [tier, setTier] = useState<ListingTier>('basic')
  // After the profile SAVES, the payment screen takes over this
  // page — the submission email goes out only once the proof is submitted.
  const [saved, setSaved] = useState<{ id: string; name: string } | null>(null)

  const resolvedProfession = profession === PROFESSION_OTHER ? customProfession.trim() : profession

  // Draft restore: a signed-out visitor who filled the form, was sent
  // to sign in on submit, and came back via /login?next= lands here
  // with their entries intact (same tab, sessionStorage).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(DRAFT_KEY)
      if (raw) {
        const draft = JSON.parse(raw) as ProfessionalDraft
        if (typeof draft.name === 'string') setName(draft.name)
        if (typeof draft.profession === 'string') setProfession(draft.profession)
        if (typeof draft.customProfession === 'string') setCustomProfession(draft.customProfession)
        if (typeof draft.specialization === 'string') setSpecialization(draft.specialization)
        if (typeof draft.headline === 'string') setHeadline(draft.headline)
        if (typeof draft.city === 'string') setCity(draft.city)
        if (typeof draft.experience === 'string') setExperience(draft.experience)
        if (typeof draft.phone === 'string') setPhone(draft.phone)
        if (typeof draft.whatsapp === 'string') setWhatsapp(draft.whatsapp)
        if (typeof draft.email === 'string') setEmail(draft.email)
        if (typeof draft.website === 'string') setWebsite(draft.website)
        if (typeof draft.address === 'string') setAddress(draft.address)
        if (typeof draft.description === 'string') setDescription(draft.description)
        if (typeof draft.skills === 'string') setSkills(draft.skills)
        if (typeof draft.services === 'string') setServices(draft.services)
        if (typeof draft.education === 'string') setEducation(draft.education)
        if (typeof draft.languages === 'string') setLanguages(draft.languages)
        if (typeof draft.github === 'string') setGithub(draft.github)
        if (typeof draft.linkedin === 'string') setLinkedin(draft.linkedin)
        if (typeof draft.facebook === 'string') setFacebook(draft.facebook)
        if (typeof draft.portfolioUrl === 'string') setPortfolioUrl(draft.portfolioUrl)
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
          JSON.stringify({ name, profession, customProfession, specialization, headline, city, experience, phone, whatsapp, email, website, address, description, skills, services, education, languages, github, linkedin, facebook, portfolioUrl, tier })
        )
      } catch {
        // Storage unavailable — continue to sign-in anyway.
      }
      toast.info('Please sign in to add your professional profile — you will come straight back here.')
      router.push('/login?next=/add-professional')
      return
    }

    if (!resolvedProfession) {
      toast.error('Please choose your profession (or pick Other and type it).')
      return
    }
    if (!isValidPakistaniPhone(phone)) {
      toast.error('Please enter a valid Pakistani mobile number (e.g. 0300 1234567).')
      return
    }
    if (whatsapp.trim() && !isValidPakistaniPhone(whatsapp)) {
      toast.error('Please enter a valid Pakistani WhatsApp number, or leave it blank to use your phone number.')
      return
    }
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid public contact email, or leave it blank.')
      return
    }
    for (const [label, value] of [
      ['Website', website],
      ['GitHub', github],
      ['LinkedIn', linkedin],
      ['Facebook', facebook],
      ['Portfolio', portfolioUrl],
    ] as const) {
      if (!isValidUrl(value)) {
        toast.error(`Please enter a valid ${label} link, or leave it blank.`)
        return
      }
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
      const ref = await addDoc(collection(db, 'professionals'), {
        name: name.trim(),
        slug: `${slugify(name)}-${slugify(resolvedProfession)}-${slugify(city)}`,
        profession: resolvedProfession,
        specialization: specialization.trim(),
        headline: headline.trim(),
        city,
        experience: experience.trim(),
        phone: normalizePakistaniPhone(phone),
        whatsapp: whatsapp.trim() ? normalizePakistaniPhone(whatsapp) : normalizePakistaniPhone(phone),
        // Public contact email the professional chooses to show on
        // their profile. The login email stays private — it goes to
        // the owner/admin-only subcollection (see writeOwnerContact).
        email: email.trim(),
        website: normalizeUrl(website),
        address: address.trim(),
        description: description.trim(),
        skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
        services: services.split(',').map((s) => s.trim()).filter(Boolean),
        education: education.trim(),
        languages: languages.trim(),
        github: normalizeUrl(github),
        linkedin: normalizeUrl(linkedin),
        facebook: normalizeUrl(facebook),
        portfolioUrl: normalizeUrl(portfolioUrl),
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
      const contactSaved = await writeOwnerContact('professionals', ref.id, user.uid, user.email || '')
      if (!contactSaved) {
        toast.warning('Profile saved, but your contact email could not be stored — admin messages about this listing may not reach you. Please contact support.')
      }
      // The profile is SAVED now; the payment screen below collects
      // the tier payment. Submission emails go out only after the proof
      // is submitted (see onSubmitted on the PaymentScreen).
      setSaved({ id: ref.id, name: name.trim() })
      toast.success('Profile saved — complete your payment below.')
    } catch (err: any) {
      toast.error(`Could not submit your profile: ${safeErrorMessage(err)}`)
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
              listingType="professional"
              listingId={saved.id}
              listingName={saved.name}
              ownerId={user.uid}
              ownerEmail={user.email || ''}
              onSubmitted={async () => {
                // Emails: owner gets "received, under review", admin gets
                // a new-submission notification. Both only queue into
                // `mail` and never throw.
                await queueSubmissionEmails({
                  kind: 'professional',
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
              <Link href="/login?next=/add-professional" className="text-cyan-700 font-bold hover:underline">
                Sign in
              </Link>
              {' '}or{' '}
              <Link href="/register?next=/add-professional" className="text-cyan-700 font-bold hover:underline">
                create an account
              </Link>
              .
            </span>
          </div>
        )}
        <div className="max-w-lg w-full mx-auto bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-2xl bg-violet-50 text-violet-600 mb-3">
              <UserRound className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Add Your Professional Profile</h1>
            <p className="text-xs text-slate-500 mt-1">One-time profile from PKR 99 — clients across Pakistan find you by profession and city</p>
            <p className="text-sm text-slate-600 mt-3 max-w-lg mx-auto">
              A good profile reads like a short introduction: who you are, what you do, how long
              you have done it, and how a client can reach you. Fill in the details a client
              would actually ask about — experience, services, skills and contact — and your
              profile goes public as its own page once it is reviewed and approved.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Ayesha Khan" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Profession *</label>
                <select required value={profession} onChange={(e) => setProfession(e.target.value)} className={inputClass}>
                  <option value="" disabled>Select your profession</option>
                  {PROFESSIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                  <option value={PROFESSION_OTHER}>Other</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>Specialization</label>
                <input type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g. Family Medicine, Tax Law" className={inputClass} />
              </div>
            </div>

            {profession === PROFESSION_OTHER && (
              <div>
                <label className={labelClass}>Your Profession *</label>
                <input type="text" required={profession === PROFESSION_OTHER} value={customProfession} onChange={(e) => setCustomProfession(e.target.value)} placeholder="Type your profession" className={inputClass} />
              </div>
            )}

            <div>
              <label className={labelClass}>Tagline</label>
              <input type="text" maxLength={120} value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="One line that tells clients what you do best" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>City *</label>
                <CityCombobox required value={city} onChange={setCity} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Experience (years)</label>
                <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} placeholder="e.g. 8" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone *</label>
                <input type="tel" required value={phone} onChange={(e) => setPhone(sanitizePhoneInput(e.target.value))} placeholder="0300 1234567" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>WhatsApp (optional)</label>
                <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(sanitizePhoneInput(e.target.value))} placeholder="Same as phone if blank" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Public Contact Email (optional)</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} />
                <p className="text-[11px] text-slate-500 mt-1">Shown on your public profile. Leave blank if clients should call you instead.</p>
              </div>
              <div>
                <label className={labelClass}>Website (optional)</label>
                <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="yourwebsite.com" className={inputClass} />
              </div>
            </div>

            <div>
              <label className={labelClass}>Address / Clinic / Office (optional)</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, area, city — where clients can find you" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>About You</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="A few lines about your work, your approach, and what clients can expect from you." className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Services Offered (comma separated)</label>
              <textarea value={services} onChange={(e) => setServices(e.target.value)} rows={2} placeholder="e.g. General consultation, Home visits, Online sessions" className={inputClass} />
            </div>

            <div>
              <label className={labelClass}>Skills (comma separated)</label>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="e.g. English, Urdu, Tax filing, React" className={inputClass} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Education / Qualification</label>
                <input type="text" value={education} onChange={(e) => setEducation(e.target.value)} placeholder="e.g. MBBS, University of the Punjab" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Languages</label>
                <input type="text" value={languages} onChange={(e) => setLanguages(e.target.value)} placeholder="e.g. Urdu, English, Punjabi" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>GitHub (optional)</label>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} placeholder="github.com/yourname" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LinkedIn (optional)</label>
                <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} placeholder="linkedin.com/in/yourname" className={inputClass} />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Facebook (optional)</label>
                <input type="text" value={facebook} onChange={(e) => setFacebook(e.target.value)} placeholder="facebook.com/yourpage" className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Portfolio Link (optional)</label>
                <input type="text" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} placeholder="yourportfolio.com" className={inputClass} />
              </div>
            </div>

            <div className="flex gap-2.5 p-3.5 bg-cyan-50 border border-cyan-100 rounded-xl text-xs text-slate-600">
              <Info className="w-4 h-4 text-cyan-700 shrink-0 mt-0.5" />
              <span>Your profile is reviewed after you submit. Once the payment is verified and the profile is approved, it appears publicly on PakListings with its own page.</span>
            </div>

            <TierSelect value={tier} onChange={setTier} />

            <TurnstileWidget onToken={setTurnstileToken} />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-cyan-700 hover:bg-cyan-800 text-white font-bold text-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Creating profile...' : 'Create My Profile'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <section className="max-w-lg mx-auto mt-8" aria-label="Frequently asked questions">
          <h2 className="text-lg font-extrabold text-slate-900 mb-4">Frequently asked questions</h2>
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">What does a professional profile include?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your name, tagline, profession and specialization, city, years of experience, phone
                and WhatsApp, a public email and website if you want them shown, your services,
                skills, education and languages — all on one public page that clients can find by
                profession and city.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">What happens after I submit?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your profile is saved, then you pay for your plan and upload a payment screenshot.
                We verify the payment and review the profile — once approved, it appears publicly
                with its own page and we email you.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">How much does a profile cost?</h3>
              <p className="text-sm text-slate-600 mt-1">
                A one-time payment, not a monthly subscription: Basic PKR 99, Premium PKR 199 or
                Featured PKR 299. Premium and Featured let you request edits to your profile later
                and add projects to it; Basic does not.
              </p>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <h3 className="font-bold text-slate-900 text-sm">Is my email shown publicly?</h3>
              <p className="text-sm text-slate-600 mt-1">
                Only the public contact email you type into the form — and only if you type one.
                The email you sign in with is never shown on your profile; it is kept private for
                admin messages about your listing.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
