import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AvailabilityBadge } from './AvailabilityBadge'
import { scrollTo } from '../providers/SmoothScrollProvider'
import { useActiveSection } from '../hooks/useActiveSection'

const LINKS = [
  { label: 'Work', href: '#projects', id: 'projects' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Expertise', href: '#expertise', id: 'expertise' },
  { label: 'Services', href: '#services', id: 'services' },
  { label: 'Stack', href: '#stack', id: 'stack' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (href: string) => {
    if (isHome) {
      scrollTo(href)
    } else {
      window.location.href = `/${href}`
    }
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-4 md:mx-8 rounded-2xl transition-all duration-500 ${
          scrolled ? 'glass shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent'
        }`}
      >
        <nav className="flex items-center justify-between px-5 md:px-8 py-3" aria-label="Main navigation">
          <Link
            to="/"
            className="font-display text-sm tracking-wider gradient-text focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded"
            data-cursor-hover
          >
            KK
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`relative px-4 py-2 text-sm transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded-lg ${
                  isHome && activeSection === link.id
                    ? 'text-text'
                    : 'text-text-muted hover:text-text'
                }`}
                data-cursor-hover
                aria-current={isHome && activeSection === link.id ? 'true' : undefined}
              >
                {link.label}
                {isHome && activeSection === link.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan" />
                )}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <AvailabilityBadge className="hidden lg:inline-flex" />
          </div>

          <button
            className="md:hidden p-2 text-text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-violet/50 rounded"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>
      </div>

      {mobileOpen && (
        <div className="nav-mobile-panel md:hidden mx-4 mt-2 glass rounded-2xl p-4">
            <div className="mb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <AvailabilityBadge className="w-full sm:w-auto justify-center" />
            </div>
            {LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`block w-full text-left px-4 py-3 text-sm transition-colors ${
                  isHome && activeSection === link.id ? 'text-cyan' : 'text-text-muted hover:text-text'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
    </header>
  )
}
