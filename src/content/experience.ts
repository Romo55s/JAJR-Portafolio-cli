export interface Role {
  title: string;
  company: string;
  type: string;
  location: string;
  start: string; // YYYY-MM
  end: string | 'present';
  bullets: string[];
  stack?: string[];
}

export const experience: Role[] = [
  {
    title: 'Software Engineer',
    company: 'Insulet Corporation',
    type: 'Full-time · Remote',
    location: 'Tijuana, BC, México',
    start: '2026-03',
    end: 'present',
    bullets: [
      'Own weekly Drupal deployment cycles; deep-dive PR analysis on the stage branch.',
      'Run site reliability for high-traffic environments via New Relic + Cloudflare.',
      'Primary technical liaison with Acquia and Cloudflare engineering teams.',
      'Lead monthly Drupal Core + contrib module updates, security patching cadence.',
      'Continue full-stack Drupal feature work and complex bug triage.',
    ],
    stack: ['Drupal', 'PHP', 'New Relic', 'Cloudflare', 'Acquia', 'Git'],
  },
  {
    title: 'Associate Software Engineer',
    company: 'Insulet Corporation',
    type: 'Full-time · Remote',
    location: 'Tijuana, BC, México',
    start: '2025-03',
    end: '2026-03',
    bullets: [
      'Developed and maintained Drupal-based applications.',
      'Customized and configured contrib + custom modules for cross-functional teams.',
      'Participated in code reviews; followed Scrum + Jira workflow.',
      'Troubleshot complex bugs to optimize UX and backend performance.',
    ],
    stack: ['Drupal', 'PHP', 'Jira', 'Scrum'],
  },
  {
    title: 'Drupal Developer Trainee',
    company: 'Insulet Corporation',
    type: 'Part-time',
    location: 'Remote',
    start: '2024-06',
    end: '2025-02',
    bullets: [
      'Onboarded into the Drupal ecosystem: theming, modules, configuration management.',
      'Shipped first production tickets after a 9-month focused ramp-up.',
    ],
    stack: ['PHP', 'Drupal'],
  },
  {
    title: 'Technician I, Level 3',
    company: 'Teleperformance',
    type: 'Part-time',
    location: 'Guadalajara, JAL, México',
    start: '2023-04',
    end: '2024-06',
    bullets: [
      'Executed monthly campaign updates for clients including Starbucks, AT&T, and Bancomer.',
      'Maintained Virtual Machines on Nutanix; remote access via Citrix.',
      'Monitored user activity and permissions through Active Directory.',
    ],
    stack: ['Citrix', 'Nutanix', 'Active Directory'],
  },
];

export const education = [
  {
    school: 'Universidad Autónoma de Aguascalientes',
    degree: 'Computer Systems Engineering',
    period: '2020 — 2024',
  },
];
