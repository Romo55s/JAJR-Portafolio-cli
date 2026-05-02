import type { Command } from '../types';
import { profile } from '../../content/profile';

export const aboutCmd: Command = {
  name: 'about',
  aliases: ['bio'],
  summary: 'About me.',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [`# ${profile.name}`, `# ${profile.headline}`, ''],
      tone: 'accent',
    });
    print({ kind: 'text', lines: profile.bio });
    print({
      kind: 'text',
      lines: [
        '',
        `→ Type \`projects\` to see what I've shipped.`,
        `→ Type \`experience\` for the full timeline.`,
        `→ Type \`hire me\` to start a conversation.`,
      ],
      tone: 'dim',
    });
  },
};
