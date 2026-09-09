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
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          'radial-gradient(ellipse 70% 55% at 50% 42%, rgba(124,58,237,0.22) 0%, rgba(34,211,238,0.08) 45%, transparent 72%)',
      }}
      aria-hidden="true"
    />
  )
}

function shouldLoadHeroScene() {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 767px)').matches) return false
  if (window.matchMedia('(pointer: coarse)').matches) return false
  return true
}

const ROLE_PILLS = [
  {
    label: 'Full-Stack Developer',
    gradient: 'from-cyan/25 to-blue-500/10',
    border: 'border-cyan/40',
    text: 'text-cyan',
    glow: 'rgba(34, 211, 238, 0.2)',
  },
  {
    label: 'AI Engineer',
    gradient: 'from-pink/25 to-fuchsia-500/10',
    border: 'border-pink/40',
    text: 'text-pink-300',
    glow: 'rgba(244, 114, 182, 0.2)',
  },
  {
    label: 'Problem Solver',
    gradient: 'from-violet/25 to-indigo-500/10',
    border: 'border-violet/40',
    text: 'text-violet-300',
    glow: 'rgba(124, 58, 237, 0.2)',
  },
] as const

const TICKER = [
  'React',
  'Next.js',
  'TypeScript',
  'YOLO',
  'OpenCV',
  'Node.js',
  'Three.js',
  'Python',
]

const NAME_PARTS = [
  { text: 'Kevin', variant: 'gradient' as const },
  { text: 'Kyle', variant: 'white' as const },
]

const BIO_SNIPPET =
  'I build interfaces that convert and AI systems that see — from React & Next.js to YOLO & OpenCV, shipped and running in production.'

const FULL_NAME = 'Kevin Kyle'

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null)
  const pillsRef = useRef<HTMLDivElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
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

    const timer = setTimeout(enable, 500)
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

    const tl = gsap.timeline({ delay: 0.15 })

    tl.fromTo(
      pillsRef.current?.children ?? [],
      { opacity: 0, y: 16, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }
    )

    if (nameRef.current) {
      const letters = nameRef.current.querySelectorAll('.hero-letter')
      tl.fromTo(
        letters,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: 'power3.out',
          stagger: 0.03,
        },
        '-=0.3'
      )
    }

    tl.fromTo(
      contentRef.current?.querySelectorAll('.hero-reveal') ?? [],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
      '-=0.4'
    ).fromTo(
      bioRef.current,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
  }, [reduced])

  const tickerItems = [...TICKER, ...TICKER]

  return (
    <section id="hero" className="hero-immersive" aria-label="Hero">
      <div className="hero-scene-layer" aria-hidden="true">
        {enableScene ? (
          <Suspense fallback={<HeroScenePlaceholder />}>
            <HeroScene mouse={mouse} />
          </Suspense>
        ) : (
          <HeroScenePlaceholder />
        )}
      </div>

      <div className="hero-top-scrim" aria-hidden="true" />
      <div className="hero-immersive-vignette" aria-hidden="true" />
      <div className="hero-immersive-fade-bottom" aria-hidden="true" />

      <div ref={contentRef} className="hero-overlay hero-overlay--center">
        <div className="hero-overlay-inner">
          <div className="hero-overlay-left">
            <p className="hero-live-pill hero-reveal">Available for new projects</p>

            <h1 ref={nameRef} className="hero-full-name hero-name-split" aria-label={FULL_NAME}>
              {NAME_PARTS.map((part) => (
                <span
                  key={part.text}
                  className={part.variant === 'gradient' ? 'first' : 'last'}
                >
                  {part.text.split('').map((char, i) => (
                    <span
                      key={`${part.text}-${i}`}
                      className={`hero-letter inline-block ${
                        part.variant === 'gradient' ? 'hero-letter-gradient' : 'hero-letter-white'
                      }`}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <div ref={pillsRef} className="hero-role-pills">
              {ROLE_PILLS.map((role) => (
                <span
                  key={role.label}
                  className={`hero-role-pill bg-gradient-to-br ${role.gradient} ${role.border}`}
                  style={{ '--role-glow': role.glow } as React.CSSProperties}
                >
                  <span className={`hero-role-pill-dot ${role.text}`} />
                  <span className={role.text}>{role.label}</span>
                </span>
              ))}
            </div>

            <p className="hero-tagline-italic hero-reveal">
              Interfaces that convert.
              <br />
              <span className="hero-tagline-accent">AI that sees.</span>
            </p>

            <div className="hero-stats hero-reveal">
              {PROFILE.stats.map((stat) => (
                <div key={stat.label} className="hero-stat-pill">
                  <span className="hero-stat-value">
                    {stat.value}
                    {stat.suffix}
                  </span>
                  <span className="hero-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="hero-ticker hero-reveal" aria-hidden="true">
              <div className="hero-ticker-track">
                {tickerItems.map((item, i) => (
                  <span key={`${item}-${i}`} className="hero-ticker-item">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="hero-cta-row hero-reveal">
              <MagneticButton onClick={() => scrollTo('#projects')}>View Work</MagneticButton>
              <MagneticButton variant="outline" onClick={() => scrollTo('#contact')}>
                Contact
              </MagneticButton>
            </div>
          </div>

          <p ref={bioRef} className="hero-bio-bar hero-bio-bar--immersive hero-bio-in-grid">
            {BIO_SNIPPET}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo('#about')}
        className="hero-scroll-cue"
        aria-label="Scroll to about section"
      >
        <span>Scroll</span>
        <span className="hero-scroll-line" />
      </button>
    </section>
  )
}
