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
        // Avoid Unicode shade blocks (▓): they expand to full cell height in JetBrains Mono.
        `> ${'#'.repeat(34)} 100%`,
        '> ready.',
        '',
        `Email:    ${profile.email}`,
        `LinkedIn: ${profile.links.linkedin}`,
        `Book:     ${profile.links.booking}`,
        '',
        '(opening hire-me overlay — press Esc to close)',
      ],
      tone: 'accent',
    });
    emitUi({ kind: 'open-hire-me' });
    emit({ type: 'hire_me_open' });
  },
};
