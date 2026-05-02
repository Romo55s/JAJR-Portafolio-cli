import type { Command } from '../types';
import { secret } from '../../content/secret';
import { emit } from '../../lib/analytics';

export const secretCmd: Command = {
  name: 'secret',
  aliases: ['easter', 'story'],
  summary: 'A small confession. (Easter egg.)',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        `> decrypting ${secret.title}...`,
        '> bypassing /etc/responsibility/policy.d/*',
        '> rendering memory dump...',
        '',
      ],
      tone: 'dim',
    });
    print({ kind: 'text', lines: secret.body, tone: 'accent', typed: true });
    emit({ type: 'secret_view' });
  },
};
