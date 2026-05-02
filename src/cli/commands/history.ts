import type { Command } from '../types';

export const historyCmd: Command = {
  name: 'history',
  summary: 'Show recently typed commands.',
  run: ({ print, state }) => {
    const list = state.history;
    if (!list.length) {
      print({ kind: 'text', lines: ['(no history yet)'], tone: 'dim' });
      return;
    }
    const w = String(list.length).length;
    const lines = list.map((cmd, i) => `  ${String(i + 1).padStart(w)}  ${cmd}`);
    print({ kind: 'text', lines: ['History:', '', ...lines] });
  },
};
