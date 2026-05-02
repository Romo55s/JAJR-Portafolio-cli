import type { Command } from '../types';
import { projects } from '../../content/projects';

function listLines(): string[] {
  const lines: string[] = ['Featured projects:', ''];
  for (const p of projects) {
    const tag = p.featured ? ' ★' : '';
    lines.push(`  [${p.id}]${tag} ${p.name}`);
    lines.push(`        ${p.tagline}`);
    lines.push(`        stack: ${p.stack.join(', ')}`);
    lines.push(`        url:   ${p.url}`);
    lines.push('');
  }
  lines.push('Type `projects <id>` for details (e.g. `projects 1`).');
  return lines;
}

function detailLines(id: number): string[] {
  const p = projects.find((x) => x.id === id);
  if (!p) return [`No project with id ${id}. Try \`projects\` to list all.`];
  return [
    `▌ ${p.name}`,
    `▌ ${p.tagline}`,
    '',
    p.description,
    '',
    `Status:    ${p.status}`,
    `Role:      ${p.role}`,
    `Stack:     ${p.stack.join(', ')}`,
    `URL:       ${p.url}`,
    '',
    'Highlights:',
    ...p.highlights.map((h) => `  • ${h}`),
  ];
}

export const projectsCmd: Command = {
  name: 'projects',
  aliases: ['work', 'portfolio'],
  summary: 'List shipped projects (with details).',
  usage: 'projects [id|slug]',
  run: ({ args, print }) => {
    if (!args.length) {
      print({ kind: 'text', lines: listLines() });
      return;
    }
    const arg = args[0];
    const idNum = Number(arg);
    let lines: string[];
    if (Number.isFinite(idNum)) {
      lines = detailLines(idNum);
    } else {
      const found = projects.find((p) => p.slug === arg.toLowerCase());
      lines = found ? detailLines(found.id) : [`No project named "${arg}".`];
    }
    print({ kind: 'text', lines });
  },
  complete: (args) => {
    if (args.length === 1) {
      return projects.flatMap((p) => [String(p.id), p.slug]);
    }
    return [];
  },
};
