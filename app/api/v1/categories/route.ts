// GET /api/v1/categories — the 24 categories (read-only, free, no key).
import { apiJson, checkApiRateLimit, getApiCategories } from '@/lib/api-public'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { limited, headers } = checkApiRateLimit(req)
  if (limited) return limited
  return apiJson({ data: getApiCategories() }, headers)
}
