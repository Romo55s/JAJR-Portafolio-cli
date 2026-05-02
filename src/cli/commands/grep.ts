import type { Command, OutputBlock } from '../types';

function blocksToLines(blocks: OutputBlock[] | undefined): string[] {
  if (!blocks?.length) return [];
  const lines: string[] = [];
  for (const b of blocks) {
    if (b.kind === 'text') lines.push(...b.lines);
    else if (b.kind === 'react' && b.searchable) lines.push(...b.searchable.split('\n'));
    else if (b.kind === 'ascii') lines.push(...b.art.split('\n'));
  }
  return lines;
}

export const grepCmd: Command = {
  name: 'grep',
  summary: 'Filter lines matching a pattern.',
  usage: 'grep <pattern>',
  run: ({ args, pipeIn, print }) => {
    const pattern = args.join(' ').trim();
    if (!pattern) {
      print({
        kind: 'text',
        lines: ['usage: grep <pattern>', '(often used after a pipe)'],
        tone: 'error',
      });
      return;
    }
    const inputLines = blocksToLines(pipeIn);
    const needle = pattern.toLowerCase();
    const matched = inputLines.filter((line) => line.toLowerCase().includes(needle));
    if (!matched.length) {
      print({ kind: 'text', lines: ['no matches'], tone: 'dim' });
      return;
    }
    print({ kind: 'text', lines: matched });
  },
};
