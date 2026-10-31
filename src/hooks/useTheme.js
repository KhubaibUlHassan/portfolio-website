import { useEffect, useState } from 'react'

const STORAGE_KEY = 'kuh-theme'
const THEME_COLORS = { dark: '#06080b', light: '#f4f6f9' }

function prefersLight() {
  return window.matchMedia('(prefers-color-scheme: light)').matches
}

export function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'light' || stored === 'dark' ? stored : null
  } catch {
    return null
  }
}

export function resolveTheme() {
  return readStoredTheme() ?? (prefersLight() ? 'light' : 'dark')
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLORS[theme])
}

export function useTheme() {
  const [theme, setTheme] = useState(resolveTheme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (readStoredTheme()) return
      setTheme(media.matches ? 'light' : 'dark')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const update = (next) => {
    setTheme(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable: theme still applies for this session */
    }
  }

  return { theme, setTheme: update, toggle: () => update(theme === 'dark' ? 'light' : 'dark') }
}
