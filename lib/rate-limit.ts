/**
 * Small dependency-free, in-memory fixed-window rate limiter (server-side
 * only). Used by /api/turnstile/verify and /api/contact so one IP cannot
 * flood the verification endpoint or the support inbox.
 *
 * In-memory counters reset when the serverless instance is recycled, and
 * each instance keeps its own counters — acceptable for this site's threat
 * model (low-traffic directory), but revisit if abuse appears: the next
 * step is a shared store (Upstash Redis / Vercel KV) or provider-side
 * limits. These budgets are first-layer abuse controls, NOT a replacement
 * for provider-side controls (Firebase Auth throttling, Brevo quotas).
 *
 * Budgets:
 *  - submit (public forms + turnstile verify): 10 / hour per IP.
 *    Legitimate submissions are rare (one per visit); 10 stops listing
 *    spam floods while allowing a user to fix and resubmit a few times.
 *  - contact: 10 / hour per IP. A legitimate visitor sends one contact
 *    message; 10 leaves room for retries without letting one IP flood
 *    the support inbox or burn Brevo quota.
 */

export type RateLimitPreset = { limit: number; windowMs: number }

export const RATE_LIMITS = {
  submit: { limit: 10, windowMs: 60 * 60 * 1000 },
  contact: { limit: 10, windowMs: 60 * 60 * 1000 },
  /** Public read-only API + MCP: 60 requests / minute per IP (ora.ai Phase 2). */
  api: { limit: 60, windowMs: 60 * 1000 },
} as const satisfies Record<string, RateLimitPreset>

export type RateLimitResult = {
  allowed: boolean
  /** Requests remaining in the current window (0 when blocked). */
  remaining: number
  /** Seconds until the current window resets (0 when allowed). */
  resetAfterSeconds: number
}

type Bucket = { count: number; resetAt: number }

/** Hard cap on tracked buckets so a flood of distinct keys cannot grow memory unboundedly. */
const MAX_BUCKETS = 10_000

function createStore() {
  const buckets = new Map<string, Bucket>()
  return {
    check(key: string, { limit, windowMs }: RateLimitPreset): RateLimitResult {
      const now = Date.now()
      const bucket = buckets.get(key)
      if (!bucket || now >= bucket.resetAt) {
        // New window. Prune expired buckets opportunistically (cheap,
        // amortised: only when we create a fresh bucket).
        if (buckets.size >= MAX_BUCKETS) {
          for (const [k, b] of buckets) {
            if (now >= b.resetAt) buckets.delete(k)
          }
          // Still full after pruning: drop the oldest entry to stay bounded.
          if (buckets.size >= MAX_BUCKETS) {
            const oldest = buckets.keys().next()
            if (!oldest.done) buckets.delete(oldest.value)
          }
        }
        buckets.set(key, { count: 1, resetAt: now + windowMs })
        return { allowed: true, remaining: limit - 1, resetAfterSeconds: 0 }
      }
      if (bucket.count >= limit) {
        return {
          allowed: false,
          remaining: 0,
          resetAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
        }
      }
      bucket.count += 1
      return {
        allowed: true,
        remaining: limit - bucket.count,
        resetAfterSeconds: 0,
      }
    },
  }
}

/** Server-side store (one per serverless instance — see header note). */
const serverStore = createStore()

/**
 * Server-side fixed-window check. `key` must already include its scope,
 * e.g. `contact:<ip>` or `turnstile:<ip>`.
 */
export function checkRateLimit(
  key: string,
  preset: RateLimitPreset
): RateLimitResult {
  return serverStore.check(key, preset)
}

/**
 * Best-effort client IP for a route handler. On Vercel, `x-forwarded-for`
 * starts with the real client IP; `x-real-ip` is the fallback. Returns
 * 'unknown' when neither header is present (shared bucket — still capped).
 * Note: this header is spoofable by a direct caller, so it is only a
 * rate-limit key, never an identity signal.
 */
export function getClientIp(request: { headers: Headers }): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim()
    if (first) return first
  }
  const realIp = request.headers.get('x-real-ip')?.trim()
  if (realIp) return realIp
  return 'unknown'
}

/**
 * Standard 429 response for a rate-limited route handler. Sets
 * Retry-After so well-behaved clients back off.
 */
export function rateLimitExceededResponse(resetAfterSeconds: number): Response {
  return new Response(
    JSON.stringify({
      ok: false,
      error: 'rate_limited',
      message: 'Too many requests. Please try again later.',
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(Math.max(1, resetAfterSeconds)),
      },
    }
  )
}
