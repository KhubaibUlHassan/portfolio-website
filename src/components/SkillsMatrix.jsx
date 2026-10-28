import { useState } from 'react'
import skills from '../data/skills.json'

const groups = [
  { key: 'sqa', label: 'SQA Automation' },
  { key: 'pm', label: 'Product Management' },
  { key: 'eng', label: 'Engineering' },
]

export default function SkillsMatrix() {
  const [active, setActive] = useState('sqa')

  return (
    <section id="skills" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-500">Capabilities</p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Skills &amp; Tooling</h2>
        <p className="mt-4 text-base leading-relaxed text-neutral-300">
          Applied capabilities across verification, product delivery, and implementation.
        </p>
      </div>

      <div className="mt-9 flex flex-wrap gap-x-6 gap-y-1 border-b border-white/10" role="tablist" aria-label="Skill categories">
        {groups.map((g) => (
          <button
            key={g.key}
            type="button"
            role="tab"
            aria-selected={active === g.key}
            onClick={() => setActive(g.key)}
            className={`min-h-12 cursor-pointer border-b-2 px-1 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 ease-out hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] sm:text-base ${
              active === g.key
                ? 'border-cyan-600 text-white'
                : 'border-transparent text-neutral-500 hover:text-neutral-300'
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      <div
        key={active}
        id="skills-panel"
        role="tabpanel"
        className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skills[active].map((skill, i) => (
          <article
            key={skill.name}
            className="stagger-card group rounded-xl border border-white/10 bg-white/[0.02] p-5 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-cyan-500/40 hover:bg-white/[0.04] hover:shadow-[0_0_30px_rgba(6,182,212,0.2)] sm:p-6"
            style={{ '--i': i }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-snug text-white">{skill.name}</h3>
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70 shadow-[0_0_10px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:bg-cyan-300 group-hover:shadow-[0_0_16px_rgba(6,182,212,0.8)]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-neutral-300">{skill.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-cyan-500/20 bg-cyan-500/[0.06] px-2.5 py-1 text-sm text-cyan-100/90"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}
