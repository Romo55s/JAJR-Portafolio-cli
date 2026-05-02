import type { Command, OutputBlock } from '../types';

function blockToLines(b: OutputBlock): string[] {
  switch (b.kind) {
    case 'text':
      return b.lines;
    case 'ascii':
      return b.art.split('\n');
    case 'react':
      return b.searchable ? b.searchable.split('\n') : [];
    case 'echo':
      return [];
  }
}

export const grepCmd: Command = {
  name: 'grep',
  summary: 'Filter output (pipe or standalone).',
  usage: 'grep <pattern>   |   <cmd> | grep <pattern>',
  run: ({ args, pipeIn, print, state }) => {
    if (!args.length) {
      print({ kind: 'text', lines: ['usage: grep <pattern>'], tone: 'error' });
      return;
    }
    const pattern = args.join(' ');
    let regex: RegExp;
    try {
      regex = new RegExp(pattern, 'i');
    } catch {
      regex = new RegExp(pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    }
    const source = pipeIn?.length ? pipeIn : state.output;
    const matched: string[] = [];
    for (const block of source) {
      for (const line of blockToLines(block)) {
        if (regex.test(line)) matched.push(line);
      }
    }
    if (!matched.length) {
      print({ kind: 'text', lines: [`(no matches for /${pattern}/)`], tone: 'dim' });
      return;
    }
    print({ kind: 'text', lines: matched });
  },
};
