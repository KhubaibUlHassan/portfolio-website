import projects from '../data/projects.json'

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">Selected work</p>
        <h2 className="section-title mt-4 text-3xl sm:text-4xl">
          Projects &amp; Case Studies
        </h2>
      </div>

      <div className="mt-10 border-t border-line">
        {projects.map((p) => (
          <article
            key={p.id}
            data-reveal
            className="group grid gap-6 border-b border-line py-10 transition-all duration-500 ease-out hover:border-accent/40 hover:bg-panel-soft md:grid-cols-12 md:gap-10 md:py-12"
          >
            <div className="md:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-3">{p.category}</p>
              <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-ink sm:text-3xl">
                {p.title}
              </h3>
            </div>

            <div className="md:col-span-8">
              <p className="max-w-2xl text-base leading-relaxed text-ink-2">{p.summary}</p>

              <ul className="mt-6 space-y-3">
                {p.metrics.map((m) => (
                  <li key={m} className="flex gap-3 text-base leading-relaxed text-ink-2">
                    <span className="mt-2 h-px w-4 shrink-0 bg-accent" aria-hidden="true" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm uppercase tracking-[0.1em] text-ink-3">
                {p.tags.join('  /  ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
