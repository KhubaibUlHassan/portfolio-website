export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">Academic background</p>
        <h2 className="section-title mt-4 text-3xl sm:text-4xl">Education</h2>
      </div>

      <article
        data-reveal
        className="panel-card mt-10 rounded-xl p-6 transition-all duration-500 ease-out hover:border-accent/50 hover:shadow-[0_0_30px_var(--c-accent-glow)] sm:p-8"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              BS Software Engineering
            </h3>
            <p className="mt-2 text-lg font-medium text-ink-2">
              University Institute of Information Technology (PMAS-AAUR)
            </p>
            <p className="mt-1 text-base text-ink-3">Rawalpindi, Pakistan</p>
          </div>
          <span className="text-base font-bold uppercase tracking-[0.1em] text-accent-ink">2023 — 2027</span>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-ink-2">
          Computer software engineering foundations with a focus on system design, architecture, and software
          quality assurance — connecting academic theory with real-world validation workflows.
        </p>
      </article>
    </section>
  )
}
