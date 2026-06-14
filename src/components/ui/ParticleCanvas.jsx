import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
    let W, H, DPR, stars = [], animId
    const mouse = { x: -9999, y: -9999 }

    function resize() {
      DPR = Math.min(devicePixelRatio || 1, 2)
      W = canvas.width  = innerWidth  * DPR
      H = canvas.height = innerHeight * DPR
      canvas.style.width  = innerWidth  + 'px'
      canvas.style.height = innerHeight + 'px'
      const count = Math.min(150, Math.floor((innerWidth * innerHeight) / 11000))
      stars = Array.from({ length: count }, () => ({
        x:  Math.random() * W,
        y:  Math.random() * H,
        vx: (Math.random() - 0.5) * 0.16 * DPR,
        vy: (Math.random() - 0.5) * 0.16 * DPR,
        r:  (Math.random() * 1.4 + 0.4) * DPR,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    function onPointerMove(e) { mouse.x = e.clientX * DPR; mouse.y = e.clientY * DPR }
    function onPointerLeave() { mouse.x = -9999; mouse.y = -9999 }

    function frame() {
      ctx.clearRect(0, 0, W, H)
      const linkDist = 128 * DPR
      const mr       = 170 * DPR

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        s.x += s.vx; s.y += s.vy
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0

        const dxm = mouse.x - s.x, dym = mouse.y - s.y
        const dm  = Math.hypot(dxm, dym)
        if (dm < mr) {
          const f = (1 - dm / mr) * 0.6
          s.x += (dxm / (dm || 1)) * f
          s.y += (dym / (dm || 1)) * f
        }

        s.tw += 0.03
        const a = 0.45 + Math.sin(s.tw) * 0.3
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(150,210,225,${a})`
        ctx.fill()

        if (dm < mr) {
          ctx.beginPath()
          ctx.moveTo(s.x, s.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.strokeStyle = `rgba(0,229,255,${(1 - dm / mr) * 0.4})`
          ctx.lineWidth   = DPR * 0.6
          ctx.stroke()
        }

        for (let j = i + 1; j < stars.length; j++) {
          const o  = stars[j]
          const dx = s.x - o.x, dy = s.y - o.y
          const d  = Math.hypot(dx, dy)
          if (d < linkDist) {
            ctx.beginPath()
            ctx.moveTo(s.x, s.y)
            ctx.lineTo(o.x, o.y)
            ctx.strokeStyle = `rgba(0,229,255,${(1 - d / linkDist) * 0.12})`
            ctx.lineWidth   = DPR * 0.5
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(frame)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)

    if (reduce) {
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(150,210,225,0.5)'; ctx.fill()
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
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
