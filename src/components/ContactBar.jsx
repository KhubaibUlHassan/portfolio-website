import { useState } from 'react'
import { createPortal } from 'react-dom'
import { DownloadIcon, GitHubIcon, HomeUpIcon, LinkedInIcon } from './Icons'
import { scrollToTop } from '../utils/scrollTo'

const linkButton =
  'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-sm font-medium text-neutral-300 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/5 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95'

export default function ContactBar() {
  const [toast, setToast] = useState('')

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hassanisrar9448@gmail.com')
      setToast('Email copied to clipboard')
    } catch {
      setToast('Copy failed — select the email manually')
    }
    setTimeout(() => setToast(''), 2500)
  }

  const backToTop = (event) => {
    event.preventDefault()
    scrollToTop()
  }

  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-base font-semibold tracking-tight text-white">
              Khubaib Ul Hassan<span className="text-cyan-500">.</span>
            </p>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-neutral-400">
              SQA audits, deterministic verification, and product strategy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={copyEmail} className={linkButton}>
              Copy email
            </button>
            <a
              href="https://www.linkedin.com/in/khubaib-ul-hassan"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn profile"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/5 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
            >
              <LinkedInIcon className="h-[18px] w-[18px]" />
            </a>
            <a
              href="https://github.com/KhubaibUlHassan"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="GitHub profile"
              className="inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/5 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
            >
              <GitHubIcon className="h-[18px] w-[18px]" />
            </a>
            <a href="/resume.pdf" download="Khubaib_Ul_Hassan_CV.pdf" className={linkButton}>
              <DownloadIcon className="h-4 w-4" /> Resume
            </a>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500 sm:order-2">© 2026 Khubaib Ul Hassan. All rights reserved.</p>
          <a
            href="#about"
            onClick={backToTop}
            className="group inline-flex min-h-11 cursor-pointer items-center gap-2 self-start text-sm font-medium text-neutral-400 transition-all duration-500 ease-out hover:scale-[1.02] hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] sm:order-1 sm:self-auto"
          >
            <HomeUpIcon className="h-4 w-4 transition-transform duration-300 ease-out group-hover:-translate-y-0.5" />
            Back to top
          </a>
        </div>
      </div>

      {toast &&
        createPortal(
          <div
            role="status"
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full border border-white/10 bg-neutral-900/95 px-5 py-2.5 text-sm tracking-[0.02em] text-neutral-200 backdrop-blur"
          >
            {toast}
          </div>,
          document.body,
        )}
    </footer>
  )
}
