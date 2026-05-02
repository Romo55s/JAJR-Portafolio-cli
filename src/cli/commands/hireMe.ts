import type { Command } from '../types';
import { profile } from '../../content/profile';
import { emit } from '../../lib/analytics';

export const hireMeCmd: Command = {
  name: 'hire me',
  aliases: ['hire-me', 'hireme', 'hire'],
  summary: "Open the hire-me CTA. Don't be shy.",
  run: ({ print, emit: emitUi }) => {
    print({
      kind: 'text',
      lines: [
        '> opening secure channel...',
        '> ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%',
        '> ready.',
        '',
        `Email:    ${profile.email}`,
        `LinkedIn: ${profile.links.linkedin}`,
        '',
        '(opening hire-me overlay — press Esc to close)',
      ],
      tone: 'accent',
    });
    emitUi({ kind: 'open-hire-me' });
    emit({ type: 'hire_me_open' });
  },
};
