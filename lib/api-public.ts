// ============================================================
// PakListings — public read-only API data layer (ora.ai Phase 2)
// ------------------------------------------------------------
// Server-only. Shapes the data the public API (/api/v1/*) and the
// MCP server (/api/mcp) may return. ANTI-SCRAPE RULE (standing
// order): ONLY fields that are already public on the listing pages
// are ever returned — name, slug, category, city, phone, website
// (when the owner published one), description, featured flag, and
// the public profile URL. Owner-private fields (ownerEmail,
// ownerId, payment proof / payment data, internal status, admin
// notes) are NEVER selected into the API shape, so they cannot
// leak through a new endpoint. Pagination is capped at 20/page and
// callers are rate-limited (lib/rate-limit.ts `api` preset) —
// there is no "export all" and no bulk dump.
// ============================================================

import { NextResponse } from 'next/server'
import { SEED_CARDS, fetchApprovedBusinesses, type ListingDoc } from '@/lib/public-listings'
import { SEED_BUSINESSES } from '@/lib/seed-businesses'
import { CATEGORIES, CITIES } from '@/lib/data'
import { isReleased, type ApprovedAtInput } from '@/lib/release'
import { applyPendingEdit } from '@/lib/edit-requests'
import {
  checkRateLimit,
  getClientIp,
  RATE_LIMITS,
  type RateLimitResult,
} from '@/lib/rate-limit'

export const API_BASE_URL = 'https://www.paklistings.com'
export const API_MAX_PER_PAGE = 20
export const API_DEFAULT_PER_PAGE = 20

/** Scopes named by the protected-resource metadata. `listings:read` is
 *  public (no credential needed); `listings:write` exists only as a
 *  website account action — no bearer token is ever issued for it. */
export const API_SCOPES = ['listings:read', 'listings:write'] as const

export type ApiBusiness = {
  name: string
  slug: string
  category: string
  city: string
  phone: string
  /** Only when the owner published a website on the public profile. */
  website?: string
  description: string
  featured: boolean
  /** Canonical public profile URL. */
  url: string
}

export type ApiCategory = { id: string; name: string; description: string; url: string }
export type ApiCity = { name: string; slug: string; url: string }

function slugify(value: string): string {
  return (value || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** A website URL is public only when the owner published a real http(s) URL. */
function publicWebsite(raw: unknown): string | undefined {
  if (typeof raw !== 'string') return undefined
  const value = raw.trim()
  if (!/^https?:\/\//i.test(value)) return undefined
  return value
}

/** Map one approved Firestore business doc to the public API shape. */
function docToApiBusiness(doc: ListingDoc): ApiBusiness | null {
  const data = applyPendingEdit(doc.data, 'business', Date.now()) as Record<string, unknown>
  const name = typeof data.name === 'string' ? data.name : ''
  const slug = typeof data.slug === 'string' && data.slug ? data.slug : doc.id
  if (!name || !slug) return null
  const out: ApiBusiness = {
    name,
    slug,
    category: typeof data.category === 'string' ? data.category : 'General',
    city: typeof data.city === 'string' ? data.city : '',
    phone: typeof data.phone === 'string' ? data.phone : '',
    description: typeof data.description === 'string' ? data.description : '',
    featured: data.featured === true,
    url: `${API_BASE_URL}/business/${slug}`,
  }
  const website = publicWebsite(data.website)
  if (website) out.website = website
  return out
}

/**
 * All public businesses for the API: the 43 static seed listings plus
 * approved + released owner listings (same release rule as the public
 * pages). A Firestore listing replaces a seed on slug clash, in place
 * — the same merge rule as lib/public-listings. Fail-soft: Firestore
 * errors leave the seed set standing, never an empty directory.
 */
export async function getApiBusinesses(): Promise<ApiBusiness[]> {
  const merged = new Map<string, ApiBusiness>()
  for (const card of SEED_CARDS) {
    merged.set(card.slug, {
      name: card.name,
      slug: card.slug,
      category: card.category,
      city: card.city,
      phone: card.phone,
      description: card.description,
      featured: card.featured,
      url: `${API_BASE_URL}/business/${card.slug}`,
    })
  }
  const now = Date.now()
  const rows = await fetchApprovedBusinesses()
  for (const row of rows) {
    const data = row.data as Record<string, unknown>
    if (!isReleased(data?.approvedAt as ApprovedAtInput, now)) continue
    const api = docToApiBusiness(row)
    if (api) merged.set(api.slug, api)
  }
  // Featured first, then name — same ordering as the public grids.
  return [...merged.values()].sort(
    (a, b) => Number(b.featured) - Number(a.featured) || a.name.localeCompare(b.name)
  )
}

export async function getApiBusinessBySlug(slug: string): Promise<ApiBusiness | null> {
  const clean = slugify(slug)
  if (!clean) return null
  const all = await getApiBusinesses()
  return all.find((b) => b.slug === clean) ?? null
}

export function getApiCategories(): ApiCategory[] {
  return CATEGORIES.map((c) => ({
    id: c.id,
    name: c.name,
    description: c.desc,
    url: `${API_BASE_URL}/category/${c.id}`,
  }))
}

export function getApiCities(): ApiCity[] {
  return CITIES.map((name) => ({
    name,
    slug: slugify(name),
    url: `${API_BASE_URL}/city/${slugify(name)}`,
  }))
}

export type BusinessSearchParams = {
  q?: string
  city?: string
  category?: string
  page?: number
  perPage?: number
}

export type PaginatedBusinesses = {
  data: ApiBusiness[]
  pagination: { total: number; page: number; per_page: number; total_pages: number }
}

/** Filter + paginate the public business set. per_page is hard-capped at 20. */
export async function searchApiBusinesses(params: BusinessSearchParams): Promise<PaginatedBusinesses> {
  const all = await getApiBusinesses()
  const q = (params.q || '').trim().toLowerCase()
  const city = slugify(params.city || '')
  const category = slugify(params.category || '')
  const filtered = all.filter((b) => {
    if (city && slugify(b.city) !== city) return false
    if (category && slugify(b.category) !== category && slugify(b.category) !== category) {
      // Accept both the category id (e.g. "restaurants") and the display
      // name (e.g. "Restaurants & Food").
      const cat = CATEGORIES.find((c) => c.id === category)
      if (!cat || slugify(b.category) !== slugify(cat.name)) return false
    }
    if (q) {
      const haystack = `${b.name} ${b.category} ${b.city} ${b.description}`.toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })
  const perPage = Math.min(
    Math.max(1, Number.isFinite(params.perPage) ? (params.perPage as number) : API_DEFAULT_PER_PAGE),
    API_MAX_PER_PAGE
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const page = Math.min(Math.max(1, params.page || 1), totalPages)
  const start = (page - 1) * perPage
  return {
    data: filtered.slice(start, start + perPage),
    pagination: { total: filtered.length, page, per_page: perPage, total_pages: totalPages },
  }
}

// ------------------------------------------------------------
// Shared response helpers for the public API + MCP routes
// ------------------------------------------------------------

export type ApiErrorCode =
  | 'bad_request'
  | 'not_found'
  | 'rate_limited'
  | 'authentication_required'
  | 'method_not_allowed'
  | 'internal_error'

export function apiError(
  code: ApiErrorCode,
  message: string,
  hint: string,
  status: number,
  extraHeaders?: Record<string, string>
): NextResponse {
  return NextResponse.json(
    { error: { code, message, hint } },
    { status, headers: { 'Content-Type': 'application/json', ...(extraHeaders || {}) } }
  )
}

/** Standard `RateLimit-*` headers (draft-ietf-httpapi-ratelimit-headers). */
export function rateLimitHeaders(result: RateLimitResult, limit: number): Record<string, string> {
  return {
    'RateLimit-Limit': String(limit),
    'RateLimit-Remaining': String(Math.max(0, result.remaining)),
    'RateLimit-Reset': String(Math.max(0, result.resetAfterSeconds)),
  }
}

/**
 * Per-IP fixed-window check for a public API / MCP request. Returns the
 * 429 response when the budget (60/min) is spent, otherwise the headers
 * to attach to the success response. Returns null when allowed.
 */
export function checkApiRateLimit(req: Request): {
  limited: NextResponse | null
  headers: Record<string, string>
} {
  const ip = getClientIp(req as { headers: Headers })
  const result = checkRateLimit(`api:${ip}`, RATE_LIMITS.api)
  const headers = rateLimitHeaders(result, RATE_LIMITS.api.limit)
  if (!result.allowed) {
    return {
      limited: apiError(
        'rate_limited',
        'Too many requests. The public read-only API allows 60 requests per minute per IP.',
        'Wait for the window to reset (see Retry-After), then retry. Reads need no API key; there is no paid tier that raises this limit.',
        429,
        { ...headers, 'Retry-After': String(Math.max(1, result.resetAfterSeconds)) }
      ),
      headers,
    }
  }
  return { limited: null, headers }
}

export function apiJson(data: unknown, headers?: Record<string, string>): NextResponse {
  return NextResponse.json(data, { headers: { 'Content-Type': 'application/json', ...(headers || {}) } })
}

/**
 * Writes are NOT exposed over the API: creating or managing a listing
 * requires a signed-in website account (see /auth.md). A write attempt
 * against the API gets an honest 401 with the RFC 9728-shaped
 * WWW-Authenticate hint pointing at the protected-resource metadata —
 * no bearer token exists to accept, and none is issued.
 */
export function writeRequiresAccountResponse(): NextResponse {
  return apiError(
    'authentication_required',
    'Writing listings is not available through the API. Create or manage listings from a signed-in website account.',
    'Sign up at https://www.paklistings.com/register and submit listings at https://www.paklistings.com/add-business. See https://www.paklistings.com/.well-known/oauth-protected-resource for the scopes (listings:read is public, listings:write is website-only).',
    401,
    {
      'WWW-Authenticate':
        'Bearer realm="PakListings", resource_metadata="https://www.paklistings.com/.well-known/oauth-protected-resource"',
    }
  )
}

/** Total seed-business count (static dataset) — used only for docs counts. */
export function seedBusinessCount(): number {
  return SEED_BUSINESSES.length
}
