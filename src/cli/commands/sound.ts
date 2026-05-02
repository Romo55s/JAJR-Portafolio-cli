import type { Command } from '../types';
import { emit } from '../../lib/analytics';
import { playConfirm, unlockSound } from '../../lib/sound';

const VALID = ['on', 'off', 'status'] as const;

export const soundCmd: Command = {
  name: 'sound',
  summary: 'Toggle keystroke FX (on|off|status).',
  usage: 'sound <on|off|status>',
  run: ({ args, print, state, actions, emit: emitUi }) => {
    const sub = (args[0] || 'status').toLowerCase();
    if (!VALID.includes(sub as (typeof VALID)[number])) {
      print({
        kind: 'text',
        lines: [`usage: sound <on|off|status>`],
        tone: 'error',
      });
      return;
    }
    if (sub === 'status') {
      print({ kind: 'text', lines: [`sound: ${state.soundOn ? 'on' : 'off'}`] });
      return;
    }
    const on = sub === 'on';
    actions.setSound(on);
    emitUi({ kind: 'sound', on });
    if (on) {
      unlockSound();
      playConfirm();
    }
    emit({ type: 'sound_toggle', on });
    print({ kind: 'text', lines: [`sound → ${on ? 'on' : 'off'}`], tone: 'accent' });
  },
  complete: (args) => (args.length === 1 ? [...VALID] : []),
};
