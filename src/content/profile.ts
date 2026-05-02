/**
 * Single source of truth for identity. Swap email, links, etc. here.
 */
export const profile = {
  name: 'Tony Romo',
  handle: 'tony',
  hostname: 'portfolio',
  headline: 'Software Engineer @ Insulet · Drupal & Full-Stack (React/Node)',
  location: 'Aguascalientes, México',
  status: 'Open to: Full-time SWE roles · Freelance React/Node',
  email: 'jimenez.romo.jose.antonio@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/tony55s/',
    github: 'https://github.com/Romo55s',
    resume: '/resume.pdf',
    calendly: 'https://calendly.com/your-handle/intro-call',
  },
  bio: [
    "Hi, I'm Tony Romo — a Computer Systems Engineer based in Aguascalientes, México.",
    "I currently build and operate Drupal platforms at Insulet Corporation, where I own weekly release cycles, manage site reliability with New Relic + Cloudflare, and act as the primary technical contact with Acquia.",
    "Outside the day job, I ship full-stack React + Node products for real businesses — auth, automation, and data pipelines that pay for themselves.",
    "I'm equally at home reviewing a deployment pipeline, refactoring a hook, or mentoring a junior dev. Curious by default, deliberate by training.",
  ],
};

export type Profile = typeof profile;
