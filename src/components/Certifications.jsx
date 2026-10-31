import { useLayoutEffect, useRef } from 'react'
import certifications from '../data/certifications.json'
import { AwardIcon, ArrowUpRight } from './Icons'
import { gsap } from '../hooks/useGSAP'

export default function Certifications() {
  const root = useRef(null)
  const trackRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const section = root.current
    const track = trackRef.current
    if (!section || !track) return

    const mm = gsap.matchMedia()

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
      const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth)

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${Math.max(getDistance(), 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`
            }
          },
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <section
      ref={root}
      id="certifications"
      className="relative scroll-mt-24 py-20 sm:py-28 lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden lg:py-0"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" data-reveal>
          <div className="max-w-2xl">
            <p className="eyebrow">Validated credentials</p>
            <h2 className="section-title mt-4 text-3xl sm:text-4xl">
              Certifications &amp; Credentials
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">
              Formal training across quality assurance, API testing, agile delivery, and product analytics.
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-accent-ink">
            <span className="h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_var(--c-accent-glow)]" aria-hidden="true" />
            {certifications.length} credentials
          </span>
        </div>
      </div>

      <div className="mt-10 lg:mt-12 lg:overflow-visible">
        <div
          ref={trackRef}
          className="cert-track flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 sm:px-8 sm:pb-3 lg:snap-none lg:overflow-visible lg:px-[max(2rem,calc((100vw-1200px)/2))] lg:will-change-transform"
        >
          {certifications.map((cert, i) => (
            <article
              key={cert.title}
              className="panel-card group flex w-[min(78vw,320px)] shrink-0 snap-start flex-col rounded-2xl p-6 transition-all duration-500 ease-out hover:border-accent/60 hover:shadow-[0_0_40px_var(--c-accent-glow)] sm:w-[360px] sm:p-7 lg:w-[400px]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent-soft text-accent-ink">
                  <AwardIcon className="h-5 w-5" />
                </span>
                <div className="flex items-center gap-3">
                  {cert.date && (
                    <span className="text-xs font-bold uppercase tracking-[0.12em] text-ink-3">{cert.date}</span>
                  )}
                  <span className="font-mono text-[11px] text-ink-3/70">{String(i + 1).padStart(2, '0')}</span>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-bold leading-snug tracking-tight text-ink sm:text-xl">
                {cert.title}
              </h3>
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent-ink">{cert.issuer}</p>

              <div className="mt-auto pt-7">
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-1.5 text-sm font-medium text-ink-2 transition-all duration-500 ease-out hover:text-ink"
                  >
                    View credential
                    <span aria-hidden="true" className="text-accent-ink transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
                  </a>
                ) : (
                  <span className="inline-flex min-h-11 items-center text-sm font-medium text-ink-3">
                    Credential on file
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-8 hidden w-full max-w-[1200px] px-8 lg:block">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-line">
            <div ref={progressRef} className="h-px origin-left scale-x-0 bg-accent" />
          </div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">Scroll to explore</p>
          <ArrowUpRight className="h-3.5 w-3.5 -rotate-45 text-accent-ink" aria-hidden="true" />
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1200px] items-center justify-center gap-2 px-5 sm:px-8 lg:hidden">
        <span className="h-px w-8 bg-line" aria-hidden="true" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-3">Swipe horizontally</p>
        <span className="h-px w-8 bg-line" aria-hidden="true" />
      </div>
    </section>
  )
}
