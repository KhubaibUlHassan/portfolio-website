export type ChatMessage = {
  role: 'user' | 'assistant'
  text: string
}

export const MODEL: string
export const MAX_MESSAGES: number
export const MAX_MESSAGE_CHARS: number
export const MAX_TOTAL_CHARS: number
export const MAX_BODY_BYTES: number
export const SYSTEM_PROMPT: string

export function normalizeMessages(input: unknown): ChatMessage[] | null
export function createRateLimiter(options?: { windowMs?: number; max?: number }): (key: string) => boolean
export function askGemini(options: {
  apiKey?: string
  messages: ChatMessage[]
  timeoutMs?: number
}): Promise<{ ok: true; text: string } | { ok: false; status: number; error: string }>
