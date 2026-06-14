import { useEffect, useRef } from 'react'

export default function Reveal({ as: Tag = 'div', className = '', delay = '', children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('in'); io.unobserve(el) }
      },
      { threshold: 0.16 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`reveal${delay ? ` ${delay}` : ''}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
