import type { Command } from '../types';

export const historyCmd: Command = {
  name: 'history',
  aliases: ['hist'],
  summary: 'Show recent commands.',
  run: ({ print, state }) => {
    const list = [...state.history].reverse();
    if (!list.length) {
      print({ kind: 'text', lines: ['No commands yet.'], tone: 'dim' });
      return;
    }
    const w = String(list.length).length;
    print({
      kind: 'text',
      lines: list.map((cmd, i) => `${String(i + 1).padStart(w)}  ${cmd}`),
    });
  },
};
