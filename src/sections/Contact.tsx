import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MagneticButton } from '../components/MagneticButton'
import { PROFILE } from '../data/content'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

function FooterParticles() {
  const reduced = useReducedMotion()
  if (reduced) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-violet/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${8 + Math.random() * 12}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  )
}

export function Contact() {
  const [copied, setCopied] = useState(false)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable */
    }
  }

  useEffect(() => {
    if (!wordmarkRef.current) return

    if (reduced) {
      wordmarkRef.current.style.opacity = '1'
      return
    }

    gsap.fromTo(
      wordmarkRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wordmarkRef.current,
          start: 'top 90%',
          once: true,
        },
      }
    )
  }, [reduced])

  return (
    <footer id="contact" className="section-block overflow-hidden">
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[40vh] rounded-full opacity-15 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.5), rgba(34,211,238,0.2), transparent)',
        }}
      />

      <FooterParticles />

      <div className="relative max-w-[1400px] mx-auto">
        <div className="text-center mb-6">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl gradient-text leading-tight mb-3">
            Let&apos;s build something.
          </h2>

          <p className="text-text-muted text-sm md:text-base mb-5 max-w-lg mx-auto">
            Open to freelance & full-time opportunities. Let&apos;s talk about your next project — web, AI, or both.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 max-w-sm sm:max-w-none mx-auto">
          <MagneticButton className="w-full sm:w-auto" onClick={copyEmail} aria-label="Copy email address">
            {copied ? 'Copied!' : PROFILE.email}
          </MagneticButton>
        </div>

        <div className="text-center">
          <div
            ref={wordmarkRef}
            className="font-display text-[clamp(3rem,15vw,12rem)] leading-none tracking-tight select-none pointer-events-none gradient-text opacity-0"
            style={{
              WebkitTextStroke: '1px rgba(124, 58, 237, 0.15)',
              filter: 'drop-shadow(0 0 40px rgba(124, 58, 237, 0.2))',
            }}
            aria-hidden="true"
          >
            KEVIN KYLE
          </div>

          <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-text-muted">
            © {new Date().getFullYear()} Kevin Kyle · Built with React & Three.js
          </p>
        </div>
      </div>
    </footer>
  )
}
