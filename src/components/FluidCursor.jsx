import { useEffect, useRef } from 'react'
import mountFluidCursor from '../hooks/useFluidCursor'

export default function FluidCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    return mountFluidCursor(canvas)
  }, [])

  return (
    <div className="fluid-cursor" aria-hidden="true">
      <canvas ref={canvasRef} id="fluid" className="fluid-cursor-canvas" />
    </div>
  )
}
