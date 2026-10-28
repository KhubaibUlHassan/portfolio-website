import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { LinkedInIcon, DownloadIcon, ArrowUpRight } from './Icons'
import { handleAnchorClick } from '../utils/scrollTo'

const metrics = [
  { value: '11+', label: 'Agents Managed — Cloud Wave' },
  { value: '2023–2027', label: 'BSSE Academic Track — PMAS-AAUR' },
  { value: '1+', label: 'Live Portal Security Audit' },
  { value: '6+', label: 'Professional Certifications' },
]

const iconButton =
  'inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/10 text-neutral-300 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/5 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505] active:scale-95'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line > span', {
        yPercent: 115,
        duration: 1,
        stagger: 0.08,
        ease: 'power4.out',
        delay: 0.1,
      })
      gsap.from('.hero-fade', {
        y: 24,
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: 'power3.out',
        delay: 0.45,
      })

      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.to('.hero-portrait', {
          y: -12,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to('.hero-glow', {
          scale: 1.12,
          opacity: 0.9,
          duration: 5.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
        gsap.to('.hero-pulse', {
          scaleX: 1.8,
          opacity: 0.45,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          transformOrigin: 'left center',
        })
      }
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} id="about" className="relative scroll-mt-24 overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="hero-fade flex items-center gap-3">
              <span className="hero-pulse h-px w-10 bg-cyan-500" aria-hidden="true" />
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">
                Software Quality Assurance &amp; AI Engineer
              </p>
            </div>

            <h1 className="mt-6 text-[clamp(2.9rem,7.2vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight text-white">
              <span className="hero-line block overflow-hidden pb-1">
                <span className="block whitespace-nowrap">Khubaib</span>
              </span>
              <span className="hero-line block overflow-hidden pb-1">
                <span className="block whitespace-nowrap">Ul Hassan</span>
              </span>
            </h1>

            <p className="hero-fade mt-7 max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
              Building and validating autonomous AI systems with rigorous SQA auditing, deterministic
              verification pipelines, and machine cognition architectures.
            </p>

            <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleAnchorClick}
                className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-600 px-6 text-sm font-semibold text-white transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-cyan-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
              >
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-white/15 px-6 text-sm font-semibold text-neutral-200 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-cyan-500/50 hover:bg-white/5 hover:text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] active:scale-95"
              >
                Contact
              </a>
              <div className="ml-1 flex items-center gap-2">
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
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-[min(350px,74vw)] lg:w-full lg:max-w-[380px]">
              <div
                className="hero-glow pointer-events-none absolute inset-x-4 bottom-10 top-12 rounded-[50%] bg-cyan-500/15 opacity-60 blur-3xl"
                aria-hidden="true"
              />
              <img
                src="/assets/khubaib-portrait.png"
                alt="Khubaib Ul Hassan"
                className="hero-portrait relative w-full drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
                width="800"
                height="1062"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>
        </div>

        <dl className="hero-fade mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-8 lg:mt-20">
          {metrics.map((m) => (
            <div key={m.label}>
              <dt className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{m.value}</dt>
              <dd className="mt-2 text-sm uppercase leading-relaxed tracking-[0.1em] text-neutral-400">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
