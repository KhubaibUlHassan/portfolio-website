import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger, ScrollSmoother } from './hooks/useGSAP'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Education from './components/Education'
import Certifications from './components/Certifications'
import ProjectGrid from './components/ProjectGrid'
import SkillsMatrix from './components/SkillsMatrix'
import SqaInspector from './components/SqaInspector'
import ContactSection from './components/ContactSection'
import ContactBar from './components/ContactBar'
import AiAssistant from './components/AiAssistant'
import './App.css'

export default function App() {
  const root = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: prefersReduced ? 0 : isMobile ? 0 : 1.1,
        smoothTouch: prefersReduced ? 0 : 0.1,
        effects: !prefersReduced,
        normalizeScroll: false,
      })

      if (!prefersReduced) {
        gsap.utils.toArray<HTMLElement>('section').forEach((section) => {
          const items = section.querySelectorAll<HTMLElement>('[data-reveal]')
          if (!items.length) return

          items.forEach((item) => {
            gsap.from(item, {
              y: 30,
              opacity: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            })
          })
        })
      }

      return () => smoother.kill()
    }, root)

    const refreshAfterFonts = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refreshAfterFonts).catch(() => {})
    window.addEventListener('load', refreshAfterFonts)

    return () => {
      window.removeEventListener('load', refreshAfterFonts)
      ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <div ref={root}>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Hero />
            <Experience />
            <Education />
            <Certifications />
            <ProjectGrid />
            <SkillsMatrix />
            <SqaInspector />
            <ContactSection />
          </main>
          <ContactBar />
        </div>
      </div>
      <AiAssistant />
    </div>
  )
}
