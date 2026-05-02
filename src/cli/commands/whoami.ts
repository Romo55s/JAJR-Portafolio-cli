import { createElement } from 'react';
import type { Command } from '../types';
import { WhoamiOutput, whoamiSearchableMirror } from '../../components/cli/WhoamiAboutContactOutput';

export const whoamiCmd: Command = {
  name: 'whoami',
  summary: 'Show one-line identity.',
  run: ({ print }) => {
    print({
      kind: 'react',
      searchable: whoamiSearchableMirror(),
      node: createElement(WhoamiOutput),
    });
  },
};
