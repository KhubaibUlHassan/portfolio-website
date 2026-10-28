import { useLayoutEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

export function useGSAPContext(ref, callback) {
  useLayoutEffect(() => {
    const ctx = gsap.context(callback, ref)
    return () => ctx.revert()
  }, [ref, callback])
}

export { gsap, ScrollTrigger, ScrollSmoother }
