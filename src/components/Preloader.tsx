import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [counter, setCounter] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const curtainRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) {
      onComplete()
      return
    }

    if (sessionStorage.getItem('portfolio-visited') === '1') {
      onComplete()
      return
    }
    sessionStorage.setItem('portfolio-visited', '1')

    const duration = 0.9
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCounter(Math.round(eased * 100))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    tl.to({}, { duration: 0.55 })
      .to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: 'top',
        duration: 0.75,
        ease: 'power3.inOut',
      })
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.4,
          pointerEvents: 'none',
        },
        '-=0.3'
      )

    return () => {
      tl.kill()
    }
  }, [onComplete, reduced])

  if (reduced) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[20000] flex flex-col items-center justify-center bg-base"
      aria-hidden="true"
    >
      <div className="text-center">
        <div className="font-display text-7xl md:text-9xl gradient-text tabular-nums leading-none">
          {counter}
          <span className="text-3xl md:text-5xl opacity-60">%</span>
        </div>
      </div>
      <div
        ref={curtainRef}
        className="absolute inset-0 bg-gradient-to-b from-violet/20 via-indigo/10 to-base pointer-events-none"
        style={{ transformOrigin: 'top' }}
      />
    </div>
  )
}
