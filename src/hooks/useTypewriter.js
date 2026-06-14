import { useState, useEffect } from 'react'

export default function useTypewriter(
  phrases,
  typingSpeed = 62,
  deletingSpeed = 34,
  pauseMs = 1700,
) {
  const [text, setText] = useState('')

  useEffect(() => {
    let pi = 0, ci = 0, deleting = false, timeout

    function tick() {
      const word = phrases[pi]
      if (!deleting) {
        ci++
        setText(word.slice(0, ci))
        if (ci === word.length) {
          deleting = true
          timeout = setTimeout(tick, pauseMs)
          return
        }
      } else {
        ci--
        setText(word.slice(0, ci))
        if (ci === 0) {
          deleting = false
          pi = (pi + 1) % phrases.length
        }
      }
      timeout = setTimeout(tick, deleting ? deletingSpeed : typingSpeed)
    }

    timeout = setTimeout(tick, typingSpeed)
    return () => clearTimeout(timeout)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return text
}
