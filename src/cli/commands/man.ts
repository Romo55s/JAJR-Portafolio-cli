import type { Command } from '../types';
import { registry } from '../registry';

function manualLines(cmd: Command): string[] {
  const lines: string[] = [cmd.name, '', cmd.summary, ''];
  if (cmd.usage) {
    lines.push('SYNOPSIS', `    ${cmd.usage}`, '');
  }
  if (cmd.aliases?.length) {
    lines.push('ALIASES', `    ${cmd.aliases.join(', ')}`, '');
  }
  return lines;
}

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
    print({ kind: 'text', lines: manualLines(target) });
  },
  complete: (args) => (args.length === 1 ? registry.vocabulary() : []),
};
