export interface Project {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  role: string;
  stack: string[];
  highlights: string[];
  url: string;
  status: 'live' | 'in-production' | 'archived';
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: 1,
    slug: 'totalpropertybuilders',
    name: 'Total Property Builders — CENTRIX Aguascalientes',
    tagline: 'Real-estate platform for departments with 40% down payment.',
    description:
      'Production marketing & lead-management site for a real-estate developer, with secure agent areas behind Auth0 and a custom admin to manage units, pricing, and leads.',
    role: 'Full-stack engineer (frontend, backend, auth, deploy)',
    stack: ['React', 'TypeScript', 'Node.js', 'Auth0', 'Vercel'],
    highlights: [
      'Designed and built the auth flow with Auth0 (roles for agents vs admins).',
      'Lead capture wired to internal CRM with email notifications.',
      'Optimized images / above-the-fold for sub-2s LCP on 3G.',
    ],
    url: 'https://totalpropertybuildersnvmx.com/',
    status: 'live',
    featured: true,
  },
  {
    id: 2,
    slug: 'mh-automotriz',
    name: 'MH Automotriz — Sistema de Inventario',
    tagline: 'Internal QR-based inventory automation for car dealerships.',
    description:
      'Realtime inventory tool for multi-agency car dealerships. QR scanning captures VIN/brand/color/location; data syncs to Google Sheets via Google APIs with automatic monthly resets and Drive backups.',
    role: 'Full-stack engineer (architecture, Google APIs integration)',
    stack: ['React', 'TypeScript', 'Node.js', 'Google Sheets API', 'Google Drive API', 'Netlify'],
    highlights: [
      'Reduced monthly inventory time by ~70%.',
      'Multi-user real-time sync with conflict-free updates.',
      'Automated month-rollover + Drive snapshots (30-day retention).',
    ],
    url: 'https://mh-automotriz-auditoria.netlify.app/landing',
    status: 'in-production',
  },
  {
    id: 3,
    slug: 'estela-lab',
    name: 'Estela-Lab — Clinical Lab Management',
    tagline: 'Centralized orders, patients, and results for clinical labs.',
    description:
      'Lab management portal for receptionists and admins: guided order flow, secure access, and downloadable reports. Built on Supabase for auth + database with row-level security.',
    role: 'Full-stack engineer (frontend, Supabase modeling, RLS policies)',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase', 'Vercel'],
    highlights: [
      'Modeled patients/orders/results with Supabase RLS for multi-role access.',
      'Built downloadable PDF reports server-side.',
      'Guided wizard reduced order-creation errors significantly.',
    ],
    url: 'https://estela-lab-front-end.vercel.app/',
    status: 'live',
  },
];
