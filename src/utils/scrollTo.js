import { ScrollSmoother } from '../hooks/useGSAP'

const HEADER_GAP = 20

function getHeaderOffset() {
  const headerBar = document.querySelector('header > div')
  return (headerBar?.offsetHeight ?? 64) + HEADER_GAP
}

function getMaxScroll() {
  return Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
}

function getTargetY(target) {
  if (target === 'top') return 0

  const element = typeof target === 'string' ? document.getElementById(target) : target
  if (!element) return null

  const smoother = ScrollSmoother.get()
  const top = smoother
    ? smoother.offset(element, 'top top')
    : element.getBoundingClientRect().top + window.scrollY

  return Math.max(0, Math.min(top - getHeaderOffset(), getMaxScroll()))
}

export function scrollToTarget(target, smooth = true) {
  const y = getTargetY(target)
  if (y === null) return

  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(y, smooth)
    return
  }

  window.scrollTo({ top: y, left: 0, behavior: smooth ? 'smooth' : 'auto' })
}

export function scrollToTop(smooth = true) {
  const smoother = ScrollSmoother.get()
  if (smoother) {
    smoother.scrollTo(0, smooth)
    return
  }

  window.scrollTo({ top: 0, left: 0, behavior: smooth ? 'smooth' : 'auto' })
}

export function handleAnchorClick(event) {
  const href = event.currentTarget.getAttribute('href')
  if (!href?.startsWith('#')) return

  const id = href.slice(1)
  if (!id || !document.getElementById(id)) return

  event.preventDefault()
  scrollToTarget(id)
}
