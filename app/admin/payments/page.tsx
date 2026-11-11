'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { db } from '@/lib/firebase'
import { collection, getDocs, doc, getDoc, updateDoc, writeBatch, serverTimestamp } from 'firebase/firestore'
import { toast } from 'sonner'
import { ExternalLink } from 'lucide-react'
import { StatusBadge, AdminLoading, AdminEmpty, formatDate, approveBtn, rejectBtn, neutralBtn } from '@/components/admin-shared'
import { queuePaymentApprovedEmail } from '@/lib/mail'
import { tierLabel, tierPrice, formatPKR } from '@/lib/tiers'

type Item = { id: string; data: any; listing?: any }

// Collection + admin list page for a proof's listing type, so a proof
// uploaded against a rejected listing can be shown WITH that listing's
// rejection context (and linked back to it) instead of as a bare name.
const LISTING_COL: Record<string, string> = {
  company: 'companies',
  job: 'jobs',
  professional: 'professionals',
  business: 'businesses',
}
const LISTING_ADMIN_PAGE: Record<string, string> = {
  company: '/admin/companies',
  job: '/admin/jobs',
  professional: '/admin/professionals',
  business: '/admin/businesses',
}

export default function AdminPaymentsPage() {
  const [items, setItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState<string | null>(null)
  const [notes, setNotes] = useState<Record<string, string>>({})
  // Pagination (20/page): proof docs carry ~1MB data-URL images, so
  // rendering the whole list at once is heavy. The list is sorted
  // client-side first (pending/rejected-listing/newest), then sliced.
  const [page, setPage] = useState(1)
  const PAGE_SIZE = 20
  const pageCount = Math.max(1, Math.ceil(items.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = items.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)
  // Full-size proof viewer: data-URL proofs cannot open in a new tab
  // (browsers block top-level navigation to data: URLs), so view inline.
  const [viewingUrl, setViewingUrl] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, 'payment_proofs'))
        const rows: Item[] = []
        snap.forEach((d) => rows.push({ id: d.id, data: d.data() }))
        // Attach each proof's listing (best effort — a missing listing
        // must never break the proofs list) so proofs re-uploaded
        // against a REJECTED listing carry that context on the card.
        await Promise.all(
          rows.map(async (row) => {
            const col = LISTING_COL[row.data.listingType] || 'businesses'
            if (!row.data.listingId) return
            try {
              const lsnap = await getDoc(doc(db, col, row.data.listingId))
              if (lsnap.exists()) {
                const ld = lsnap.data() as any
                row.listing = {
                  status: ld.status || 'pending',
                  rejectionReasons: Array.isArray(ld.rejectionReasons) ? ld.rejectionReasons : [],
                  rejectionNote: ld.rejectionNote || '',
                  slug: ld.slug || '',
                }
              }
            } catch {
              // Listing unreadable — proof still shows without context.
            }
          })
        )
        // Pending first; within pending, proofs for rejected listings
        // first (those are re-uploads an admin can approve straight
        // into a live listing); then newest first within each group.
        const rank = (s: string) => (s === 'pending' ? 0 : s === 'approved' ? 1 : 2)
        rows.sort((a, b) => {
          const r = rank(a.data.status || 'pending') - rank(b.data.status || 'pending')
          if (r !== 0) return r
          const ra = a.listing?.status === 'rejected' ? 0 : 1
          const rb = b.listing?.status === 'rejected' ? 0 : 1
          if (ra !== rb) return ra - rb
          return (b.data.createdAt?.toMillis?.() || 0) - (a.data.createdAt?.toMillis?.() || 0)
        })
        setItems(rows)
      } catch {
        toast.error('Could not load payment proofs.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const listingColFor = (listingType?: string) =>
    listingType === 'company' ? 'companies' : listingType === 'job' ? 'jobs' : listingType === 'professional' ? 'professionals' : 'businesses'

  const methodLabel = (method?: string) =>
    method === 'jazzcash' ? 'JazzCash' : method === 'mashreq' ? 'Mashreq Bank' : 'Easypaisa'

  const approve = async (item: Item) => {
    const { id, data } = item
    setBusy(id)
    try {
      const listingCol = listingColFor(data.listingType)
      // Atomic: the listing update and the proof update commit in one
      // batched write — a failure can no longer leave the listing
      // approved while the proof stays pending (or vice versa). The
      // approval email is queued only after the batch commits.
      const batch = writeBatch(db)
      if (data.tier) {
        // Tier payment: approving the proof ALSO approves the listing
        // itself. Businesses join the weekly release batch via
        // approvedAt; companies, jobs and professional profiles go
        // live immediately. A Featured-tier approval ALSO sets the
        // featured flag (single source of truth for the homepage
        // Featured section, the badge and featured-first sorting) —
        // Basic/Premium leave featured untouched.
        if (data.listingId) {
          batch.update(doc(db, listingCol, data.listingId), {
            paymentStatus: 'paid',
            status: 'approved',
            approvedAt: serverTimestamp(),
            tier: data.tier,
            ...(data.tier === 'featured'
              ? { featured: true, featuredAt: serverTimestamp() }
              : {}),
            rejectionReasons: [],
            rejectionNote: '',
            rejectedAt: null,
          })
        }
      } else {
        const flag = data.plan === 'verified'
          ? { verified: true }
          : { featured: true, featuredAt: serverTimestamp() }
        if (data.listingId) {
          batch.update(doc(db, listingCol, data.listingId), flag)
        }
      }
      batch.update(doc(db, 'payment_proofs', id), {
        status: 'approved',
        reviewedAt: serverTimestamp(),
      })
      await batch.commit()
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, status: 'approved' } } : it)))
      await queuePaymentApprovedEmail(item)
      toast.success(
        data.tier
          ? `Payment verified — ${data.listingName || 'listing'} approved (${tierLabel(data.tier)}).`
          : `Proof approved — ${data.listingName || 'listing'} is now ${data.plan === 'verified' ? 'Verified' : 'Featured'}.`
      )
    } catch {
      toast.error('Approval failed — check the listing id and permissions, then try again.')
    } finally {
      setBusy(null)
    }
  }

  const reject = async (item: Item) => {
    const { id, data } = item
    setBusy(id)
    try {
      if (data.tier) {
        // Tier payment rejected: the listing stays pending and the
        // owner can upload a new proof from their dashboard.
        if (data.listingId) {
          try {
            await updateDoc(doc(db, listingColFor(data.listingType), data.listingId), {
              paymentStatus: 'payment_rejected',
            })
          } catch {
            // Listing update is best effort — the proof rejection below
            // is the record that matters.
          }
        }
        await updateDoc(doc(db, 'payment_proofs', id), {
          status: 'rejected',
          adminNote: notes[id]?.trim() || '',
          reviewedAt: serverTimestamp(),
        })
        setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, status: 'rejected' } } : it)))
        toast.success('Proof rejected — owner can upload a new proof from their dashboard.')
        return
      }
      await updateDoc(doc(db, 'payment_proofs', id), {
        status: 'rejected',
        adminNote: notes[id]?.trim() || '',
        reviewedAt: serverTimestamp(),
      })
      setItems((prev) => prev.map((it) => (it.id === id ? { ...it, data: { ...it.data, status: 'rejected' } } : it)))
      toast.success('Proof rejected.')
    } catch {
      toast.error('Rejection failed — check permissions and try again.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Payment Proofs</h1>
        <p className="text-sm text-slate-500">
          Owners upload payment screenshots for listing tiers and Featured / Verified upgrades.
          Approving a tier proof also approves the listing; approving an upgrade proof switches
          the upgrade ON for that listing automatically. Click a screenshot thumbnail to view it
          full-size before deciding (proofs are stored as images, not links).
        </p>
      </div>

      {loading ? (
        <AdminLoading />
      ) : items.length === 0 ? (
        <AdminEmpty text="No payment proofs submitted yet." />
      ) : (
        <div className="space-y-3">
          {pageItems.map((item) => {
            const { id, data } = item
            const status = data.status || 'pending'
            return (
              <article key={id} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col md:flex-row gap-5">
                {data.proofUrl ? (
                  <button
                    type="button"
                    onClick={() => setViewingUrl(data.proofUrl)}
                    className="shrink-0 group relative"
                    aria-label={`View payment proof for ${data.listingName || 'listing'} full size`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={data.proofUrl}
                      alt={`Payment proof for ${data.listingName || 'listing'}`}
                      className="w-28 h-28 object-cover rounded-xl border border-slate-200 group-hover:opacity-80 transition-opacity"
                    />
                    <span className="absolute bottom-1.5 right-1.5 bg-slate-900/80 text-white rounded-md p-1">
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </button>
                ) : (
                  <div className="w-28 h-28 shrink-0 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-[11px] text-slate-400">
                    No image
                  </div>
                )}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-extrabold text-slate-900 text-sm">{data.listingName || 'Unnamed listing'}</h2>
                    <StatusBadge status={status} />
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold capitalize">
                      {data.tier
                        ? `${tierLabel(data.tier)} · ${formatPKR(data.amount || tierPrice(data.tier))} via ${methodLabel(data.method)} · ${data.listingType || 'business'}`
                        : `${data.plan || 'featured'} · ${data.listingType || 'business'}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Owner: {data.ownerEmail || '—'} · Submitted {formatDate(data.createdAt)}
                    {data.reviewedAt ? ` · Reviewed ${formatDate(data.reviewedAt)}` : ''}
                  </p>
                  {item.listing?.status === 'rejected' && (
                    <p className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      New proof for a previously rejected listing
                      {(item.listing.rejectionReasons?.length > 0 || item.listing.rejectionNote) &&
                        ` — rejected for: ${[...(item.listing.rejectionReasons || []), item.listing.rejectionNote].filter(Boolean).join(' · ')}`}
                      {' '}· Approving this proof also approves this same listing.{' '}
                      <Link href={LISTING_ADMIN_PAGE[data.listingType] || '/admin/businesses'} className="underline underline-offset-2">
                        View in {data.listingType === 'company' ? 'Companies' : data.listingType === 'job' ? 'Jobs' : data.listingType === 'professional' ? 'Professionals' : 'Businesses'}
                      </Link>
                    </p>
                  )}
                  {data.adminNote && status === 'rejected' && (
                    <p className="text-xs text-red-600">Admin note: {data.adminNote}</p>
                  )}
                  {status === 'pending' && (
                    <div className="flex flex-col sm:flex-row gap-2 pt-2">
                      <button type="button" disabled={busy === id} onClick={() => approve(item)} className={approveBtn}>
                        Approve &amp; Activate
                      </button>
                      <div className="flex gap-2 flex-1">
                        <label htmlFor={`note-${id}`} className="sr-only">Reason for rejection (optional)</label>
                        <input
                          id={`note-${id}`}
                          type="text"
                          value={notes[id] || ''}
                          onChange={(e) => setNotes((prev) => ({ ...prev, [id]: e.target.value }))}
                          placeholder="Reason if rejecting (optional)"
                          className="flex-1 min-w-0 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:border-red-300"
                        />
                        <button type="button" disabled={busy === id} onClick={() => reject(item)} className={rejectBtn}>
                          Reject
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )
          })}
        </div>
      )}
      {pageCount > 1 && (
        <div className="flex items-center justify-between pt-1">
          <p className="text-xs text-slate-500">
            Page {safePage} of {pageCount} · {items.length} proofs
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => setPage(safePage - 1)}
              className={`${neutralBtn} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={safePage >= pageCount}
              onClick={() => setPage(safePage + 1)}
              className={`${neutralBtn} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Next
            </button>
          </div>
        </div>
      )}
      {viewingUrl && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/80 flex items-center justify-center p-4"
          onClick={() => setViewingUrl(null)}
        >
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={viewingUrl}
              alt="Payment proof full size"
              className="max-w-full max-h-[85vh] object-contain rounded-xl bg-white"
            />
            <button
              type="button"
              onClick={() => setViewingUrl(null)}
              className="absolute -top-3 -right-3 bg-white text-slate-900 rounded-full px-3 py-1.5 text-xs font-extrabold shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
