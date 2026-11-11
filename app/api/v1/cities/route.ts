// GET /api/v1/cities — the 183 cities (read-only, free, no key).
import { apiJson, checkApiRateLimit, getApiCities } from '@/lib/api-public'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const { limited, headers } = checkApiRateLimit(req)
  if (limited) return limited
  return apiJson({ data: getApiCities() }, headers)
}
