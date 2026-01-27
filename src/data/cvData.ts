export const profile = {
  name: 'Milan Bonnez',
  title: 'M365 Business Consultant | AI Automation & Web Engineer',
  tagline: 'I build AI-driven solutions that automate work and scale businesses.',
  email: 'bonnezmilan@gmail.com',
  location: 'Belgium (remote-first)',
  availability: 'Open to fully remote opportunities',

  summary: {
    recruiter:
      'M365 Business Consultant and founder of an AI-focused company. Strong Business & IT background with hands-on experience in Power Platform, AI automation and modern web applications. Looking for a fully remote role.',
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
    'The builder-consultant who delivers. I combine analysis, implementation and ownership, especially in remote-first environments.',

  differentiators: [
    'Founder experience building AI-driven solutions',
    'Strong combination of M365, automation and web technologies',
    'Experience across multiple industries and use cases',
    'Remote-first, self-managed and results-oriented',
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
    id: 'ai-company',
    company: 'Independent AI Solutions Studio',
    role: 'Founder & Engineer',
    period: 'Dec 2025 – Present',
    year: 2025,
    location: 'Remote',
    type: 'founder',
    summary:
      'Founder of a company focused on AI automations and AI-driven web applications for businesses.',
    impact: [
      'Designed and built AI-powered automations to reduce manual and repetitive work',
      'Developed AI-driven web applications tailored to business processes',
      'Delivered solutions across multiple sectors with different requirements',
    ],
    metrics: [
      { label: 'Focus', value: 'AI automation & web applications' },
      { label: 'Clients', value: 'Multiple sectors' },
    ],
    technologies: [
      'AI APIs',
      'n8n',
      'Docker',
      'React',
      'TypeScript',
      'PostgreSQL',
    ],
    learned:
      'AI creates real value only when tightly integrated into existing business processes.',
  },
  {
    id: 'dynamate',
    company: 'Dynamate',
    role: 'M365 Business Consultant',
    period: 'Sep 2025 – Present',
    year: 2025,
    location: 'Remote / Belgium',
    type: 'fulltime',
    summary:
      'Consultant focused on designing and implementing Microsoft 365 solutions that improve collaboration and business processes.',
    impact: [
      'Analyzed business requirements and translated them into M365 solutions',
      'Built solutions using Power Apps, Power Automate and SharePoint',
      'Advised customers on digital workplace architecture and best practices',
    ],
    metrics: [
      { label: 'Focus', value: 'Automation & digital workplace' },
    ],
    technologies: [
      'Microsoft 365',
      'Power Apps',
      'Power Automate',
      'SharePoint',
      'Power Pages',
      'SPFx',
    ],
    learned:
      'Sustainable digital workplaces require clear ownership and well-designed automation.',
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
    id: 'ai-business-solutions',
    title: 'AI-Driven Business Solutions',
    description:
      'Custom AI automations and web applications for different industries.',
    problem:
      'Manual processes and lack of scalable digital solutions.',
    approach:
      'Integrated AI into existing workflows and built custom web applications.',
    result:
      'Reduced manual work and improved operational efficiency.',
    technologies: [
      'AI APIs',
      'n8n',
      'React',
      'TypeScript',
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
  M365 Business Consultant | AI Automation Engineer
  Remote-first

  I build AI-driven automations and digital workplace solutions
  with a strong focus on real business impact.`,

  hire: `> Why hire me?

  1. Founder mindset with consulting experience
  2. Strong M365 + AI automation skillset
  3. Comfortable working fully remote
  4. Focused on outcomes, not output

  Looking for a fully remote role that allows flexibility and travel.

  Contact: bonnezmilan@gmail.com`,

  unknown: `Command not found. Type 'help' for available commands.`,
};
