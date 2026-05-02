import type { Command } from '../types';
import type { ThemeName } from '../../store/terminalStore';
import { emit } from '../../lib/analytics';

const THEMES: ThemeName[] = ['green', 'amber', 'mono', 'matrix'];

export const themeCmd: Command = {
  name: 'theme',
  summary: 'Switch terminal theme.',
  usage: `theme <${THEMES.join('|')}>`,
  run: ({ args, print, state, actions, emit: emitUi }) => {
    if (!args.length) {
      print({
        kind: 'text',
        lines: [
          `current theme: ${state.theme}`,
          `available:     ${THEMES.join(', ')}`,
          `usage:         theme <name>`,
        ],
      });
      return;
    }
    const next = args[0].toLowerCase();
    if (!THEMES.includes(next as ThemeName)) {
      print({
        kind: 'text',
        lines: [`unknown theme: ${next}`, `available: ${THEMES.join(', ')}`],
        tone: 'error',
      });
      return;
    }
    actions.setTheme(next as ThemeName);
    emitUi({ kind: 'theme', name: next as ThemeName });
    emit({ type: 'theme_change', name: next });
    print({ kind: 'text', lines: [`theme → ${next}`], tone: 'accent' });
  },
  complete: (args) => (args.length === 1 ? [...THEMES] : []),
};
