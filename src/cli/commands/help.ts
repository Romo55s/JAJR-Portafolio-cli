import type { Command } from '../types';
import { registry } from '../registry';

export const helpCmd: Command = {
  name: 'help',
  aliases: ['?'],
  summary: 'List all available commands.',
  usage: 'help [command]',
  run: ({ args, print }) => {
    if (args.length) {
      const target = registry.resolve(args[0]);
      if (!target || target.hidden) {
        print({
          kind: 'text',
          lines: [`no manual entry for ${args[0]}`],
          tone: 'error',
        });
        return;
      }
      const lines = [
        `${target.name.toUpperCase()}(1)                     User Commands`,
        '',
        'NAME',
        `    ${target.name} — ${target.summary}`,
        ...(target.usage ? ['', 'USAGE', `    ${target.usage}`] : []),
        ...(target.aliases?.length ? ['', 'ALIASES', `    ${target.aliases.join(', ')}`] : []),
      ];
      print({ kind: 'text', lines });
      return;
    }
    const cmds = registry.visible().sort((a, b) => a.name.localeCompare(b.name));
    const w = Math.max(...cmds.map((c) => c.name.length)) + 2;
    const lines = [
      'Available commands:',
      '',
      ...cmds.map((c) => `  ${c.name.padEnd(w)}${c.summary}`),
      '',
      'Tips:',
      '  • Tab to autocomplete · ↑/↓ to navigate history',
      '  • Pipe with `|` (e.g. `projects | grep react`)',
      '  • Try: `hire me`, `secret`, `theme matrix`',
    ];
    print({ kind: 'text', lines });
  },
  complete: (args) => (args.length === 1 ? registry.vocabulary() : []),
};
