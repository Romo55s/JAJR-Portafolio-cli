import type { Command } from '../types';
import { profile } from '../../content/profile';

export const aboutCmd: Command = {
  name: 'about',
  aliases: ['bio'],
  summary: 'About me.',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        profile.name,
        profile.headline,
        '',
        ...profile.bio,
        '',
        'Try: projects · experience · hire me',
      ],
    });
  },
};
