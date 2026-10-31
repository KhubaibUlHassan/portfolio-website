import { useMemo, useState } from 'react'

const tabs = [
  { key: 'bdd', label: 'BDD' },
  { key: 'contract', label: 'Contract Testing' },
  { key: 'guardrails', label: 'AI Guardrails' },
]

const content = {
  bdd: `Feature: Proctored assessment session
  Scenario: Session exceeds inactivity threshold
    Given an active proctored session
    And the candidate is idle for more than 120 seconds
    When the proctor heartbeat is evaluated
    Then the session must require re-authentication
    And an audit event must be persisted

  Scenario Outline: Boundary attempts
    Given a submission payload with <field> = <value>
    When validation runs
    Then the API must return <status>`,
  contract: `Pact V4 verification
  Consumer: evaluation-ui
  Provider: evaluations-api

  expected: { score: number(0..100) }
  actual:   { score: "87" }        # string

  -> MISMATCH: type(number) != type(string)
  -> HTTP 403 Forbidden
  -> Build gate: FAILED (breaking change)`,
  guardrails: `DeepEval guardrail gate
  faithfulness       >= 0.90   -> PASS
  answer_relevancy   >= 0.85   -> PASS
  context_precision  >= 0.80   -> PASS
  toxicity           <= 0.10   -> PASS

  Sample: faithfulness = 0.62 -> REJECT
  Rationale: claim not grounded in retrieved context.`,
}

export default function SqaInspector() {
  const [active, setActive] = useState('bdd')
  const lines = useMemo(() => content[active].split('\n'), [active])

  return (
    <section id="audits" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="max-w-2xl" data-reveal>
        <p className="eyebrow">Quality engineering</p>
        <h2 className="section-title mt-4 text-3xl sm:text-4xl">Audit &amp; Defect Inspector</h2>
        <p className="mt-4 text-base leading-relaxed text-ink-2">
          Deterministic verification, consumer-driven contracts, and AI guardrail assertions. No happy-path-only scripts.
        </p>
      </div>

      <div className="panel-card mt-10 overflow-hidden rounded-xl" data-reveal>
        <div className="flex flex-wrap gap-x-5 gap-y-1 border-b border-line px-4 sm:px-6" role="tablist" aria-label="Inspection modes">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              aria-selected={active === t.key}
              onClick={() => setActive(t.key)}
              className={`min-h-12 min-w-11 cursor-pointer border-b-2 px-1 text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 ease-out hover:shadow-[0_0_20px_var(--c-accent-glow)] sm:text-base ${
                active === t.key ? 'border-accent text-ink' : 'border-transparent text-ink-3 hover:text-ink-2'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <pre className="overflow-x-auto bg-code p-4 font-mono text-sm leading-relaxed text-ink-2 sm:p-6 sm:text-base">
{lines.map((line, i) => (
  <div key={i} className="flex gap-3 sm:gap-4">
    <span className="w-6 shrink-0 select-none text-right text-sm text-ink-3/60">{String(i + 1).padStart(2, '0')}</span>
    <span className={line.includes('FAILED') || line.includes('MISMATCH') || line.includes('REJECT') ? 'text-danger' : line.includes('PASS') ? 'text-pass' : ''}>
      {line || '\u00A0'}
    </span>
  </div>
))}
        </pre>
      </div>
    </section>
  )
}
