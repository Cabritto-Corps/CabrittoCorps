import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    let tx = innerWidth / 2, ty = innerHeight / 2
    let x = tx, y = ty, animId

    function onMove(e) { tx = e.clientX; ty = e.clientY }

    function loop() {
      x += (tx - x) * 0.10
      y += (ty - y) * 0.10
      glow.style.transform = `translate(${x}px, ${y}px)`
      animId = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    loop()
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return <div ref={glowRef} className="cursor-glow" />
}
