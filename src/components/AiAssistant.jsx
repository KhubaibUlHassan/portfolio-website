import { useEffect, useRef, useState } from 'react'
import { CloseIcon } from './Icons'

const INTRO =
  "Hi, I'm Khubaib's AI concierge. I can walk you through his SQA audits, quality engineering toolkit, Cloud Wave leadership work, or how to start a freelance project. What would you like to know?"

const STARTERS = [
  "What is Khubaib's SQA background?",
  'Tell me about his Arid Security Audit',
  'How can I hire him?',
]

const MAX_INPUT = 1000

function RobotIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.2V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="12" cy="2.2" r="1.1" fill="currentColor" />
      <rect x="4.2" y="6.2" width="15.6" height="13" rx="4.2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M2.5 11.5v3.2M21.5 11.5v3.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M8.7 11.2h.01M15.3 11.2h.01" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M9 15.2c.82.62 1.82.95 3 .95s2.18-.33 3-.95" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

function SendIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 12 16-8-5.5 16-3.33-6.67L4 12Z" />
      <path d="m11.17 13.33 4.08-4.08" />
    </svg>
  )
}

function TrashIcon({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 7h16" />
      <path d="M9 7V4h6v3" />
      <path d="m6 7 1 13h10l1-13" />
      <path d="M10 11v5M14 11v5" />
    </svg>
  )
}

function StatusDot({ className = '' }) {
  return (
    <span className={`relative flex h-2.5 w-2.5 shrink-0 ${className}`} aria-hidden="true">
      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/70 ai-status-ping" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
    </span>
  )
}

function Avatar({ small = false }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full border border-accent/40 bg-gradient-to-br from-accent/25 to-accent/10 text-accent-ink shadow-[0_0_18px_var(--c-accent-glow)] ${
        small ? 'h-7 w-7' : 'h-10 w-10'
      }`}
      aria-hidden="true"
    >
      <RobotIcon className={small ? 'h-4 w-4' : 'h-5 w-5'} />
    </span>
  )
}

export default function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', text: INTRO, error: false }])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const abortRef = useRef(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    container.scrollTo({ top: container.scrollHeight, behavior: reduced ? 'auto' : 'smooth' })
  }, [messages, typing, open])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 280)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const close = () => {
    setOpen(false)
    launcherRef.current?.focus()
  }

  const clearChat = () => {
    abortRef.current?.abort()
    abortRef.current = null
    setMessages([{ role: 'assistant', text: INTRO, error: false }])
    setTyping(false)
    setInput('')
    if (inputRef.current) inputRef.current.style.height = 'auto'
    window.setTimeout(() => inputRef.current?.focus(), 50)
  }

  const sendMessage = async (rawText) => {
    const text = rawText.trim()
    if (!text || typing) return

    const nextMessages = [...messages, { role: 'user', text }]
    setMessages(nextMessages)
    setInput('')
    setTyping(true)
    if (inputRef.current) inputRef.current.style.height = 'auto'

    const controller = new AbortController()
    abortRef.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 25_000)

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-12) }),
        signal: controller.signal,
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.error || "I couldn't finish that thought. Please try again.")
      }

      const reply = typeof payload.reply === 'string' ? payload.reply.trim() : ''
      if (!reply) {
        throw new Error("I couldn't finish that thought. Please try again.")
      }

      setMessages([...nextMessages, { role: 'assistant', text: reply, error: false }])
    } catch (error) {
      if (controller.signal.aborted && abortRef.current !== controller) return
      const networkFailure =
        error?.name === 'TypeError' || /failed to fetch|networkerror|load failed/i.test(error?.message || '')
      const message = controller.signal.aborted
        ? 'That took a little longer than expected. Please try again, or use the contact section to reach Khubaib directly.'
        : networkFailure
          ? "I couldn't reach the concierge service just now. Please check your connection and try again, or use the contact section to reach Khubaib directly."
          : error?.message || 'Something went wrong on my side. Please try again in a moment.'
      setMessages([...nextMessages, { role: 'assistant', text: message, error: true }])
    } finally {
      window.clearTimeout(timeout)
      if (abortRef.current === controller) {
        abortRef.current = null
        setTyping(false)
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  const handleInput = (event) => {
    setInput(event.target.value)
    event.target.style.height = 'auto'
    event.target.style.height = `${Math.min(event.target.scrollHeight, 104)}px`
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <>
      <div
        id="ai-concierge-panel"
        role="dialog"
        aria-label="Khubaib's AI assistant"
        aria-hidden={!open}
        inert={!open}
        className={`fixed bottom-24 right-4 z-[85] flex h-[min(38rem,calc(100dvh-8rem))] w-[calc(100vw-2rem)] max-w-[26rem] origin-bottom flex-col overflow-hidden rounded-3xl border border-line bg-panel/90 shadow-2xl ring-1 ring-accent/15 backdrop-blur-xl transition-[opacity,transform] duration-300 ease-out will-change-transform transform-gpu sm:right-6 ${
          open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-6 scale-[0.97] opacity-0'
        }`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-ink/70 to-transparent" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-accent/10 blur-3xl" aria-hidden="true" />

        <header className="relative flex items-center gap-3 border-b border-line bg-panel-soft px-4 py-3.5">
          <Avatar />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold tracking-tight text-ink">Khubaib's AI Assistant</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium tracking-[0.02em] text-ink-3">
              <StatusDot />
              AI Assistant Online
            </p>
          </div>
          <button
            type="button"
            onClick={clearChat}
            aria-label="Clear conversation"
            title="Clear conversation"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-transparent text-ink-3 transition-all duration-300 hover:border-line hover:bg-panel-soft hover:text-accent-ink active:scale-95"
          >
            <TrashIcon />
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Close AI chat"
            className="inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-transparent text-ink-3 transition-all duration-300 hover:border-line hover:bg-panel-soft hover:text-ink active:scale-95"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </header>

        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="ai-scroll relative min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4"
        >
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`flex items-end gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && <Avatar small />}
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  message.role === 'user'
                    ? 'rounded-br-md bg-accent text-white shadow-[0_8px_24px_var(--c-accent-glow)]'
                    : message.error
                      ? 'rounded-bl-md border border-danger/30 bg-danger-soft text-danger'
                      : 'rounded-bl-md border border-line bg-panel-soft text-ink-2'
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.text}</p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-end gap-2" role="status">
              <Avatar small />
              <div className="inline-flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-panel-soft px-4 py-3.5">
                <span className="ai-typing-dot" />
                <span className="ai-typing-dot" style={{ animationDelay: '140ms' }} />
                <span className="ai-typing-dot" style={{ animationDelay: '280ms' }} />
                <span className="sr-only">Khubaib's AI is typing</span>
              </div>
            </div>
          )}

          {messages.length === 1 && !typing && (
            <div className="space-y-2 pt-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-3">Try asking</p>
              <div className="flex flex-wrap gap-2">
                {STARTERS.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => sendMessage(starter)}
                    className="cursor-pointer rounded-full border border-accent/25 bg-accent-soft px-3 py-2 text-left text-xs leading-relaxed text-accent-ink transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-ink active:scale-[0.98]"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative border-t border-line bg-panel-soft p-3">
          <form onSubmit={handleSubmit}>
            <div className="flex items-end gap-2 rounded-2xl border border-line bg-panel-soft p-1.5 pl-3 transition-colors duration-300 focus-within:border-accent/60 focus-within:shadow-[0_0_0_3px_var(--c-accent-soft)]">
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={MAX_INPUT}
                placeholder="Ask about SQA, audits, or freelance work..."
                aria-label="Message Khubaib's AI concierge"
                className="max-h-[104px] min-h-10 flex-1 resize-none bg-transparent py-2 text-sm leading-relaxed text-ink placeholder:text-ink-3 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="inline-flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-accent text-white transition-all duration-300 hover:bg-accent-hover hover:shadow-[0_0_24px_var(--c-accent-glow)] active:scale-95 disabled:cursor-not-allowed disabled:bg-panel-soft disabled:text-ink-3 disabled:shadow-none"
              >
                <SendIcon />
              </button>
            </div>
          </form>
          <p className="mt-2 text-center text-[10px] leading-relaxed text-ink-3">
            AI can make mistakes. For project details, use the contact section.
          </p>
        </div>
      </div>

      <button
        ref={launcherRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="ai-concierge-panel"
        aria-label={open ? 'Close AI assistant' : "Open Khubaib's AI assistant"}
        className="group fixed bottom-5 right-4 z-[90] inline-flex min-h-12 cursor-pointer items-center gap-2.5 rounded-full border border-accent/40 bg-panel/90 px-4 text-sm font-semibold text-ink shadow-[0_12px_40px_rgba(15,23,42,0.22),0_0_20px_var(--c-accent-glow)] ring-1 ring-accent/20 backdrop-blur-xl transition-[transform,box-shadow,border-color,background-color] duration-300 ease-out will-change-transform transform-gpu hover:scale-105 hover:border-accent/60 hover:bg-panel hover:shadow-[0_12px_40px_rgba(15,23,42,0.28),0_0_35px_var(--c-accent-glow)] hover:ring-accent/30 active:scale-100 sm:bottom-6 sm:right-6"
      >
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent-ink shadow-[0_0_16px_var(--c-accent-glow)]">
          <RobotIcon className="h-4 w-4" />
        </span>
        <span>{open ? 'Close AI chat' : "Ask Khubaib's AI"}</span>
        {open ? (
          <CloseIcon className="h-4 w-4 text-ink-3 transition-colors duration-300 group-hover:text-ink" />
        ) : (
          <StatusDot className="ml-0.5" />
        )}
      </button>
    </>
  )
}
