import { useEffect, useRef } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getCaseStudy } from '../data/caseStudies'
import { MagneticButton } from '../components/MagneticButton'
import { AnimatedText } from '../components/AnimatedText'
import { OptimizedImage } from '../components/OptimizedImage'
import { useReducedMotion } from '../hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()
  const study = slug ? getCaseStudy(slug) : undefined
  const contentRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!study) return
    document.title = `${study.title} — Kevin Kyle`
    return () => {
      document.title = 'Kevin Kyle — Full-Stack Developer & AI Engineer'
    }
  }, [study])

  useEffect(() => {
    if (!contentRef.current || reduced || !study) return

    const blocks = contentRef.current.querySelectorAll('.reveal-block')
    gsap.fromTo(
      blocks,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: contentRef.current, start: 'top 80%', once: true },
      }
    )
  }, [reduced, study])

  if (!study) return <Navigate to="/" replace />

  const nextStudy = study.nextSlug ? getCaseStudy(study.nextSlug) : null

  return (
    <article className="pt-28 pb-24 px-6 md:px-10 lg:px-16">
      <div className="max-w-3xl mx-auto">
        <Link
          to={{ pathname: '/', hash: '#projects' }}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-cyan transition-colors mb-12"
          data-cursor-hover
        >
          ← Back to work
        </Link>

        <header className="mb-16">
          <span className="text-[10px] tracking-[0.3em] uppercase text-cyan mb-4 block">
            {study.type === 'web' ? 'Web Project' : 'AI / Computer Vision'}
          </span>
          <AnimatedText
            text={study.title}
            as="h1"
            splitBy="words"
            className="font-display text-4xl md:text-6xl gradient-text leading-tight mb-4"
          />
          <p className="text-text-muted text-lg md:text-xl leading-relaxed mb-8">{study.summary}</p>
          <div className="flex flex-wrap gap-3">
            {study.liveUrl && (
              <MagneticButton as="a" href={study.liveUrl}>
                View Live ↗
              </MagneticButton>
            )}
            {study.githubUrl && (
              <MagneticButton as="a" href={study.githubUrl} variant="outline">
                GitHub ↗
              </MagneticButton>
            )}
          </div>
        </header>

        <div ref={contentRef} className="space-y-16">
          <section className="reveal-block">
            <h2 className="font-display text-xl md:text-2xl mb-4">The Challenge</h2>
            <p className="text-text-muted leading-relaxed">{study.challenge}</p>
          </section>

          <section className="reveal-block">
            <h2 className="font-display text-xl md:text-2xl mb-4">My Role</h2>
            <p className="text-text-muted leading-relaxed">{study.role}</p>
          </section>

          <section className="reveal-block">
            <h2 className="font-display text-xl md:text-2xl mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full glass text-sm text-text-muted">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className="reveal-block">
            <h2 className="font-display text-xl md:text-2xl mb-8">What I Built</h2>
            <div className="space-y-10">
              {study.built.map((item) => (
                <div key={item.heading}>
                  <h3 className="font-medium text-text mb-2">{item.heading}</h3>
                  <p className="text-text-muted leading-relaxed mb-4">{item.body}</p>
                  {item.image && (
                    <OptimizedImage
                      baseSrc={item.image.replace(/\.(png|jpe?g|webp)$/i, '')}
                      fallbackExt={item.image.endsWith('.png') ? 'png' : 'jpg'}
                      alt={item.heading}
                      className="rounded-2xl glass w-full"
                      loading="lazy"
                      decoding="async"
                      width={1440}
                      height={900}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="reveal-block">
            <h2 className="font-display text-xl md:text-2xl mb-6">The Outcome</h2>
            <div className="grid grid-cols-3 gap-4">
              {study.outcome.map((o) => (
                <div key={o.label} className="glass rounded-xl p-5 text-center">
                  <div className="font-display text-2xl md:text-3xl gradient-text">{o.metric}</div>
                  <p className="text-xs text-text-muted mt-1">{o.label}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {nextStudy && (
          <div className="mt-20 pt-10 border-t border-white/8">
            <p className="text-text-muted text-sm mb-3">Next project</p>
            <Link
              to={`/work/${nextStudy.slug}`}
              className="font-display text-2xl md:text-3xl gradient-text hover:opacity-80 transition-opacity"
              data-cursor-hover
            >
              {nextStudy.title} →
            </Link>
          </div>
        )}
      </div>
    </article>
  )
}
