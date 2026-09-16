import { useEffect, useRef, useState } from 'react'

interface UseCountdownOptions {
  onExpire: () => void
}

export function useCountdown(initialSeconds: number, { onExpire }: UseCountdownOptions) {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds)
  const [isPaused, setIsPaused] = useState(false)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire
  const expiredRef = useRef(false)

  useEffect(() => {
    if (isPaused) return
    const id = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          window.clearInterval(id)
          if (!expiredRef.current) {
            expiredRef.current = true
            onExpireRef.current()
          }
          return 0
        }
        return s - 1
      })
    }, 1000)
    return () => window.clearInterval(id)
  }, [isPaused])

  return {
    secondsLeft,
    isPaused,
    pause: () => setIsPaused(true),
    resume: () => setIsPaused(false),
  }
}

export function formatTime(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = totalSeconds % 60
  const pad = (n: number) => n.toString().padStart(2, '0')
  return `${pad(h)}:${pad(m)}:${pad(s)}`
}
