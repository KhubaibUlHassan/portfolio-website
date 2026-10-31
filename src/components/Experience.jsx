const experience = [
  {
    role: 'Team Lead (Operations & Reporting)',
    company: 'Cloud Wave Innovations',
    location: 'Rawalpindi, Pakistan',
    period: 'July 2025 — Dec 2025',
    bullets: [
      'Managed daily technical operations and QA compliance for an 11-member team, sustaining 100% adherence to performance metrics.',
      'Optimized reporting workflows and task tracking, achieving a 25% reduction in data logging error rates over six months.',
      'Prepared and delivered 24+ weekly analytical reports to executive stakeholders with a 100% on-time delivery rate.',
    ],
  },
  {
    role: 'Independent Web Security Auditor',
    company: 'Arid Web Portal',
    location: 'Independent',
    period: 'Security & Functional Audit',
    bullets: [
      'Designed and executed 30+ manual test cases covering functional flows, boundary value analysis, and user session management.',
      'Identified and documented 5 critical vulnerabilities around data exposure and session logic, with reproduction steps for development leads.',
      'Achieved 100% test coverage across primary portal workflows and established formal bug reports with severity and priority ratings.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">Track record</p>
        <h2 className="section-title mt-4 text-3xl sm:text-4xl">Experience</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-2">
          Professional roles across quality control, operations, and independent security auditing.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {experience.map((job) => (
          <article
            key={job.role}
            data-reveal
            className="panel-card rounded-xl p-6 transition-all duration-500 ease-out hover:border-accent/50 hover:shadow-[0_0_30px_var(--c-accent-glow)] sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-ink">{job.role}</h3>
              <span className="text-sm font-bold uppercase tracking-[0.1em] text-accent-ink">{job.period}</span>
            </div>
            <p className="mt-2 text-base font-medium text-ink-2">{job.company}</p>
            <p className="mt-1 text-sm text-ink-3">{job.location}</p>

            <ul className="mt-6 space-y-3">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-base leading-relaxed text-ink-2">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
