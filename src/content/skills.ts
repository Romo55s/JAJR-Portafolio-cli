export const skills: Record<string, string[]> = {
  'CMS / Drupal': ['Drupal 9/10', 'PHP', 'Twig', 'Custom Modules', 'Site Building', 'Acquia'],
  Frontend: ['React', 'TypeScript', 'TailwindCSS', 'GSAP', 'HTML5', 'CSS3', 'UI/UX'],
  Backend: ['Node.js', 'REST APIs', 'Supabase', 'Auth0', 'Google APIs'],
  'Infra / DevOps': [
    'New Relic',
    'Cloudflare',
    'Citrix',
    'Nutanix VM',
    'Active Directory',
    'Vercel',
    'Netlify',
  ],
  'Tools / Process': ['Git', 'Jira', 'Scrum', 'Code Review', 'Release Management'],
  Languages: ['Spanish (native)', 'English (professional)'],
};

/** Warm copy for the interactive skills view (`skills` command). */
export const skillsManifestCopy = {
  kicker: 'Loaded capability graph · grep-friendly',
  lead:
    'Drupal stacks at Insulet by day; React + TypeScript side quests by night. Everything below ships to prod — no trophy keywords.',
  aside: 'Tip: try `skills | grep Drupal` or pipe any command through `grep`.',
};

export const interests = [
  'Programming & systems thinking',
  'Running, training, gym',
  'American football',
];
