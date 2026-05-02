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
      print({ kind: 'text', lines: manualLines(target) });
      return;
    }
    const cmds = registry.visible().sort((a, b) => a.name.localeCompare(b.name));
    const w = Math.max(...cmds.map((c) => c.name.length), 6);
    print({
      kind: 'text',
      lines: [
        'commands',
        '',
        ...cmds.map((c) => `  ${c.name.padEnd(w)}  ${c.summary}`),
        '',
        'tips:',
        '  Tab completes · ↑/↓ history · pipes: projects | grep react',
        '  try: hire me · secret · theme matrix',
      ],
    });
  },
  complete: (args) => (args.length === 1 ? registry.vocabulary() : []),
};
