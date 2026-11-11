// GET /api/v1/businesses — search public businesses (read-only, free, no key).
// Query: q, city, category, page, per_page (max 20). Rate limit 60/min per IP.
import { NextResponse } from 'next/server'
import {
  apiError,
  apiJson,
  checkApiRateLimit,
  searchApiBusinesses,
  writeRequiresAccountResponse,
  API_MAX_PER_PAGE,
} from '@/lib/api-public'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { limited, headers } = checkApiRateLimit(req)
  if (limited) return limited
  try {
    const url = new URL(req.url)
    const pageRaw = url.searchParams.get('page')
    const perPageRaw = url.searchParams.get('per_page')
    const page = pageRaw === null ? 1 : Number(pageRaw)
    const perPage = perPageRaw === null ? API_MAX_PER_PAGE : Number(perPageRaw)
    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(perPage) || perPage < 1 || perPage > API_MAX_PER_PAGE) {
      return apiError(
        'bad_request',
        `Invalid pagination: page must be an integer >= 1 and per_page an integer between 1 and ${API_MAX_PER_PAGE}.`,
        `Example: /api/v1/businesses?q=plumber&city=lahore&page=1&per_page=20. See /openapi.json for the full schema.`,
        400,
        headers
      )
    }
    const result = await searchApiBusinesses({
      q: url.searchParams.get('q') ?? undefined,
      city: url.searchParams.get('city') ?? undefined,
      category: url.searchParams.get('category') ?? undefined,
      page,
      perPage,
    })
    return apiJson(result, headers)
  } catch {
    return apiError(
      'internal_error',
      'The directory could not be read right now. Please try again.',
      'Retry the same request; if it keeps failing, contact support@paklistings.com.',
      500,
      headers
    )
  }
}

/** Writes are not exposed via the API — honest 401, see lib/api-public.ts. */
export async function POST() {
  return writeRequiresAccountResponse()
}

export async function PUT() {
  return writeRequiresAccountResponse()
}

export async function PATCH() {
  return writeRequiresAccountResponse()
}

export async function DELETE() {
  return writeRequiresAccountResponse()
}
