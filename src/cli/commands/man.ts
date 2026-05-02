import type { Command } from '../types';
import { registry } from '../registry';

export const manCmd: Command = {
  name: 'man',
  summary: 'Show the manual for a command.',
  usage: 'man <command>',
  run: ({ args, print }) => {
    if (!args.length) {
      print({ kind: 'text', lines: ['What manual page do you want?'], tone: 'error' });
      return;
    }
    const target = registry.resolve(args[0]);
    if (!target) {
      print({
        kind: 'text',
        lines: [`No manual entry for ${args[0]}.`],
        tone: 'error',
      });
      return;
    }
    print({
      kind: 'text',
      lines: [
        `${target.name.toUpperCase()}(1)                     User Commands`,
        '',
        'NAME',
        `    ${target.name} — ${target.summary}`,
        ...(target.usage ? ['', 'USAGE', `    ${target.usage}`] : []),
        ...(target.aliases?.length ? ['', 'ALIASES', `    ${target.aliases.join(', ')}`] : []),
        '',
        'TONY ROMO PORTFOLIO              ',
      ],
    });
  },
  complete: (args) => (args.length === 1 ? registry.vocabulary() : []),
};
