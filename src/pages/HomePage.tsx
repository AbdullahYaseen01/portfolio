import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { DeferredSection } from '../components/DeferredSection'
import { Hero } from '../sections/Hero'

const About = lazy(() => import('../sections/About').then((m) => ({ default: m.About })))
const Experience = lazy(() =>
  import('../sections/Experience').then((m) => ({ default: m.Experience }))
)
const Testimonials = lazy(() =>
  import('../sections/Testimonials').then((m) => ({ default: m.Testimonials }))
)
const Expertise = lazy(() =>
  import('../sections/Expertise').then((m) => ({ default: m.Expertise }))
)
const Projects = lazy(() =>
  import('../sections/Projects').then((m) => ({ default: m.Projects }))
)
const Services = lazy(() =>
  import('../sections/Services').then((m) => ({ default: m.Services }))
)
const TechStack = lazy(() =>
  import('../sections/TechStack').then((m) => ({ default: m.TechStack }))
)
const Approach = lazy(() =>
  import('../sections/Approach').then((m) => ({ default: m.Approach }))
)
const Contact = lazy(() =>
  import('../sections/Contact').then((m) => ({ default: m.Contact }))
)

function SectionFallback({ height = '40vh' }: { height?: string }) {
  return <div className="animate-pulse" style={{ minHeight: height }} aria-hidden="true" />
}

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => scrollTo(hash), 500)
      return () => clearTimeout(timer)
    }
  }, [hash])

  return (
    <>
      <Hero />
      <DeferredSection minHeight="60vh">
        <Suspense fallback={<SectionFallback height="60vh" />}>
          <Projects />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="50vh">
        <Suspense fallback={<SectionFallback height="50vh" />}>
          <About />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Experience />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Testimonials />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Expertise />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Services />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <TechStack />
        </Suspense>
      </DeferredSection>
      <DeferredSection>
        <Suspense fallback={<SectionFallback />}>
          <Approach />
        </Suspense>
      </DeferredSection>
      <DeferredSection minHeight="50vh">
        <Suspense fallback={<SectionFallback height="50vh" />}>
          <Contact />
        </Suspense>
      </DeferredSection>
    </>
  )
}
