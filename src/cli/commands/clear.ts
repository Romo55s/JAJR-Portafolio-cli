import type { Command } from '../types';

export const clearCmd: Command = {
  name: 'clear',
  aliases: ['cls'],
  summary: 'Clear the screen.',
  run: ({ emit }) => {
    emit({ kind: 'clear' });
  },
};
