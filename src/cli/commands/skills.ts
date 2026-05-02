import type { Command } from '../types';
import { skills, interests } from '../../content/skills';

export const skillsCmd: Command = {
  name: 'skills',
  aliases: ['stack'],
  summary: 'Show grouped skills.',
  run: ({ print }) => {
    const lines: string[] = ['Skills:', ''];
    for (const [group, list] of Object.entries(skills)) {
      lines.push(`  ${group}:`);
      lines.push(`    ${list.join(' · ')}`);
      lines.push('');
    }
    lines.push('Interests:');
    interests.forEach((i) => lines.push(`  • ${i}`));
    print({ kind: 'text', lines });
  },
};
