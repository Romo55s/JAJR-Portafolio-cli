import { createElement } from 'react';
import type { Command } from '../types';
import { ContactOutput, contactSearchableMirror } from '../../components/cli/WhoamiAboutContactOutput';

export const contactCmd: Command = {
  name: 'contact',
  aliases: ['email', 'reach'],
  summary: 'Email, LinkedIn, GitHub, schedule a call, resume.',
  run: ({ print }) => {
    print({
      kind: 'react',
      searchable: contactSearchableMirror(),
      node: createElement(ContactOutput),
    });
  },
};
