import type { Command } from '../types';
import { profile } from '../../content/profile';

export const whoamiCmd: Command = {
  name: 'whoami',
  summary: 'Show one-line identity.',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        `${profile.name} — ${profile.headline}`,
        `${profile.location} · ${profile.status}`,
      ],
      tone: 'accent',
    });
  },
};
