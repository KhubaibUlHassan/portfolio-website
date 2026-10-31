import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { LinkedInIcon, DownloadIcon, ArrowUpRight } from './Icons'
import { handleAnchorClick } from '../utils/scrollTo'

const metrics = [
  { value: '30+', label: 'Manual Test Cases Executed' },
  { value: '11', label: 'Team Members Led — Cloud Wave' },
  { value: '5', label: 'Critical Vulnerabilities Documented' },
  { value: '2023–2027', label: 'BSSE Academic Track — PMAS-AAUR' },
]

const iconButton =
  'inline-flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-line text-ink-2 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-accent/60 hover:bg-panel-soft hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-95'

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
              <span className="hero-pulse h-px w-10 bg-accent" aria-hidden="true" />
              <p className="eyebrow">Software Quality Assurance &amp; AI Engineer</p>
            </div>

            <h1 className="mt-6 text-[clamp(2.9rem,7.2vw,6.5rem)] font-black uppercase leading-[0.92] tracking-tight text-ink">
              <span className="hero-line block overflow-hidden pb-1">
                <span className="block whitespace-nowrap">Khubaib</span>
              </span>
              <span className="hero-line block overflow-hidden pb-1">
                <span className="block whitespace-nowrap">Ul Hassan</span>
              </span>
            </h1>

            <p className="hero-fade mt-7 max-w-xl text-base leading-relaxed text-ink-2 sm:text-lg">
              Building and validating autonomous AI systems with rigorous SQA auditing, deterministic
              verification pipelines, and machine cognition architectures.
            </p>

            <div className="hero-fade mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={handleAnchorClick}
                className="group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full border border-accent/60 bg-accent px-6 text-sm font-semibold text-white transition-all duration-500 ease-out hover:scale-[1.02] hover:border-accent-hover hover:bg-accent-hover hover:shadow-[0_0_30px_var(--c-accent-glow)] active:scale-95"
              >
                View case study
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#contact"
                onClick={handleAnchorClick}
                className="inline-flex min-h-12 cursor-pointer items-center justify-center rounded-full border border-line-strong px-6 text-sm font-semibold text-ink-2 transition-all duration-500 ease-out hover:scale-[1.02] hover:border-accent/60 hover:bg-panel-soft hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)] active:scale-95"
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
                <a href="/Khubaib_SQA_CV.pdf" download="Khubaib_SQA_CV.pdf" aria-label="Download resume" className={iconButton}>
                  <DownloadIcon className="h-[18px] w-[18px]" />
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative mx-auto w-[min(350px,78vw)] lg:w-full lg:max-w-[400px]">
              <div className="portrait-frame relative rounded-[2rem] border border-line bg-panel p-2.5 shadow-[0_30px_70px_-45px_var(--c-accent-glow)]">
                <div className="portrait-backdrop relative overflow-hidden rounded-[1.55rem]">
                  <div className="portrait-grid pointer-events-none absolute inset-0" aria-hidden="true" />
                  <div
                    className="pointer-events-none absolute left-1/2 top-8 h-[64%] w-[64%] -translate-x-1/2 rounded-t-full border border-b-0 border-accent/25"
                    aria-hidden="true"
                  />
                  <div
                    className="hero-glow pointer-events-none absolute inset-x-8 bottom-14 top-10 rounded-[50%] bg-accent/20 opacity-70 blur-3xl"
                    aria-hidden="true"
                  />
                  <img
                    src="/assets/khubaib-portrait.png"
                    alt="Khubaib Ul Hassan"
                    className="hero-portrait relative z-10 block w-full pt-4"
                    width="800"
                    height="1062"
                    fetchPriority="high"
                    decoding="async"
                  />
                </div>

                <div className="pointer-events-none absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#0a141b] shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]">
                  <img src="/assets/brand-mark.png" alt="" className="h-6 w-6" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute -bottom-4 left-4 z-20 inline-flex items-center gap-2 rounded-full border border-line bg-panel/90 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-2 shadow-sm backdrop-blur">
                <span
                  className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]"
                  aria-hidden="true"
                />
                SQA · API · AI Evaluation
              </div>
            </div>
          </div>
        </div>

        <dl className="hero-fade mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4 sm:gap-8 lg:mt-20">
          {metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{m.value}</dt>
              <dd className="mt-2 text-sm uppercase leading-relaxed tracking-[0.1em] text-ink-3">{m.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
