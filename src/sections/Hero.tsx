import { MagneticButton } from '../components/MagneticButton'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { PROFILE } from '../data/content'

const FOCUS = [
  {
    num: '01',
    title: 'Web that converts',
    text: 'React, Next.js, and TypeScript — fast, sharp interfaces.',
  },
  {
    num: '02',
    title: 'Full-stack shipping',
    text: 'Node, APIs, and live sites that stay in production.',
  },
  {
    num: '03',
    title: 'Computer vision',
    text: 'YOLO, OpenCV, detection and OCR on real camera feeds.',
  },
]

const STACK = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'YOLO', 'OpenCV']

export function Hero() {
  return (
    <section id="hero" className="hero-clear" aria-label="Hero">
      <div className="hero-clear-bg" aria-hidden="true">
        <div className="hero-clear-grid" />
        <div className="hero-clear-glow hero-clear-glow--a" />
        <div className="hero-clear-glow hero-clear-glow--b" />
      </div>

      <div className="hero-clear-inner">
        <p className="hero-clear-eyebrow">
          <span className="hero-clear-dot" />
          Available for work
        </p>

        <h1 className="hero-clear-name">
          <span>Kevin</span> Kyle
        </h1>

        <p className="hero-clear-tagline">
          Interfaces that convert. <em>AI that sees.</em>
        </p>

        <div className="hero-clear-layout">
          <div className="hero-clear-main">
            <p className="hero-clear-bio">
              I ship pixel-perfect React sites and real-time computer vision
              systems — detection, tracking, OCR — already running in production.
            </p>

            <div className="hero-clear-cta">
              <MagneticButton onClick={() => scrollTo('#projects')}>View Work</MagneticButton>
              <MagneticButton variant="outline" onClick={() => scrollTo('#contact')}>
                Contact
              </MagneticButton>
            </div>

            <ul className="hero-clear-stats">
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
          </div>

          <ul className="hero-clear-focus">
            {FOCUS.map((item) => (
              <li key={item.num}>
                <span className="hero-clear-num">{item.num}</span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <ul className="hero-clear-stack">
          {STACK.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
