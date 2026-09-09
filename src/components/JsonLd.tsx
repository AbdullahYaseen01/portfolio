const SITE_URL = 'https://kevinkylesumagaysay.dev'

export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Kevin Kyle',
    jobTitle: 'Full-Stack Developer & AI / Computer Vision Engineer',
    description:
      'I build interfaces that convert — and AI that sees. Full-stack web development and real-time computer vision systems.',
    url: SITE_URL,
    email: 'kevinkylesumagaysay6@gmail.com',
    knowsAbout: [
      'React',
      'TypeScript',
      'Computer Vision',
      'YOLO',
      'OpenCV',
      'Node.js',
      'Machine Learning',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
