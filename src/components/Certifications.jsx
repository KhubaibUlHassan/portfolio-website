import certifications from '../data/certifications.json'
import { AwardIcon } from './Icons'

export default function Certifications() {
  return (
    <section id="certifications" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Validated credentials</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Certifications &amp; Credentials
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-300">
            Formal training across quality assurance, API testing, agile delivery, and product analytics.
          </p>
        </div>

        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/[0.07] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-cyan-300">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" aria-hidden="true" />
          6+ credentials
        </span>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <article
            key={cert.title}
            className="flex flex-col rounded-xl border border-white/10 bg-[#0a0a0a] p-6 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:p-7"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 text-sky-400">
                <AwardIcon className="h-5 w-5" />
              </span>
              {cert.date && (
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">{cert.date}</span>
              )}
            </div>

            <h3 className="mt-5 text-lg font-bold leading-snug tracking-tight text-white sm:text-xl">
              {cert.title}
            </h3>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-cyan-400">{cert.issuer}</p>

            <div className="mt-auto pt-6">
              {cert.href ? (
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex min-h-11 w-fit cursor-pointer items-center gap-1.5 text-sm font-medium text-neutral-300 transition-all duration-500 ease-out hover:scale-[1.02] hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                >
                  View credential
                  <span aria-hidden="true" className="text-cyan-400">↗</span>
                </a>
              ) : (
                <span className="inline-flex min-h-11 items-center text-sm font-medium text-neutral-500">
                  Credential on file
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
