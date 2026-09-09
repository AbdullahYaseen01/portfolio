import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { MagneticButton } from '../components/MagneticButton'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { PROFILE } from '../data/content'

const HeroScene = lazy(() =>
  import('../three/HeroScene').then((m) => ({ default: m.HeroScene }))
)

function HeroScenePlaceholder() {
  return <div className="hero-v2-fallback" aria-hidden="true" />
}

function shouldLoadHeroScene() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

const ROLES = ['Full-Stack Developer', 'AI Engineer', 'Computer Vision']

const TICKER = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'YOLO',
  'OpenCV',
  'Three.js',
]

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const reduced = useReducedMotion()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [enableScene, setEnableScene] = useState(false)

  useEffect(() => {
    if (reduced || !shouldLoadHeroScene()) return

    let cancelled = false
    const enable = () => {
      if (!cancelled) setEnableScene(true)
    }

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    if (win.requestIdleCallback) {
      const id = win.requestIdleCallback(enable, { timeout: 2500 })
      return () => {
        cancelled = true
        win.cancelIdleCallback?.(id)
      }
    }

    const timer = setTimeout(enable, 400)
    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced])

  useEffect(() => {
    if (reduced) return

    const tl = gsap.timeline({ delay: 0.12 })
    const letters = nameRef.current?.querySelectorAll('.hero-v2-letter') ?? []
    const reveals = stageRef.current?.querySelectorAll('.hero-v2-reveal') ?? []

    tl.fromTo(
      letters,
      { opacity: 0, y: 36, rotateX: 18 },
      { opacity: 1, y: 0, rotateX: 0, duration: 0.7, ease: 'power3.out', stagger: 0.028 }
    ).fromTo(
      reveals,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out' },
      '-=0.35'
    )

    return () => {
      tl.kill()
    }
  }, [reduced])

  const tickerItems = [...TICKER, ...TICKER]

  return (
    <section id="hero" className="hero-v2" aria-label="Hero">
      <div className="hero-v2-scene" aria-hidden="true">
        {enableScene ? (
          <Suspense fallback={<HeroScenePlaceholder />}>
            <HeroScene mouse={mouse} />
          </Suspense>
        ) : (
          <HeroScenePlaceholder />
        )}
      </div>

      <div className="hero-v2-wash" aria-hidden="true" />
      <div className="hero-v2-grain" aria-hidden="true" />

      <div className="hero-v2-corners" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <div ref={stageRef} className="hero-v2-stage">
        <div className="hero-v2-meta hero-v2-reveal">
          <span className="hero-v2-live">Available for work</span>
          <span className="hero-v2-index">01 / Introduction</span>
        </div>

        <p className="hero-v2-kicker hero-v2-reveal">{ROLES.join('  ·  ')}</p>

        <h1 ref={nameRef} className="hero-v2-name" aria-label="Kevin Kyle">
          <span className="hero-v2-name-line hero-v2-name-line--gradient">
            {'Kevin'.split('').map((char, i) => (
              <span key={`k-${i}`} className="hero-v2-letter">
                {char}
              </span>
            ))}
          </span>
          <span className="hero-v2-name-line hero-v2-name-line--white">
            {'Kyle'.split('').map((char, i) => (
              <span key={`y-${i}`} className="hero-v2-letter">
                {char}
              </span>
            ))}
          </span>
        </h1>

        <div className="hero-v2-body">
          <div className="hero-v2-copy">
            <p className="hero-v2-tagline hero-v2-reveal">
              Interfaces that convert.
              <span>AI that sees.</span>
            </p>
            <p className="hero-v2-bio hero-v2-reveal">
              I ship pixel-perfect React sites and real-time computer vision
              systems — detection, tracking, OCR — already running in production.
            </p>
            <div className="hero-v2-cta hero-v2-reveal">
              <MagneticButton onClick={() => scrollTo('#projects')}>View Work</MagneticButton>
              <MagneticButton variant="outline" onClick={() => scrollTo('#contact')}>
                Contact
              </MagneticButton>
            </div>
          </div>

          <aside className="hero-v2-panel hero-v2-reveal" aria-label="Highlights">
            <p className="hero-v2-panel-label">Selected signal</p>
            <ul className="hero-v2-stats">
              {PROFILE.stats.map((stat) => (
                <li key={stat.label}>
                  <strong>
                    {stat.value}
                    {stat.suffix}
                  </strong>
                  <span>{stat.label}</span>
                </li>
              ))}
            </ul>
            <div className="hero-v2-roles">
              {ROLES.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <div className="hero-v2-rail" aria-hidden="true">
        <div className="hero-v2-rail-track">
          {tickerItems.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#projects')}
        className="hero-v2-scroll"
        aria-label="Scroll to work"
      >
        <span>Scroll</span>
        <i />
      </button>
    </section>
  )
}
