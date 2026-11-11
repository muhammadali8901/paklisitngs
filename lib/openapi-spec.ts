// ============================================================
// PakListings — OpenAPI 3.1 document for the public read-only API
// ------------------------------------------------------------
// Single source of truth for /openapi.json. Honest by design:
// only the four public GET endpoints exist. Writes are NOT part
// of this API — POST /api/v1/businesses is documented only to
// return 401 (website account required). The BearerAuth scheme
// names the real scopes (listings:read public, listings:write
// website-only); no bearer tokens are issued, and the scheme
// description says so rather than implying an OAuth flow exists.
// ============================================================

import { API_BASE_URL, API_MAX_PER_PAGE } from '@/lib/api-public'

const BUSINESS_EXAMPLE = {
  name: 'Nayatel',
  slug: 'nayatel',
  category: 'Technology & IT',
  city: 'Islamabad',
  phone: '051-111-144-444',
  description: 'Nayatel is a fibre-to-the-home internet provider based in Islamabad.',
  featured: false,
  url: 'https://www.paklistings.com/business/nayatel',
}

export const OPENAPI_SPEC = {
  openapi: '3.1.0',
  info: {
    title: 'PakListings Public API',
    version: '1.0.0',
    description:
      'Read-only public API for PakListings (https://www.paklistings.com), the Pakistan business directory — 183 cities, 24 categories, 43 seed businesses plus approved owner listings. Reads are free, need no API key and no signup. Rate limit: 60 requests per minute per IP. Only fields already public on the listing pages are returned; owner emails, owner IDs and payment data are never exposed. There is no bulk export endpoint. Writes (creating or managing listings) are not available through this API — they require a signed-in website account; see /auth.md and the protected-resource metadata at /.well-known/oauth-protected-resource.',
    contact: {
      name: 'PakListings Support',
      url: 'https://www.paklistings.com/contact',
      email: 'support@paklistings.com',
    },
    license: { name: 'All content © PakListings. Cite the listing page URL you used.' },
  },
  servers: [{ url: API_BASE_URL, description: 'Production' }],
  tags: [
    { name: 'Businesses', description: 'Search and read public business listings.' },
    { name: 'Taxonomy', description: 'Categories and cities covered by the directory.' },
  ],
  security: [{ BearerAuth: ['listings:read'] }],
  paths: {
    '/api/v1/businesses': {
      get: {
        operationId: 'listBusinesses',
        summary: 'Search public businesses',
        description:
          'Search approved public business listings by keyword, city, or category. Results are paginated, at most 20 per page. Only fields already public on the listing pages are returned.',
        tags: ['Businesses'],
        security: [],
        parameters: [
          {
            name: 'q',
            in: 'query',
            description: 'Keyword matched against name, category, city and description.',
            schema: { type: 'string', example: 'plumber' },
          },
          {
            name: 'city',
            in: 'query',
            description: 'City slug (e.g. lahore) or display name (e.g. Lahore).',
            schema: { type: 'string', example: 'lahore' },
          },
          {
            name: 'category',
            in: 'query',
            description: 'Category id (e.g. restaurants) or display name (e.g. Restaurants & Food).',
            schema: { type: 'string', example: 'restaurants' },
          },
          {
            name: 'page',
            in: 'query',
            description: 'Page number, starting at 1.',
            schema: { type: 'integer', minimum: 1, default: 1 },
          },
          {
            name: 'per_page',
            in: 'query',
            description: `Results per page. Maximum ${API_MAX_PER_PAGE}.`,
            schema: { type: 'integer', minimum: 1, maximum: API_MAX_PER_PAGE, default: 20 },
          },
        ],
        responses: {
          '200': {
            description: 'A page of public businesses.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/PaginatedBusinesses' },
                example: {
                  data: [BUSINESS_EXAMPLE],
                  pagination: { total: 43, page: 1, per_page: 20, total_pages: 3 },
                },
              },
            },
          },
          '400': {
            description: 'Invalid query parameter.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
          '429': {
            description: 'Rate limit exceeded (60 requests/minute per IP).',
            headers: {
              'Retry-After': { description: 'Seconds until the window resets.', schema: { type: 'integer' } },
              'RateLimit-Limit': { schema: { type: 'integer' } },
              'RateLimit-Remaining': { schema: { type: 'integer' } },
              'RateLimit-Reset': { schema: { type: 'integer' } },
            },
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
        },
      },
      post: {
        operationId: 'createBusinessNotAvailable',
        summary: 'Create a business (not available via API)',
        description:
          'Writes are not exposed through the API. This operation always returns 401 with a WWW-Authenticate hint pointing at the protected-resource metadata. To list a business, create a website account at /register and submit at /add-business.',
        tags: ['Businesses'],
        security: [{ BearerAuth: ['listings:write'] }],
        responses: {
          '401': {
            description: 'Writes require a signed-in website account; no API token is issued.',
            headers: {
              'WWW-Authenticate': {
                description: 'Bearer hint with the protected-resource metadata URL.',
                schema: { type: 'string' },
              },
            },
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
        },
      },
    },
    '/api/v1/businesses/{slug}': {
      get: {
        operationId: 'getBusinessBySlug',
        summary: 'Read one public business',
        description:
          'Return a single approved public business by its slug (the slug in its profile URL, e.g. nayatel). Only fields already public on the listing page are returned.',
        tags: ['Businesses'],
        security: [],
        parameters: [
          {
            name: 'slug',
            in: 'path',
            required: true,
            description: 'Public business slug.',
            schema: { type: 'string', example: 'nayatel' },
          },
        ],
        responses: {
          '200': {
            description: 'The public business.',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Business' },
                example: BUSINESS_EXAMPLE,
              },
            },
          },
          '404': {
            description: 'No approved public business with this slug.',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
          '429': {
            description: 'Rate limit exceeded (60 requests/minute per IP).',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
        },
      },
    },
    '/api/v1/categories': {
      get: {
        operationId: 'listCategories',
        summary: 'List the 24 categories',
        description: 'All 24 business categories covered by PakListings, with their public category-page URLs.',
        tags: ['Taxonomy'],
        security: [],
        responses: {
          '200': {
            description: 'The category list.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['data'],
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/Category' } },
                  },
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded (60 requests/minute per IP).',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
        },
      },
    },
    '/api/v1/cities': {
      get: {
        operationId: 'listCities',
        summary: 'List the 183 cities',
        description: 'All 183 cities covered by PakListings, with their public city-page URLs.',
        tags: ['Taxonomy'],
        security: [],
        responses: {
          '200': {
            description: 'The city list.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['data'],
                  properties: {
                    data: { type: 'array', items: { $ref: '#/components/schemas/City' } },
                  },
                },
              },
            },
          },
          '429': {
            description: 'Rate limit exceeded (60 requests/minute per IP).',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/ApiError' } } },
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'none',
        description:
          'Named scopes: listings:read (public reads — no credential is required or accepted for reads) and listings:write (website-only — creating or managing a listing requires a signed-in website account; no bearer token is issued for it). This scheme exists so clients and scanners can discover the scopes; do not send an Authorization header expecting a token to work. Protected-resource metadata: https://www.paklistings.com/.well-known/oauth-protected-resource.',
      },
    },
    schemas: {
      Business: {
        type: 'object',
        required: ['name', 'slug', 'category', 'city', 'phone', 'description', 'featured', 'url'],
        properties: {
          name: { type: 'string', example: 'Nayatel' },
          slug: { type: 'string', example: 'nayatel' },
          category: { type: 'string', example: 'Technology & IT' },
          city: { type: 'string', example: 'Islamabad' },
          phone: { type: 'string', description: 'Public phone as shown on the listing page; empty when the listing has none.', example: '051-111-144-444' },
          website: { type: 'string', format: 'uri', description: 'Only present when the owner published a website on the public profile.' },
          description: { type: 'string' },
          featured: { type: 'boolean', description: 'Featured tier (admin-set).' },
          url: { type: 'string', format: 'uri', example: 'https://www.paklistings.com/business/nayatel' },
        },
      },
      PaginatedBusinesses: {
        type: 'object',
        required: ['data', 'pagination'],
        properties: {
          data: { type: 'array', items: { $ref: '#/components/schemas/Business' } },
          pagination: {
            type: 'object',
            required: ['total', 'page', 'per_page', 'total_pages'],
            properties: {
              total: { type: 'integer', example: 43 },
              page: { type: 'integer', example: 1 },
              per_page: { type: 'integer', example: 20 },
              total_pages: { type: 'integer', example: 3 },
            },
          },
        },
      },
      Category: {
        type: 'object',
        required: ['id', 'name', 'description', 'url'],
        properties: {
          id: { type: 'string', example: 'restaurants' },
          name: { type: 'string', example: 'Restaurants & Food' },
          description: { type: 'string' },
          url: { type: 'string', format: 'uri', example: 'https://www.paklistings.com/category/restaurants' },
        },
      },
      City: {
        type: 'object',
        required: ['name', 'slug', 'url'],
        properties: {
          name: { type: 'string', example: 'Lahore' },
          slug: { type: 'string', example: 'lahore' },
          url: { type: 'string', format: 'uri', example: 'https://www.paklistings.com/city/lahore' },
        },
      },
      ApiError: {
        type: 'object',
        required: ['error'],
        properties: {
          error: {
            type: 'object',
            required: ['code', 'message', 'hint'],
            properties: {
              code: {
                type: 'string',
                enum: ['bad_request', 'not_found', 'rate_limited', 'authentication_required', 'method_not_allowed', 'internal_error'],
              },
              message: { type: 'string' },
              hint: { type: 'string', description: 'What to do next.' },
            },
          },
        },
      },
    },
  },
} as const
