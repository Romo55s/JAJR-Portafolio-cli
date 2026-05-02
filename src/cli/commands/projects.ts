import { createElement } from 'react';
import type { Command } from '../types';
import { projects } from '../../content/projects';
import {
  ProjectDetailOutput,
  ProjectsListOutput,
  projectDetailSearchableMirror,
  projectsListSearchableMirror,
} from '../../components/cli/ProjectsCliOutput';

export const projectsCmd: Command = {
  name: 'projects',
  aliases: ['work', 'portfolio'],
  summary: 'List shipped projects (with details).',
  usage: 'projects [id|slug]',
  run: ({ args, print }) => {
    if (!args.length) {
      print({
        kind: 'react',
        searchable: projectsListSearchableMirror(projects),
        node: createElement(ProjectsListOutput, { projects }),
      });
      return;
    }
    const arg = args[0];
    const idNum = Number(arg);
    let found = Number.isFinite(idNum) ? projects.find((x) => x.id === idNum) : undefined;
    if (!found && !Number.isFinite(idNum)) {
      found = projects.find((p) => p.slug === arg.toLowerCase());
    }
    if (!found) {
      print({
        kind: 'text',
        lines: [`No project named "${arg}".`],
        tone: 'error',
      });
      return;
    }
    print({
      kind: 'react',
      searchable: projectDetailSearchableMirror(found),
      node: createElement(ProjectDetailOutput, { project: found }),
    });
  },
  complete: (args) => {
    if (args.length === 1) {
      return projects.flatMap((p) => [String(p.id), p.slug]);
    }
    return [];
  },
};
