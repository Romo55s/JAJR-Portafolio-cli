import { createElement } from 'react';
import type { Command } from '../types';
import type { ThemeName } from '../../store/terminalStore';
import {
  ThemeErrorOutput,
  ThemeListOutput,
  ThemeResultOutput,
  themeSearchableMirror,
} from '../../components/cli/SettingsCliOutput';

const THEMES: ThemeName[] = ['green', 'amber', 'mono', 'matrix'];

export const themeCmd: Command = {
  name: 'theme',
  summary: 'Switch terminal theme.',
  usage: 'theme [green|amber|mono|matrix]',
  run: ({ args, print, state, actions }) => {
    if (!args.length) {
      print({
        kind: 'react',
        searchable: themeSearchableMirror(),
        node: createElement(ThemeListOutput, { current: state.theme }),
      });
      return;
    }
    const next = args[0].toLowerCase() as ThemeName;
    if (!THEMES.includes(next)) {
      print({
        kind: 'react',
        searchable: `unknown theme ${next}`,
        node: createElement(ThemeErrorOutput, {
          name: next,
          available: THEMES.join(', '),
        }),
      });
      return;
    }
    actions.setTheme(next);
    print({
      kind: 'react',
      searchable: `theme set to ${next}`,
      node: createElement(ThemeResultOutput, { next }),
    });
  },
  complete: () => THEMES,
};
