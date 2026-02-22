export const profile = {
  name: 'Milan Bonnez',
  title: 'M365 Business Consultant | AI Automation & Web Engineer',
  tagline: 'I build AI-driven solutions that automate work and scale businesses.',
  email: 'bonnezmilan@gmail.com',
  location: 'Belgium',
  availability: 'Open to interesting opportunities',

  summary: {
    recruiter:
      'M365 Business Consultant and founder of an AI-focused company. Strong Business & IT background with hands-on experience in Power Platform, AI automation and modern web applications. Always open to interesting opportunities.',
    founder:
      'Builder and consultant who designs AI-powered automations and web applications for real business problems. Focused on efficiency, scalability and practical impact.',
    techlead:
      'Hands-on engineer comfortable with modern web stacks, AI tooling and the Microsoft ecosystem. Values clean architectures, automation and asynchronous collaboration.',
  },

  strengths: [
    {
      name: 'AI-Driven Automation',
      description: 'Design and build automations that reduce manual work using AI',
    },
    {
      name: 'Business & IT Translation',
      description: 'Turn business problems into technical, scalable solutions',
    },
    {
      name: 'Modern Web Engineering',
      description: 'Build robust web applications with modern stacks',
    },
    {
      name: 'Ownership Mentality',
      description: 'Used to end-to-end responsibility, from idea to delivery',
    },
  ],

  thinkingStyle:
    'Outcome-driven and pragmatic. I start from the business goal and design technical solutions that are maintainable and scalable.',

  teamRole:
    'The builder-consultant who delivers. I combine analysis, implementation and ownership.',

  differentiators: [
    'Founder experience building AI-driven solutions',
    'Strong combination of M365, automation and web technologies',
    'Experience across multiple industries and use cases',
    'Self-managed and results-oriented',
  ],
};

export interface CareerEntry {
  id: string;
  company: string;
  role: string;
  period: string;
  year: number;
  location: string;
  type: 'fulltime' | 'internship' | 'student' | 'founder';
  summary: string;
  impact: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
  learned: string;
}

export const career: CareerEntry[] = [
  {
    id: 'dynamate',
    company: 'Dynamate',
    role: 'M365 Business Consultant',
    period: 'Sep 2025 – Present',
    year: 2025,
    location: 'Remote / Belgium',
    type: 'fulltime',
    summary:
      'Consultant specializing in building automations and AI agents within the Microsoft 365 ecosystem, turning manual business processes into scalable, automated workflows.',
    impact: [
      'Built AI agents and automations that replaced repetitive manual work for clients',
      'Designed and implemented end-to-end Power Automate flows and AI-driven solutions',
      'Translated complex business requirements into automated M365 workflows',
      'Advised customers on automation strategy and AI integration opportunities',
    ],
    metrics: [
      { label: 'Focus', value: 'Automations & AI agents' },
      { label: 'Platform', value: 'Microsoft 365' },
    ],
    technologies: [
      'Microsoft 365',
      'Power Automate',
      'AI Agents',
      'Power Apps',
      'SharePoint',
      'Power Pages',
      'SPFx',
    ],
    learned:
      'AI agents and automations deliver the most value when designed around real user workflows, not just technical possibilities.',
  },
  {
    id: 'delaware-internship',
    company: 'delaware BeLux',
    role: 'Intern – Bachelor Thesis',
    period: 'Apr 2025 – Jun 2025',
    year: 2025,
    location: 'Belgium',
    type: 'internship',
    summary:
      'Designed and implemented a solution to improve an internal handover process.',
    impact: [
      'Analyzed existing handover workflow',
      'Built a Power Platform-based solution',
    ],
    metrics: [
      { label: 'Platforms', value: 'Power Platform' },
    ],
    technologies: [
      'Power Apps',
      'Power Pages',
      'Power Automate',
      'SharePoint',
    ],
    learned:
      'Automation only works when users actually adopt the solution.',
  },
  {
    id: 'bpost',
    company: 'bpost',
    role: 'Postal Worker (Student Job)',
    period: '2023 – 2024',
    year: 2023,
    location: 'Belgium',
    type: 'student',
    summary:
      'Responsible for timely and accurate delivery of mail and packages.',
    impact: [
      'Worked independently with strict deadlines',
    ],
    metrics: [{ label: 'Skill', value: 'Reliability' }],
    technologies: [],
    learned:
      'Consistency is non-negotiable in operational work.',
  },
  {
    id: 'royal-sanders',
    company: 'Royal Sanders',
    role: 'Production Support (Student Job)',
    period: '2023 – 2025',
    year: 2023,
    location: 'Belgium',
    type: 'student',
    summary:
      'Support role within the production process.',
    impact: [
      'Quality control and logistics support',
    ],
    metrics: [{ label: 'Environment', value: 'Production' }],
    technologies: [],
    learned:
      'Clear processes reduce errors and stress.',
  },
];

export interface Skill {
  name: string;
  level: number;
  category:
    | 'frontend'
    | 'backend'
    | 'infrastructure'
    | 'platform'
    | 'business'
    | 'ai';
  experience: string;
  useCases: string[];
}

export const skills: Skill[] = [
  {
    name: 'React / TypeScript',
    level: 80,
    category: 'frontend',
    experience: '2+ years',
    useCases: ['Web applications', 'AI-driven UIs'],
  },
  {
    name: 'PostgreSQL & SQL',
    level: 80,
    category: 'backend',
    experience: '2+ years',
    useCases: ['Data modeling', 'Application backends'],
  },
  {
    name: 'Microsoft Power Platform',
    level: 85,
    category: 'platform',
    experience: '2 years',
    useCases: ['Automation', 'Business applications'],
  },
  {
    name: 'AI Automation',
    level: 75,
    category: 'ai',
    experience: '1+ year',
    useCases: ['Workflow automation', 'AI-powered tools'],
  },
  {
    name: 'n8n',
    level: 75,
    category: 'infrastructure',
    experience: '1+ year',
    useCases: ['System integrations', 'Automations'],
  },
  {
    name: 'Docker',
    level: 70,
    category: 'infrastructure',
    experience: '1+ year',
    useCases: ['Containerized deployments'],
  },
  {
    name: '.NET',
    level: 70,
    category: 'backend',
    experience: '1+ year',
    useCases: ['Web APIs', 'Backend services'],
  },
  {
    name: 'Consulting & Client Communication',
    level: 80,
    category: 'business',
    experience: '1+ year',
    useCases: ['Requirement analysis', 'Solution design'],
  },
];

export interface Project {
  id: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  result: string;
  technologies: string[];
  year: number;
}

export const projects: Project[] = [
  {
    id: 'homelab-vps',
    title: 'Docker Homelab & VPS Management',
    description:
      'Personal Docker server on a local machine and a managed VPS to deepen knowledge of IT systems and infrastructure.',
    problem:
      'Wanted to improve general understanding of networking, server management and containerized deployments beyond day-to-day work.',
    approach:
      'Set up a Docker-based homelab on a personal laptop and a remote VPS, experimenting with self-hosted services, networking and system administration.',
    result:
      'Gained hands-on experience with Linux server management, Docker orchestration, networking and infrastructure fundamentals.',
    technologies: [
      'Docker',
      'Linux',
      'Nginx',
      'VPS',
      'Networking',
    ],
    year: 2025,
  },
  {
    id: 'forex-ai-agent',
    title: 'AI Forex Daytrading Agent',
    description:
      'An AI-powered agent that autonomously daytrades in forex markets.',
    problem:
      'Manual trading is time-intensive and emotionally driven, leading to inconsistent results.',
    approach:
      'Built an AI agent that analyzes market data and executes trades autonomously based on defined strategies.',
    result:
      'A fully automated trading system that operates independently and removes emotional bias from trading decisions.',
    technologies: [
      'Python',
      'AI APIs',
      'Forex APIs',
      'Docker',
    ],
    year: 2025,
  },
  {
    id: 'web-projects',
    title: 'Various Web Applications',
    description:
      'Built multiple websites and web applications for different purposes and clients.',
    problem:
      'Businesses and personal projects needed modern, performant web presence and tooling.',
    approach:
      'Designed and developed web applications using modern frameworks, focusing on clean UX and maintainability.',
    result:
      'Delivered functional, responsive websites tailored to specific needs.',
    technologies: [
      'React',
      'TypeScript',
      '.NET',
      'Tailwind CSS',
      'PostgreSQL',
    ],
    year: 2025,
  },
];

export interface Education {
  id: string;
  institution: string;
  degree: string;
  specialization?: string;
  period: string;
  level: 'secondary' | 'higher';
  completed: boolean;
}

export const education: Education[] = [
  // Higher Education
  {
    id: 'vives-3',
    institution: 'Hogeschool Vives, Kortrijk',
    degree: 'Bachelor Applied Informatics',
    specialization: 'Business & IT',
    period: '2024 – 2025',
    level: 'higher',
    completed: true,
  },
  {
    id: 'vives-2b',
    institution: 'Hogeschool Vives, Kortrijk',
    degree: 'Applied Informatics',
    specialization: 'Business & IT',
    period: '2023 – 2024',
    level: 'higher',
    completed: true,
  },
  {
    id: 'vives-2a',
    institution: 'Hogeschool Vives, Kortrijk',
    degree: 'Applied Informatics',
    specialization: 'AI',
    period: '2023 – 2024',
    level: 'higher',
    completed: true,
  },
  {
    id: 'vives-1',
    institution: 'Hogeschool Vives, Kortrijk',
    degree: 'Applied Informatics',
    period: '2022 – 2023',
    level: 'higher',
    completed: true,
  },
  // Secondary Education
  {
    id: 'secondary-3',
    institution: 'Heilige Familie, Ieper',
    degree: 'Commerce',
    period: '2020 – 2022',
    level: 'secondary',
    completed: true,
  },
  {
    id: 'secondary-2',
    institution: 'Heilige Familie, Ieper',
    degree: 'Commerce & IT',
    period: '2018 – 2020',
    level: 'secondary',
    completed: true,
  },
  {
    id: 'secondary-1',
    institution: 'VTI Ieper',
    degree: 'Industrial Sciences',
    period: '2016 – 2018',
    level: 'secondary',
    completed: true,
  },
];

export const terminalResponses: Record<string, string> = {
  help: `Available commands:
  about       - Who I am
  skills      - Technical skills
  career      - Work experience
  education   - Academic background
  projects    - Case-based work
  contact     - Get in touch
  hire        - Why hire me
  clear       - Clear terminal`,

  education: `> Education

  Bachelor Applied Informatics (Business & IT)
  Hogeschool Vives, Kortrijk | Graduated June 2025

  Specializations: Business & IT, AI

  Secondary: Commerce & IT | Heilige Familie, Ieper`,

  about: `> Milan Bonnez
  M365 Business Consultant | AI Automation & Web Engineer
  Belgium

  I build AI-driven automations and digital workplace solutions
  with a strong focus on real business impact.`,

  hire: `> Why hire me?

  1. Founder mindset with consulting experience
  2. Strong M365 + AI automation skillset
  3. Adaptable to any work environment
  4. Focused on outcomes, not output

  Always open to interesting opportunities.

  Contact: bonnezmilan@gmail.com`,

  unknown: `Command not found. Type 'help' for available commands.`,
};
