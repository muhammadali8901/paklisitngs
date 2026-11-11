// POST /api/mcp — Streamable HTTP MCP endpoint (read-only).
// ------------------------------------------------------------
// Minimal JSON-RPC 2.0 implementation, no SDK dependency (keeps
// the server bundle lean and the surface fully under our control).
// Supported methods: initialize, notifications/initialized,
// tools/list, tools/call, ping. GET is not a stream here — it
// returns 405 with a hint to POST. Same 60/min per-IP rate limit
// as the REST API; same public-fields-only data layer.
// ------------------------------------------------------------

import { NextResponse } from 'next/server'
import { checkApiRateLimit, apiError } from '@/lib/api-public'
import { MCP_SERVER_INFO, MCP_TOOLS, executeMcpTool } from '@/lib/mcp'

export const dynamic = 'force-dynamic'

const PROTOCOL_VERSIONS = ['2025-06-18', '2025-03-26', '2024-11-05']

type JsonRpcRequest = {
  jsonrpc?: string
  id?: string | number | null
  method?: string
  params?: Record<string, unknown>
}

function rpcResult(id: string | number | null, result: unknown) {
  return NextResponse.json({ jsonrpc: '2.0', id: id ?? null, result })
}

function rpcError(
  id: string | number | null,
  code: number,
  message: string,
  data?: unknown
) {
  return NextResponse.json({
    jsonrpc: '2.0',
    id: id ?? null,
    error: { code, message, ...(data !== undefined ? { data } : {}) },
  })
}

export async function GET() {
  return apiError(
    'method_not_allowed',
    'The MCP endpoint accepts POST with a JSON-RPC 2.0 body (Streamable HTTP). GET is not supported.',
    'POST a JSON-RPC request to /api/mcp, e.g. {"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}. Server card: /.well-known/mcp/server-card.json. Docs: /docs.',
    405,
    { Allow: 'POST' }
  )
}

export async function POST(req: Request) {
  const { limited, headers } = checkApiRateLimit(req)
  if (limited) return limited

  let body: JsonRpcRequest
  try {
    body = (await req.json()) as JsonRpcRequest
  } catch {
    return rpcError(null, -32700, 'Parse error: request body must be a JSON-RPC 2.0 object.')
  }
  if (Array.isArray(body) || typeof body !== 'object' || body === null) {
    return rpcError(null, -32600, 'Invalid Request: batch requests are not supported; send one JSON-RPC object.')
  }
  const id = body.id ?? null
  const method = body.method || ''

  // Notifications (no id) get a 202 with no body, per JSON-RPC.
  if (method.startsWith('notifications/')) {
    return new NextResponse(null, { status: 202, headers })
  }

  switch (method) {
    case 'initialize': {
      const requested = (body.params as { protocolVersion?: string } | undefined)?.protocolVersion
      const protocolVersion =
        (requested && PROTOCOL_VERSIONS.includes(requested) ? requested : PROTOCOL_VERSIONS[0]) as string
      return rpcResult(id, {
        protocolVersion,
        capabilities: { tools: {} },
        serverInfo: { name: MCP_SERVER_INFO.name, version: MCP_SERVER_INFO.version },
      })
    }
    case 'ping':
      return rpcResult(id, {})
    case 'tools/list':
      return rpcResult(id, {
        tools: MCP_TOOLS.map((t) => ({
          name: t.name,
          title: t.title,
          description: t.description,
          inputSchema: t.inputSchema,
          annotations: t.annotations,
        })),
      })
    case 'tools/call': {
      const params = (body.params || {}) as { name?: unknown; arguments?: unknown }
      if (typeof params.name !== 'string' || !params.name) {
        return rpcError(id, -32602, 'Invalid params: tools/call requires a tool "name".')
      }
      const args =
        params.arguments && typeof params.arguments === 'object'
          ? (params.arguments as Record<string, unknown>)
          : {}
      try {
        const { text, isError } = await executeMcpTool(params.name, args)
        return rpcResult(id, {
          content: [{ type: 'text', text }],
          isError,
        })
      } catch {
        return rpcError(id, -32603, 'Internal error while running the tool. Please try again.')
      }
    }
    default:
      return rpcError(id, -32601, `Method not found: ${method}. Supported: initialize, tools/list, tools/call, ping.`)
  }
}
