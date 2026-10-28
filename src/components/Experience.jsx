const experience = [
  {
    role: 'Team Lead (Operations & Reporting)',
    company: 'Cloud Wave Innovations',
    location: 'Rawalpindi, Pakistan',
    period: 'July 2025 — Dec 2025',
    bullets: [
      'Directed daily operations for an 11-person inbound sales team, accountable for delivery targets and quality standards.',
      'Acted as the central point of quality control, identifying workflow bottlenecks and resolving daily operational bugs.',
      'Implemented standardized reporting frameworks, reducing logging error rates and ensuring 100% adherence to project timelines.',
      'Delivered weekly data-driven analytics and operational reports to stakeholders.',
    ],
  },
  {
    role: 'Independent Web Security Auditor',
    company: 'UIIT Student Web Portal',
    location: 'Independent',
    period: 'Security & Functional Audit',
    bullets: [
      'Initiated a proactive security and functional audit of the university’s live student portal.',
      'Executed manual testing focused on boundary value analysis, functional flow interruptions, and session management inconsistencies.',
      'Identified and documented critical vulnerabilities that could lead to data exposure.',
      'Compiled a professional bug audit report with reproduction steps and severity levels.',
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Track record</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Experience</h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-300">
          Professional roles across quality control, operations, and independent security auditing.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {experience.map((job) => (
          <article
            key={job.role}
            className="rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 ease-out hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:p-8"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">{job.role}</h3>
              <span className="text-sm font-bold uppercase tracking-[0.1em] text-sky-400">{job.period}</span>
            </div>
            <p className="mt-2 text-base font-medium text-neutral-300">{job.company}</p>
            <p className="mt-1 text-sm text-neutral-500">{job.location}</p>

            <ul className="mt-6 space-y-3">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-base leading-relaxed text-neutral-300">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-cyan-500" aria-hidden="true" />
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
