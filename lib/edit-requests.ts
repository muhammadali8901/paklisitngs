// ============================================================
// PakListings — listing edit requests
// ------------------------------------------------------------
// Premium / Featured owners cannot edit a live listing
// directly. They submit an edit REQUEST from their dashboard;
// an admin approves or rejects it. An approved edit goes live
// at the next weekly release boundary (lib/release.ts) — the
// same 7-day batch rhythm as newly approved businesses.
//
// The admin folds approved changes into the listing's
// `pendingEdit` field with `editEffectiveAt` set to the next
// release boundary. Public pages merge pendingEdit only once
// that boundary has passed (applyPendingEdit, used by
// lib/public-listings.ts) — the listing document itself is
// never rewritten by the owner, so a forged client write
// cannot change live content.
// ============================================================

import { nextRelease } from '@/lib/release'

export type EditRequestStatus = 'pending' | 'approved' | 'rejected'

export type EditRequest = {
  id: string
  listingType: 'business' | 'company' | 'job' | 'professional'
  listingId: string
  listingName: string
  ownerId: string
  ownerEmail: string
  /** Partial listing fields the owner asked to change. */
  changes: Record<string, any>
  status: EditRequestStatus
  adminNote?: string
  effectiveAt?: any
  createdAt?: any
}

/**
 * Fields an owner may request to change, per listing type.
 * Anything outside this allowlist is dropped when the admin
 * applies a request — status, tier, payment and ownership
 * fields can never be smuggled through an edit.
 */
export const EDITABLE_FIELDS: Record<EditRequest['listingType'], string[]> = {
  business: ['name', 'phone', 'whatsapp', 'description', 'address', 'area', 'website', 'facebook', 'instagram', 'youtube'],
  company: ['name', 'industry', 'phone', 'description', 'address', 'website'],
  job: ['title', 'companyName', 'city', 'jobType', 'salaryRange', 'contact', 'description'],
  professional: ['name', 'profession', 'specialization', 'headline', 'city', 'experience', 'phone', 'whatsapp', 'email', 'website', 'address', 'description', 'skills', 'services', 'education', 'languages'],
}

/** Human labels for the editable fields, used by admin + dashboard. */
export const EDITABLE_FIELD_LABELS: Record<string, string> = {
  name: 'Name',
  title: 'Job title',
  companyName: 'Company name',
  industry: 'Industry',
  city: 'City',
  jobType: 'Job type',
  phone: 'Phone',
  whatsapp: 'WhatsApp',
  salaryRange: 'Salary range',
  contact: 'Apply contact',
  description: 'Description',
  address: 'Address',
  area: 'Area',
  website: 'Website',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  profession: 'Profession',
  specialization: 'Specialization',
  headline: 'Tagline',
  experience: 'Experience',
  email: 'Email',
  skills: 'Skills',
  services: 'Services offered',
  education: 'Education',
  languages: 'Languages',
}

/** Keep only allowlisted, non-empty changes for a listing type. */
export function sanitizeChanges(listingType: EditRequest['listingType'], changes: Record<string, any>): Record<string, any> {
  const allowed = EDITABLE_FIELDS[listingType] || []
  const out: Record<string, any> = {}
  for (const key of allowed) {
    const v = changes[key]
    if (typeof v === 'string' && v.trim().length > 0) out[key] = v.trim()
  }
  return out
}

function effectiveMs(value: any): number | null {
  if (value === null || value === undefined) return null
  if (typeof value?.toMillis === 'function') return value.toMillis()
  if (typeof value === 'number') return value
  const t = Date.parse(String(value))
  return Number.isNaN(t) ? null : t
}

/**
 * Merge approved, already-effective edit requests onto a listing
 * for public display. Requests apply oldest-effective first, so a
 * later edit wins a field over an earlier one. Pending or
 * future-effective requests never change the public view.
 */
export function applyApprovedEdits<T extends Record<string, any>>(base: T, requests: EditRequest[], nowMs: number): T {
  const approved = requests
    .filter((r) => r.status === 'approved')
    .map((r) => ({ ...r, ms: effectiveMs(r.effectiveAt) }))
    .filter((r) => r.ms !== null && (r.ms as number) <= nowMs)
    .sort((a, b) => (a.ms as number) - (b.ms as number))
  if (approved.length === 0) return base
  const merged: Record<string, any> = { ...base }
  for (const r of approved) {
    const clean = sanitizeChanges(r.listingType, r.changes || {})
    Object.assign(merged, clean)
  }
  return merged as T
}

/**
 * Merge an admin-folded `pendingEdit` onto a listing document for
 * public display — but only once its `editEffectiveAt` boundary
 * has passed. Handles both raw Firestore Timestamps (admin pages)
 * and serialized epoch millis (public-listings.ts).
 */
export function applyPendingEdit<T extends Record<string, any>>(
  base: T,
  listingType: EditRequest['listingType'],
  nowMs: number
): T {
  const pending = (base as any).pendingEdit
  const eff = effectiveMs((base as any).editEffectiveAt)
  if (!pending || typeof pending !== 'object' || eff === null || eff > nowMs) return base
  const clean = sanitizeChanges(listingType, pending)
  if (Object.keys(clean).length === 0) return base
  return { ...base, ...clean } as T
}

/** The boundary at which an edit approved right now will go live. */
export function nextEditRelease(nowMs: number): number {
  return nextRelease(nowMs)
}
