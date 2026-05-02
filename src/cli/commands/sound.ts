import type { Command } from '../types';

export const soundCmd: Command = {
  name: 'sound',
  summary: 'Toggle subtle keystroke sounds.',
  usage: 'sound [on|off]',
  run: ({ args, print, state, actions }) => {
    if (!args.length) {
      print({
        kind: 'text',
        lines: [
          `sound is ${state.soundOn ? 'on' : 'off'}.`,
          'toggle: sound on · sound off',
        ],
      });
      return;
    }
    const mode = args[0].toLowerCase();
    if (mode !== 'on' && mode !== 'off') {
      print({
        kind: 'text',
        lines: ['usage: sound <on|off>'],
        tone: 'error',
      });
      return;
    }
    const enabled = mode === 'on';
    actions.setSound(enabled);
    print({
      kind: 'text',
      lines: [`sound → ${enabled ? 'on' : 'off'}`],
      tone: 'accent',
    });
  },
  complete: () => ['on', 'off'],
};
