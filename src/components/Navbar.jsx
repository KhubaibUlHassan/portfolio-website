import { useState } from 'react'
import { LinkedInIcon, DownloadIcon, MenuIcon, CloseIcon } from './Icons'
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
  'inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/5 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:scale-95'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#about" onClick={handleAnchorClick} className="inline-flex min-h-11 cursor-pointer items-center text-base font-semibold tracking-tight text-white transition-colors duration-300 hover:text-neutral-300">
          Khubaib Ul Hassan<span className="text-cyan-500">.</span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-5 text-sm lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={handleAnchorClick}
              className="cursor-pointer text-neutral-400 transition-all duration-500 ease-out hover:scale-[1.02] hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://www.linkedin.com/in/khubaib-ul-hassan"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn profile"
            className={iconButton}
          >
            <LinkedInIcon className="h-[18px] w-[18px]" />
          </a>
          <a href="/resume.pdf" download="Khubaib_Ul_Hassan_CV.pdf" aria-label="Download resume" className={iconButton}>
            <DownloadIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#contact"
            onClick={handleAnchorClick}
            className="hidden h-11 cursor-pointer items-center justify-center rounded-full border border-cyan-500/50 bg-cyan-600 px-5 text-sm font-medium text-white transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95 sm:inline-flex"
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
        <nav id="mobile-nav" aria-label="Mobile" className="mobile-drawer max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/10 bg-neutral-950/90 px-5 pb-6 pt-3 backdrop-blur-xl lg:hidden">
          <ul className="flex flex-col">
            {links.map((l, i) => (
              <li key={l.label} className="mobile-nav-item" style={{ '--i': i }}>
                <a
                  href={l.href}
                  onClick={(event) => {
                    handleAnchorClick(event)
                    setOpen(false)
                  }}
                  className="flex min-h-12 cursor-pointer items-center rounded-lg border-b border-white/5 px-3 text-base text-neutral-300 transition-all duration-500 ease-out hover:border-cyan-500/30 hover:bg-cyan-500/[0.06] hover:text-white"
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
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-medium text-neutral-300 transition-all duration-500 ease-out hover:border-cyan-500/50 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <LinkedInIcon className="h-4 w-4" /> LinkedIn
            </a>
            <a
              href="/resume.pdf"
              download="Khubaib_Ul_Hassan_CV.pdf"
              className="inline-flex min-h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-medium text-neutral-300 transition-all duration-500 ease-out hover:border-cyan-500/50 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <DownloadIcon className="h-4 w-4" /> Resume
            </a>
          </div>
        </nav>
      )}
    </header>
  )
}
