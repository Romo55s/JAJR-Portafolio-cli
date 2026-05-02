import type { Command } from '../types';
import { emit } from '../../lib/analytics';
import { profile } from '../../content/profile';

export const resumeCmd: Command = {
  name: 'resume',
  aliases: ['cv'],
  summary: 'Download resume PDF.',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        'Downloading résumé as JAJR-CSV.pdf …',
        `Source: ${profile.links.resume}`,
        'Tip: some mobile browsers need an extra tap to save.',
        '',
      ],
      tone: 'accent',
    });
    emit({ type: 'resume_download' });
    const a = document.createElement('a');
    a.href = '/resume.pdf';
    a.download = 'JAJR-CSV.pdf';
    document.body.appendChild(a);
    a.click();
    a.remove();
  },
};
