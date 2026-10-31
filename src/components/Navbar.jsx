import { useState } from 'react'
import { LinkedInIcon, DownloadIcon, MenuIcon, CloseIcon } from './Icons'
import ThemeToggle from './ThemeToggle'
import { handleAnchorClick } from '../utils/scrollTo'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Audits', href: '#audits' },
  { label: 'Contact', href: '#contact' },
]

const iconButton =
  'inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line text-ink-2 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-accent/60 hover:bg-panel-soft hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-95'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#about" onClick={handleAnchorClick} className="inline-flex min-h-11 cursor-pointer items-center text-base font-semibold tracking-tight text-ink transition-colors duration-300 hover:text-ink-2">
          Khubaib Ul Hassan<span className="text-accent-ink">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={handleAnchorClick}
              className="cursor-pointer text-ink-3 transition-all duration-500 ease-out hover:scale-[1.02] hover:text-ink hover:shadow-[0_0_20px_var(--c-accent-glow)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="https://www.linkedin.com/in/khubaib-ul-hassan"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className={`${iconButton} hidden sm:inline-flex`}
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>
          <a href="/Khubaib_SQA_CV.pdf" download="Khubaib_SQA_CV.pdf" aria-label="Download resume" className={`${iconButton} hidden sm:inline-flex`}>
            <DownloadIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#contact"
            onClick={handleAnchorClick}
            className="hidden h-11 cursor-pointer items-center justify-center rounded-full border border-accent/60 bg-accent px-5 text-sm font-medium text-white transition-all duration-500 ease-out hover:scale-[1.02] hover:border-accent-hover hover:bg-accent-hover hover:shadow-[0_0_30px_var(--c-accent-glow)] active:scale-95 sm:inline-flex"
          >
            Let's talk
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            className={`${iconButton} lg:hidden`}
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="mobile-drawer max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-panel/95 px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.label} className="mobile-nav-item" style={{ '--i': i }}>
                <a
                  href={l.href}
                  onClick={(event) => {
                    handleAnchorClick(event)
                    setOpen(false)
                  }}
                  className="flex min-h-12 cursor-pointer items-center rounded-lg border-b border-line/70 px-3 text-base text-ink-2 transition-all duration-500 ease-out hover:border-accent/40 hover:bg-accent-soft hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/khubaib-ul-hassan"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-line text-sm font-medium text-ink-2 transition-all duration-500 ease-out hover:border-accent/60 hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)]"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="/Khubaib_SQA_CV.pdf"
              download="Khubaib_SQA_CV.pdf"
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-line text-sm font-medium text-ink-2 transition-all duration-500 ease-out hover:border-accent/60 hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)]"
            >
              <DownloadIcon className="h-4 w-4" /> Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
