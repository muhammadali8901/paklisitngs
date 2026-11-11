// GET /openapi.json — OpenAPI 3.1 document for the public read-only API.
import { NextResponse } from 'next/server'
import { OPENAPI_SPEC } from '@/lib/openapi-spec'

export const dynamic = 'force-dynamic'

export async function GET() {
  return NextResponse.json(OPENAPI_SPEC, {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'public, max-age=3600' },
  })
}
