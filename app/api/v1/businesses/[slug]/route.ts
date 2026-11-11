// GET /api/v1/businesses/[slug] — read one public business (read-only, free, no key).
import {
  apiError,
  apiJson,
  checkApiRateLimit,
  getApiBusinessBySlug,
} from '@/lib/api-public'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { limited, headers } = checkApiRateLimit(req)
  if (limited) return limited
  try {
    const { slug } = await params
    const business = await getApiBusinessBySlug(slug)
    if (!business) {
      return apiError(
        'not_found',
        `No approved public business found with slug "${slug}".`,
        'Check the slug from the listing page URL (https://www.paklistings.com/business/<slug>) or search /api/v1/businesses?q=<name>.',
        404,
        headers
      )
    }
    return apiJson(business, headers)
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
