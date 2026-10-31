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
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">Capabilities</p>
        <h2 className="section-title mt-4 text-3xl sm:text-4xl">Skills &amp; Tooling</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-2">
          Applied capabilities across verification, product delivery, and implementation.
        </p>
      </div>

      <div className="mt-9 flex flex-wrap gap-x-6 gap-y-1 border-b border-line" role="tablist" aria-label="Skill categories">
        {groups.map((g) => (
          <button
            key={g.key}
            type="button"
            role="tab"
            aria-selected={active === g.key}
            onClick={() => setActive(g.key)}
            className={`min-h-12 cursor-pointer border-b-2 px-1 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 ease-out hover:shadow-[0_0_20px_var(--c-accent-glow)] sm:text-base ${
              active === g.key
                ? 'border-accent text-ink'
                : 'border-transparent text-ink-3 hover:text-ink-2'
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
            className="stagger-card panel-card group rounded-xl p-5 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:shadow-[0_0_30px_var(--c-accent-glow)] sm:p-6"
            style={{ '--i': i }}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-lg font-semibold leading-snug text-ink">{skill.name}</h3>
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70 shadow-[0_0_10px_var(--c-accent-glow)] transition-all duration-500 group-hover:bg-accent group-hover:shadow-[0_0_16px_var(--c-accent-glow)]"
                aria-hidden="true"
              />
            </div>

            <p className="mt-3 text-sm leading-relaxed text-ink-2">{skill.description}</p>

            <ul className="mt-4 flex flex-wrap gap-2">
              {skill.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 text-sm text-accent-ink"
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
