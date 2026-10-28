export default function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Academic background</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Education</h2>
      </div>

      <article className="mt-10 rounded-xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-500 ease-out hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              BS Software Engineering
            </h3>
            <p className="mt-2 text-lg font-medium text-neutral-300">
              University Institute of Information Technology (PMAS-AAUR)
            </p>
            <p className="mt-1 text-base text-neutral-500">Rawalpindi, Pakistan</p>
          </div>
          <span className="text-base font-bold uppercase tracking-[0.1em] text-sky-400">2023 — 2027</span>
        </div>

        <p className="mt-6 max-w-3xl text-base leading-relaxed text-neutral-300">
          Computer software engineering foundations with a focus on system design, architecture, and software
          quality assurance — connecting academic theory with real-world validation workflows.
        </p>
      </article>
    </section>
  )
}
