import { ArrowUpRight, DownloadIcon, GitHubIcon, LinkedInIcon, MailIcon } from './Icons'

const EMAIL = 'hassanisrar9448@gmail.com'

const links = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: MailIcon,
    external: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/khubaib-ul-hassan',
    href: 'https://www.linkedin.com/in/khubaib-ul-hassan',
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/KhubaibUlHassan',
    href: 'https://github.com/KhubaibUlHassan',
    icon: GitHubIcon,
    external: true,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="relative mx-auto max-w-[1200px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5" data-reveal>
          <p className="eyebrow">Work with me</p>
          <h2 className="section-title mt-4 text-3xl sm:text-4xl">Start a Conversation</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-2">
            For SQA audits, AI evaluation, product strategy, or a full-stack build, reach out directly through
            email or LinkedIn.
          </p>
          <p className="mt-5 text-sm uppercase tracking-[0.1em] text-ink-3">Response within 24 hours / NDA friendly</p>
        </div>

        <div className="panel-card rounded-2xl p-5 sm:p-7 lg:col-span-7" data-reveal>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-3">Direct channels</p>

          <div className="mt-4 divide-y divide-line">
            {links.map(({ label, value, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                className="group flex min-h-16 items-center gap-4 py-4 transition-colors duration-300 hover:text-ink"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent-ink transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-[0_0_24px_var(--c-accent-glow)]">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs font-bold uppercase tracking-[0.14em] text-accent-ink">{label}</span>
                  <span className="mt-1 block break-all text-base font-medium text-ink-2 transition-colors duration-300 group-hover:text-ink">
                    {value}
                  </span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-3 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
              </a>
            ))}
          </div>

          <a
            href="/Khubaib_SQA_CV.pdf"
            download="Khubaib_SQA_CV.pdf"
            className="mt-4 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full border border-line px-5 text-sm font-semibold text-ink-2 transition-all duration-500 ease-out hover:scale-[1.01] hover:border-accent/60 hover:bg-panel-soft hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)] active:scale-95"
          >
            <DownloadIcon className="h-4 w-4" />
            Download resume
          </a>
        </div>
      </div>
    </section>
  )
}
