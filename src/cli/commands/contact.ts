import type { Command } from '../types';
import { profile } from '../../content/profile';

export const contactCmd: Command = {
  name: 'contact',
  aliases: ['email', 'reach'],
  summary: 'Email, LinkedIn, GitHub.',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        'Contact:',
        '',
        `  email     ${profile.email}`,
        `  linkedin  ${profile.links.linkedin}`,
        `  github    ${profile.links.github}`,
        `  resume    ${profile.links.resume}`,
        '',
        'Tip: type `hire me` for a one-click email + copy.',
      ],
    });
  },
};
