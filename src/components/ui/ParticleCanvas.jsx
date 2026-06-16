import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, DPR, motes = [], animId
    const mouse = { x: -9999, y: -9999 }
    const MR = 150

    function resize() {
      DPR = Math.min(devicePixelRatio || 1, 2)
      W = canvas.width  = innerWidth  * DPR
      H = canvas.height = innerHeight * DPR
      canvas.style.width  = innerWidth  + 'px'
      canvas.style.height = innerHeight + 'px'
      const count = Math.min(110, Math.floor((innerWidth * innerHeight) / 15000))
      motes = Array.from({ length: count }, () => ({
        x:    Math.random() * W,
        y:    Math.random() * H,
        vx:   (Math.random() - 0.5) * 0.12 * DPR,
        vy:   (-Math.random() * 0.18 - 0.03) * DPR,
        r:    (Math.random() * 1.8 + 0.5) * DPR,
        tw:   Math.random() * Math.PI * 2,
        warm: Math.random() > 0.5,
      }))
    }

    function onPointerMove(e) { mouse.x = e.clientX * DPR; mouse.y = e.clientY * DPR }
    function onPointerLeave() { mouse.x = -9999; mouse.y = -9999 }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      const mr = MR * DPR
      for (const m of motes) {
        m.x += m.vx; m.y += m.vy; m.tw += 0.025
        if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W }
        if (m.x < -10) m.x = W + 10
        if (m.x > W + 10) m.x = -10
        const dx = m.x - mouse.x, dy = m.y - mouse.y, d = Math.hypot(dx, dy)
        if (d < mr) {
          const f = (1 - d / mr) * 0.5
          m.x += (-dy / (d || 1)) * f; m.y += (dx / (d || 1)) * f
          m.x += (dx / (d || 1)) * f * 0.4; m.y += (dy / (d || 1)) * f * 0.4
        }
        const a = 0.18 + (Math.sin(m.tw) * 0.5 + 0.5) * 0.32
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = m.warm ? `rgba(168,130,60,${a})` : `rgba(89,62,28,${a * 0.7})`
        ctx.fill()
      }
      animId = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    if (reduce) {
      motes.forEach(m => {
        ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(168,130,60,0.25)'; ctx.fill()
      })
    } else {
      frame()
    }

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 2, pointerEvents: 'none' }}
    />
  )
}
