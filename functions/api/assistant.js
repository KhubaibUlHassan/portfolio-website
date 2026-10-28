import {
  askGemini,
  createRateLimiter,
  MAX_BODY_BYTES,
  normalizeMessages,
} from '../../shared/gemini-concierge.js'

const isRateLimited = createRateLimiter({ windowMs: 60_000, max: 8 })

function corsHeaders(request, env) {
  const origin = request.headers.get('Origin') || ''
  const allowed = (env.ALLOWED_ORIGIN || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)
  const isAllowed =
    allowed.length === 0
      ? origin.endsWith('.pages.dev') || origin === 'http://localhost:5173'
      : allowed.includes(origin)

  return {
    'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  }
}

function json(body, status, extra = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extra,
    },
  })
}

function clientKey(request) {
  return request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown'
}

export async function onRequestOptions({ request, env }) {
  return new Response(null, { status: 204, headers: corsHeaders(request, env) })
}

export async function onRequestPost({ request, env }) {
  const headers = corsHeaders(request, env)

  if (!(request.headers.get('Content-Type') || '').includes('application/json')) {
    return json({ error: 'Unsupported content type.' }, 415, headers)
  }

  const declaredLength = Number(request.headers.get('Content-Length') || 0)
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ error: 'This conversation is too large. Please start a new chat.' }, 413, headers)
  }

  if (isRateLimited(clientKey(request))) {
    return json({ error: 'A few messages at once is plenty. Please try again shortly.' }, 429, headers)
  }

  let body
  try {
    const raw = await request.text()
    if (raw.length > MAX_BODY_BYTES) {
      return json({ error: 'This conversation is too large. Please start a new chat.' }, 413, headers)
    }
    body = JSON.parse(raw)
  } catch {
    return json({ error: 'Invalid request.' }, 400, headers)
  }

  const messages = normalizeMessages(body?.messages)
  if (!messages) {
    return json({ error: 'Please send a short, valid message.' }, 400, headers)
  }

  const result = await askGemini({ apiKey: env.GEMINI_API_KEY, messages })
  if (!result.ok) {
    return json({ error: result.error }, result.status, headers)
  }

  return json({ reply: result.text }, 200, headers)
}
