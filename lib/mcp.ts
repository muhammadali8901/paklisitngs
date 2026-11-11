// ============================================================
// PakListings — MCP tools (ora.ai Phase 2)
// ------------------------------------------------------------
// Tool definitions shared by the Streamable HTTP endpoint
// (app/api/mcp/route.ts). Read-only, over the same public data
// layer as the REST API (lib/api-public.ts) — same public fields
// only, same 20/page cap, same 60/min rate limit. No SDK is used:
// the endpoint implements the minimal JSON-RPC Streamable HTTP
// surface by hand (initialize, tools/list, tools/call, ping) so
// the MCP server adds zero dependencies and zero client JS.
// ============================================================

import {
  getApiBusinessBySlug,
  getApiCategories,
  getApiCities,
  searchApiBusinesses,
  API_MAX_PER_PAGE,
} from '@/lib/api-public'

export const MCP_SERVER_INFO = {
  name: 'paklistings-mcp',
  version: '1.0.0',
  title: 'PakListings MCP Server',
  description:
    'Read-only MCP server for PakListings, the Pakistan business directory (183 cities, 24 categories). Search public businesses, read one business, list categories and cities. Free, no API key, 60 requests/minute per IP.',
  endpoint: 'https://www.paklistings.com/api/mcp',
} as const

export type McpToolDef = {
  name: string
  title: string
  description: string
  inputSchema: Record<string, unknown>
  annotations: { readOnlyHint: boolean; destructiveHint: boolean; idempotentHint: boolean; openWorldHint: boolean }
}

const READ_ONLY = {
  readOnlyHint: true,
  destructiveHint: false,
  idempotentHint: true,
  openWorldHint: true,
} as const

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: 'search_businesses',
    title: 'Search businesses',
    description:
      'Search public PakListings businesses by keyword, city, or category. Returns at most 20 businesses per call. Only fields already public on the listing pages are returned (name, slug, category, city, phone, website when published, description, featured, profile URL).',
    inputSchema: {
      type: 'object',
      properties: {
        q: { type: 'string', description: 'Keyword matched against name, category, city and description.' },
        city: { type: 'string', description: 'City slug (e.g. lahore) or display name (e.g. Lahore).' },
        category: { type: 'string', description: 'Category id (e.g. restaurants) or display name.' },
        page: { type: 'integer', minimum: 1, default: 1, description: 'Page number, starting at 1.' },
        per_page: { type: 'integer', minimum: 1, maximum: API_MAX_PER_PAGE, default: 20, description: 'Results per page, max 20.' },
      },
    },
    annotations: READ_ONLY,
  },
  {
    name: 'get_business',
    title: 'Read one business',
    description: 'Read a single approved public business by its slug (the slug in its profile URL, e.g. nayatel).',
    inputSchema: {
      type: 'object',
      required: ['slug'],
      properties: {
        slug: { type: 'string', description: 'Public business slug.' },
      },
    },
    annotations: READ_ONLY,
  },
  {
    name: 'list_categories',
    title: 'List categories',
    description: 'List the 24 business categories covered by PakListings, with their public category-page URLs.',
    inputSchema: { type: 'object', properties: {} },
    annotations: READ_ONLY,
  },
  {
    name: 'list_cities',
    title: 'List cities',
    description: 'List the 183 cities covered by PakListings, with their public city-page URLs.',
    inputSchema: { type: 'object', properties: {} },
    annotations: READ_ONLY,
  },
]

type McpCallResult = { text: string; isError: boolean }

function asText(value: unknown): McpCallResult {
  return { text: JSON.stringify(value, null, 2), isError: false }
}

function asError(message: string): McpCallResult {
  return { text: JSON.stringify({ error: message }), isError: true }
}

/** Execute one tool call. Throws a plain Error with a user-facing message on bad input. */
export async function executeMcpTool(name: string, args: Record<string, unknown>): Promise<McpCallResult> {
  switch (name) {
    case 'search_businesses': {
      const page = typeof args.page === 'number' ? args.page : 1
      const perPage = typeof args.per_page === 'number' ? args.per_page : 20
      if (page < 1 || perPage < 1 || perPage > API_MAX_PER_PAGE) {
        return asError(`Invalid pagination: page must be >= 1 and per_page must be between 1 and ${API_MAX_PER_PAGE}.`)
      }
      const result = await searchApiBusinesses({
        q: typeof args.q === 'string' ? args.q : undefined,
        city: typeof args.city === 'string' ? args.city : undefined,
        category: typeof args.category === 'string' ? args.category : undefined,
        page,
        perPage,
      })
      return asText(result)
    }
    case 'get_business': {
      if (typeof args.slug !== 'string' || !args.slug.trim()) {
        return asError('Missing required argument: slug (a public business slug, e.g. "nayatel").')
      }
      const business = await getApiBusinessBySlug(args.slug)
      if (!business) return asError(`No approved public business found with slug "${args.slug}".`)
      return asText(business)
    }
    case 'list_categories':
      return asText({ data: getApiCategories() })
    case 'list_cities':
      return asText({ data: getApiCities() })
    default:
      return asError(`Unknown tool: ${name}. Available tools: ${MCP_TOOLS.map((t) => t.name).join(', ')}.`)
  }
}
