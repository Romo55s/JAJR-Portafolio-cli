import type { Command } from '../types';
import { profile } from '../../content/profile';

export const resumeCmd: Command = {
  name: 'resume',
  aliases: ['cv-pdf'],
  summary: 'Download my resume (PDF).',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        `Opening ${profile.links.resume} ...`,
        'If the download did not start, open it manually.',
      ],
    });
    if (typeof window !== 'undefined') {
      const a = document.createElement('a');
      a.href = profile.links.resume;
      a.download = 'tony-romo-resume.pdf';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  },
};
