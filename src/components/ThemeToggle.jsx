import { MoonIcon, SunIcon } from './Icons'
import { useTheme } from '../hooks/useTheme'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      className={`group relative inline-flex h-11 w-11 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-line text-ink-2 transition-all duration-500 ease-out hover:border-accent/60 hover:text-ink hover:shadow-[0_0_30px_var(--c-accent-glow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg active:scale-95 ${className}`}
    >
      <span
        className={`absolute inline-flex transition-all duration-500 ease-out ${isDark ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}
        aria-hidden="true"
      >
        <MoonIcon className="h-[18px] w-[18px]" />
      </span>
      <span
        className={`absolute inline-flex transition-all duration-500 ease-out ${isDark ? 'translate-y-6 opacity-0' : 'translate-y-0 opacity-100'}`}
        aria-hidden="true"
      >
        <SunIcon className="h-[18px] w-[18px]" />
      </span>
    </button>
  )
}
