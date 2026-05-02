import { createElement } from 'react';
import type { Command } from '../types';
import { emit } from '../../lib/analytics';
import { SecretStoryOutput, secretSearchableMirror } from '../../components/cli/SecretCliOutput';

export const secretCmd: Command = {
  name: 'secret',
  summary: 'Something hidden.',
  run: ({ print }) => {
    emit({ type: 'secret_view' });
    print({
      kind: 'react',
      searchable: secretSearchableMirror(),
      node: createElement(SecretStoryOutput),
    });
  },
};
