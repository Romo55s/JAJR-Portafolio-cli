import type { Project } from '../../content/projects';
import { CmdBulletList, CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

export function ProjectsListOutput({ projects: list }: { projects: Project[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Shipped work</CmdSectionTitle>
      <p className="text-terminal-muted text-[11px] sm:text-xs mb-4 px-0.5 leading-relaxed">
        Production apps and internal tools — auth, data pipelines, and deploy pipelines included.
      </p>
      <div className="space-y-4">
        {list.map((p) => (
          <article
            key={p.id}
            className="rounded-lg border border-terminal-border/80 border-l-[3px] border-l-terminal-accent/70 bg-terminal-surface/35 py-3 px-3 sm:px-4"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
              <span className="text-terminal-accent font-mono text-[11px] sm:text-xs font-bold">
                [{p.id}]
              </span>
              {p.featured ? (
                <span className="text-terminal-warn text-[10px] uppercase tracking-wider font-semibold">
                  ★ featured
                </span>
              ) : null}
            </div>
            <h3 className="text-terminal-text text-xs sm:text-sm font-semibold m-0 mb-1 leading-snug break-words">
              {p.name}
            </h3>
            <p className="text-terminal-muted text-[11px] sm:text-xs m-0 mb-2 leading-relaxed">{p.tagline}</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {p.stack.slice(0, 8).map((t) => (
                <span
                  key={t}
                  className="inline-flex rounded border border-terminal-border/80 bg-terminal-bg/30 px-1.5 py-0.5 text-[10px] sm:text-[11px] text-terminal-link"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-link text-[11px] sm:text-xs break-all hover:text-terminal-accent transition-colors"
            >
              {p.url.replace(/^https?:\/\//, '')}
            </a>
          </article>
        ))}
      </div>
      <p className="text-terminal-muted text-[11px] mt-4 mb-0 px-0.5 leading-snug">
        <span className="text-terminal-accent">&gt;</span> Run{' '}
        <code className="text-terminal-text">projects &lt;id&gt;</code> or{' '}
        <code className="text-terminal-text">projects &lt;slug&gt;</code> for the deep dive.
      </p>
    </div>
  );
}

export function ProjectDetailOutput({ project: p }: { project: Project }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Project dossier</CmdSectionTitle>
      <CmdInsetPanel className="mb-4">
        <div className="flex flex-wrap gap-2 items-center mb-2">
          <span className="text-terminal-accent font-mono text-xs font-bold">[{p.id}]</span>
          <span className="text-terminal-muted text-[10px] uppercase tracking-widest">
            status: <span className="text-terminal-warn">{p.status}</span>
          </span>
        </div>
        <h3 className="text-terminal-text text-sm sm:text-base font-semibold m-0 mb-2 leading-snug break-words">
          ▌ {p.name}
        </h3>
        <p className="text-terminal-link text-xs sm:text-sm m-0 mb-3">{p.tagline}</p>
        <p className="text-terminal-text text-[11px] sm:text-xs leading-relaxed m-0 mb-4">{p.description}</p>
        <div className="grid gap-2 text-[11px] sm:text-xs border-t border-terminal-border/60 pt-3">
          <div className="flex flex-col sm:flex-row sm:gap-2 min-w-0">
            <span className="text-terminal-muted shrink-0 w-28 font-semibold uppercase tracking-wide text-[10px] sm:text-xs pt-0.5">
              Role
            </span>
            <span className="text-terminal-text break-words">{p.role}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2 min-w-0">
            <span className="text-terminal-muted shrink-0 w-28 font-semibold uppercase tracking-wide text-[10px] sm:text-xs pt-0.5">
              Stack
            </span>
            <span className="text-terminal-link break-words">{p.stack.join(', ')}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-2 min-w-0">
            <span className="text-terminal-muted shrink-0 w-28 font-semibold uppercase tracking-wide text-[10px] sm:text-xs pt-0.5">
              URL
            </span>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terminal-link break-all hover:text-terminal-accent"
            >
              {p.url}
            </a>
          </div>
        </div>
      </CmdInsetPanel>
      <div className="relative pl-3 sm:pl-4 border-l-[3px] border-terminal-accent/70">
        <p className="text-terminal-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-2 m-0">
          Highlights
        </p>
        <CmdBulletList items={p.highlights} />
      </div>
    </div>
  );
}

export function projectsListSearchableMirror(list: Project[]): string {
  return list.flatMap((p) => [p.name, p.tagline, p.slug, ...p.stack, p.url]).join('\n');
}

export function projectDetailSearchableMirror(p: Project): string {
  return [p.name, p.tagline, p.description, ...p.highlights, ...p.stack, p.url].join('\n');
}
