import { createElement } from 'react';
import type { Command } from '../types';
import { ExperienceTimeline, experienceSearchableMirror } from '../../components/ExperienceTimeline';

export const experienceCmd: Command = {
  name: 'experience',
  aliases: ['career', 'cv'],
  summary: 'Career timeline.',
  run: ({ print }) => {
    print({
      kind: 'react',
      searchable: experienceSearchableMirror(),
      node: createElement(ExperienceTimeline),
    });
  },
};
