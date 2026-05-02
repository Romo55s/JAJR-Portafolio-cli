import { createElement } from 'react';
import type { Command } from '../types';
import { SkillsOutput, skillsSearchableMirror } from '../../components/SkillsOutput';

export const skillsCmd: Command = {
  name: 'skills',
  aliases: ['stack'],
  summary: 'Show grouped skills.',
  run: ({ print }) => {
    print({
      kind: 'react',
      searchable: skillsSearchableMirror(),
      node: createElement(SkillsOutput),
    });
  },
};
