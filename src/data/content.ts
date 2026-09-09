export const PROFILE = {
  email: 'kevinkylesumagaysay6@gmail.com',
  stats: [
    { label: 'Projects Shipped', value: 25, suffix: '+' },
    { label: 'Live Sites', value: 8, suffix: '' },
    { label: 'AI Systems Built', value: 12, suffix: '+' },
  ],
  bio: `I'm a full-stack developer who doesn't stop at the browser. On one side, I craft pixel-perfect interfaces with React, Next.js, and modern CSS — sites that load fast, convert visitors, and feel premium. On the other, I build real-time AI and computer vision systems that detect, track, and recognize — from product scanning to license plate recognition, deployed and running in production.`,
  skills: [
    { name: 'React / Next.js', category: 'Frontend' },
    { name: 'TypeScript', category: 'Frontend' },
    { name: 'Tailwind CSS', category: 'Frontend' },
    { name: 'Node.js / Express', category: 'Backend' },
    { name: 'MongoDB', category: 'Backend' },
    { name: 'Python', category: 'AI' },
    { name: 'YOLO / OpenCV', category: 'AI' },
    { name: 'TensorFlow', category: 'AI' },
    { name: 'Real-Time Inference', category: 'AI' },
    { name: 'REST APIs', category: 'Backend' },
    { name: 'Three.js', category: 'Frontend' },
    { name: 'Docker', category: 'Tools' },
  ],
}

export const EXPERTISE = [
  {
    id: '01',
    title: 'Frontend Development',
    description: 'Crafting responsive, animated interfaces that feel alive — from landing pages to complex dashboards.',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
  },
  {
    id: '02',
    title: 'Full-Stack MERN',
    description: 'End-to-end web applications with secure auth, REST APIs, and production-grade deployments.',
    tags: ['MongoDB', 'Express', 'React', 'Node', 'REST APIs', 'Auth'],
  },
  {
    id: '03',
    title: 'AI & Machine Learning',
    description: 'Training and deploying models for real-world inference — from data pipelines to production APIs.',
    tags: ['Python', 'TensorFlow', 'Model Training', 'Real-Time Inference'],
  },
  {
    id: '04',
    title: 'Computer Vision',
    description: 'Real-time detection, tracking, and recognition systems that process live video feeds at scale.',
    tags: ['YOLO', 'OpenCV', 'Object Detection', 'ALPR', 'Tracking'],
  },
]

export const FEATURED_PROJECTS = [
  {
    name: 'Clipzy',
    slug: 'clipzy',
    url: 'https://clipzy.xynovix.com',
    tagline: 'AI live-streaming & content studio',
    description:
      'Record streams and podcasts with multi-guest support, then let AI handle post-production — thumbnails, descriptions, and tags — and publish to every platform in one click.',
    features: [
      'Multi-guest stream & podcast recording',
      'AI post-production: thumbnails, descriptions, tags',
      'One-click multi-platform publishing',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'AI APIs'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
    accent: 'rgba(124, 58, 237, 0.4)',
  },
  {
    name: 'RaahBaan',
    slug: 'raahban',
    url: 'https://raahban.com',
    tagline: 'AI education & career guidance for Pakistan',
    description:
      'A full guidance platform: merit calculator, scholarship & university explorer, study planner, past papers, mock tests, a career simulator, and an AI counselor plus tutor.',
    features: [
      'Merit calculator & university / scholarship explorer',
      'Study planner, past papers & mock tests',
      'AI counselor, tutor & career simulator',
    ],
    tags: ['Next.js', 'React', 'Node.js', 'Supabase', 'LLM'],
    gradient: 'from-indigo/40 via-violet/30 to-pink/20',
    accent: 'rgba(34, 211, 238, 0.4)',
  },
]

export const WEB_PROJECTS = [
  {
    name: 'Autozy',
    slug: 'autozy',
    url: 'https://autozy.co',
    tags: ['React', 'Next.js', 'Tailwind'],
    gradient: 'from-violet/40 via-indigo/30 to-cyan/20',
  },
  {
    name: 'Healthy Start NC',
    slug: 'healthystartnc',
    url: 'https://healthystartnc.com',
    tags: ['WordPress', 'React', 'CSS'],
    gradient: 'from-cyan/30 via-indigo/30 to-violet/20',
  },
  {
    name: 'Nyuton Enterprises',
    slug: 'nyuton',
    url: 'https://nyutonenterprises.com',
    tags: ['React', 'Tailwind', 'Vite'],
    gradient: 'from-amber/20 via-violet/30 to-indigo/20',
  },
  {
    name: 'Watches Store (3D)',
    slug: 'watches',
    url: 'https://watchs-gray.vercel.app',
    tags: ['Three.js', 'React', 'E-commerce'],
    gradient: 'from-violet/40 via-cyan/20 to-indigo/30',
  },
  {
    name: 'NOVA Footwear (3D)',
    slug: 'nova',
    url: 'https://core-seven-henna.vercel.app',
    tags: ['Three.js', 'React', '3D Animation'],
    gradient: 'from-rose/30 via-violet/30 to-indigo/20',
  },
  {
    name: 'Construction Company',
    slug: 'construction',
    url: 'https://constractioncompany.netlify.app',
    tags: ['React', 'Tailwind', 'Netlify'],
    gradient: 'from-indigo/30 via-violet/30 to-cyan/20',
  },
  {
    name: 'Stepping Stone',
    slug: 'steppingstone',
    url: 'https://stteppingstone.netlify.app',
    tags: ['React', 'CSS', 'Netlify'],
    gradient: 'from-pink/20 via-violet/30 to-indigo/20',
  },
]

export const AI_PROJECTS = [
  {
    name: 'Automatic Product Scanning & Billing',
    slug: 'product-scanning',
    description: 'Real-time product detection and automated billing from live camera feed.',
    tags: ['YOLO', 'OpenCV', 'Python', 'Real-Time'],
    image: '/ai/product-scanning.jpg',
    video: '/ai/product-scanning.mp4',
  },
  {
    name: 'Real-Time Multi-Person Tracking',
    slug: 'tracking',
    description: 'Persistent ID tracking across multiple people in crowded scenes.',
    tags: ['YOLO', 'DeepSORT', 'Python', 'Real-Time'],
    image: '/ai/tracking.jpg',
    video: '/ai/tracking.mp4',
  },
  {
    name: 'Automatic Vehicle Counting',
    slug: 'vehicle-counting',
    description: 'Lane-aware vehicle detection and counting for traffic analytics.',
    tags: ['YOLO', 'OpenCV', 'Python', 'Analytics'],
    image: '/ai/vehicle-counting.jpg',
    video: '/ai/vehicle-counting.mp4',
  },
  {
    name: 'Real-Time People Detection',
    slug: 'people-detection',
    description: 'High-FPS person detection with bounding boxes on live streams.',
    tags: ['YOLO', 'OpenCV', 'Python', 'Real-Time'],
    image: '/ai/people-detection.jpg',
    video: '/ai/people-detection.mp4',
  },
  {
    name: 'License Plate Recognition (ALPR)',
    slug: 'alpr',
    description: 'End-to-end plate detection, OCR, and validation pipeline.',
    tags: ['YOLO', 'OCR', 'OpenCV', 'ALPR'],
    image: '/ai/alpr.jpg',
    video: '/ai/alpr.mp4',
  },
]

export const TECH_STACK = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'GSAP'],
  Backend: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JWT Auth', 'WebSockets'],
  'AI & ML': ['Python', 'YOLO', 'OpenCV', 'TensorFlow', 'PyTorch', 'Real-Time Inference'],
  'Tools & Deploy': ['Git', 'Docker', 'Vercel', 'Netlify', 'Linux', 'VS Code'],
}

export const MARQUEE_KEYWORDS = [
  'React', 'TypeScript', 'YOLO', 'OpenCV', 'Three.js', 'Node.js', 'Python',
  'Next.js', 'TensorFlow', 'MongoDB', 'GSAP', 'Computer Vision', 'Tailwind',
  'Real-Time', 'ALPR', 'Docker', 'Vercel',
]

export const APPROACH = [
  {
    title: 'PIXEL PERFECT.',
    body: 'Every margin, animation curve, and breakpoint is intentional. I build interfaces that feel crafted — not generated — because details are what separate good sites from unforgettable ones.',
  },
  {
    title: 'REAL RESULTS.',
    body: 'Eight live production sites. Measurable conversions. Fast load times. I ship work that clients can point to, not prototypes that never leave localhost.',
  },
  {
    title: 'AI THAT SHIPS.',
    body: 'Computer vision isn\'t a demo for me — it\'s production systems processing real camera feeds. Detection, tracking, OCR, all running in real time with models I trained and deployed.',
  },
]

