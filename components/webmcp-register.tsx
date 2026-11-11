// WebMCP registration (ora.ai Phase 2) — guarded and tiny.
// ------------------------------------------------------------
// Registers one in-page tool (search businesses) with the
// browser's WebMCP surface (document.modelContext) when — and
// only when — the browser exposes it. In browsers without WebMCP
// this component does nothing at all: no error, no extra network
// request, no visible change. The tool navigates the visitor to
// the site's own search page; it performs no fetch and no write.
// Kept as a separate client island so the homepage's server
// render (and LCP) is untouched.
'use client'

import { useEffect } from 'react'

type ModelContextTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (input: Record<string, unknown>) => Promise<{ content: Array<{ type: string; text: string }> }>
}

type ModelContextSurface = {
  registerTool?: (tool: ModelContextTool) => void
}

export default function WebMcpRegister() {
  useEffect(() => {
    try {
      const surface = (document as unknown as { modelContext?: ModelContextSurface }).modelContext
      if (!surface || typeof surface.registerTool !== 'function') return
      surface.registerTool({
        name: 'search_businesses',
        description:
          'Search PakListings for businesses by keyword, city, or category, and open the matching search results page.',
        inputSchema: {
          type: 'object',
          properties: {
            q: { type: 'string', description: 'Keyword, e.g. plumber, restaurant, textile supplier.' },
            city: { type: 'string', description: 'City name, e.g. Lahore.' },
            category: { type: 'string', description: 'Category id, e.g. restaurants.' },
          },
        },
        execute: async (input) => {
          const params = new URLSearchParams()
          if (typeof input.q === 'string' && input.q.trim()) params.set('q', input.q.trim())
          if (typeof input.city === 'string' && input.city.trim()) params.set('city', input.city.trim())
          if (typeof input.category === 'string' && input.category.trim()) params.set('category', input.category.trim())
          const url = `/search${params.toString() ? `?${params.toString()}` : ''}`
          window.location.href = url
          return {
            content: [
              {
                type: 'text',
                text: `Opening PakListings search results at ${url}.`,
              },
            ],
          }
        },
      })
    } catch {
      // WebMCP is experimental: never let registration break the page.
    }
  }, [])

  return null
}
