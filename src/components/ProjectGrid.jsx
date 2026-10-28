import projects from '../data/projects.json'

export default function ProjectGrid() {
  return (
    <section id="projects" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Selected work</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Projects &amp; Case Studies
        </h2>
      </div>

      <div className="mt-10 border-t border-white/10">
        {projects.map((p) => (
          <article
            key={p.id}
            className="group grid gap-6 border-b border-white/10 py-10 transition-all duration-500 ease-out hover:border-cyan-500/30 hover:bg-white/[0.02] hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] md:grid-cols-12 md:gap-10 md:py-12"
          >
            <div className="md:col-span-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400">{p.category}</p>
              <h3 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
                {p.title}
              </h3>
            </div>

            <div className="md:col-span-8">
              <p className="max-w-2xl text-base leading-relaxed text-neutral-300">{p.summary}</p>

              <ul className="mt-6 space-y-3">
                {p.metrics.map((m) => (
                  <li key={m} className="flex gap-3 text-base leading-relaxed text-neutral-300">
                    <span className="mt-2 h-px w-4 shrink-0 bg-cyan-600" aria-hidden="true" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-sm uppercase tracking-[0.1em] text-neutral-400">
                {p.tags.join('  /  ')}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
