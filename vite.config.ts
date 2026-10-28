import { defineConfig, loadEnv, type Plugin } from 'vite'
import type { ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import {
  askGemini,
  createRateLimiter,
  MAX_BODY_BYTES,
  normalizeMessages,
} from './shared/gemini-concierge.js'

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

function geminiDevProxy(apiKey: string): Plugin {
  const isRateLimited = createRateLimiter({ windowMs: 60_000, max: 8 })

  return {
    name: 'gemini-dev-proxy',
    configureServer(server) {
      server.middlewares.use('/api/assistant', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        if (req.method !== 'POST') {
          next()
          return
        }

        if (!(req.headers['content-type'] || '').includes('application/json')) {
          sendJson(res, 415, { error: 'Unsupported content type.' })
          return
        }

        const key = req.socket.remoteAddress || 'local'
        if (isRateLimited(key)) {
          sendJson(res, 429, { error: 'A few messages at once is plenty. Please try again shortly.' })
          return
        }

        let size = 0
        const chunks: Buffer[] = []

        for await (const chunk of req) {
          size += chunk.length
          if (size > MAX_BODY_BYTES) {
            sendJson(res, 413, { error: 'This conversation is too large. Please start a new chat.' })
            return
          }
          chunks.push(chunk)
        }

        let body
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
        } catch {
          sendJson(res, 400, { error: 'Invalid request.' })
          return
        }

        const messages = normalizeMessages(body?.messages)
        if (!messages) {
          sendJson(res, 400, { error: 'Please send a short, valid message.' })
          return
        }

        const result = await askGemini({ apiKey, messages })
        if (!result.ok) {
          sendJson(res, result.status, { error: result.error })
          return
        }

        sendJson(res, 200, { reply: result.text })
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), tailwindcss(), geminiDevProxy(env.GEMINI_API_KEY)],
  }
})
