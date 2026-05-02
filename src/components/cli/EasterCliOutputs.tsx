import type { Role } from '../../content/experience';
import { CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

export function FakeLsOutput() {
  const chunks = [
    ['about/', 'contact/', 'experience/', 'projects/', 'secret/'],
    ['resume.pdf', 'skills/', 'theme/', 'whoami', 'hire-me/'],
  ];

  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>List · ~/portfolio</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-muted text-xs m-0 mb-3 leading-relaxed">
          Pseudo-directory layout — run real commands like{' '}
          <code className="text-terminal-link">experience</code> or{' '}
          <code className="text-terminal-link">projects</code>.
        </p>
        {chunks.map((row, ri) => (
          <div key={ri} className="flex flex-wrap gap-2 mb-2 last:mb-0">
            {row.map((name) => (
              <span
                key={name}
                className="inline-flex items-center rounded border border-terminal-border/80 bg-terminal-bg/35 px-2 py-1 text-[11px] sm:text-xs text-terminal-link font-mono"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </CmdInsetPanel>
    </div>
  );
}

export function FakePwdOutput({ path }: { path: string }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel>
        <code className="text-terminal-accent text-sm font-mono break-all">{path}</code>
      </CmdInsetPanel>
    </div>
  );
}

export function FakeDateOutput({ iso }: { iso: string }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel>
        <p className="text-terminal-text text-xs sm:text-sm font-mono m-0 break-all">{iso}</p>
      </CmdInsetPanel>
    </div>
  );
}

export function CatFileOutput({ lines }: { lines: string[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel>
        <pre className="text-terminal-text text-[11px] sm:text-xs font-mono m-0 whitespace-pre-wrap break-words leading-relaxed">
          {lines.join('\n')}
        </pre>
      </CmdInsetPanel>
    </div>
  );
}

export function CatErrorOutput({ message }: { message: string }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-error/45">
        <p className="text-terminal-error text-sm font-mono m-0 break-words">{message}</p>
      </CmdInsetPanel>
    </div>
  );
}

export interface GitCommitRow {
  sha: string;
  head: boolean;
  author: string;
  dateRange: string;
  subject: string;
}

export function GitLogOutput({ commits }: { commits: GitCommitRow[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>git log -- career</CmdSectionTitle>
      <div className="space-y-3">
        {commits.map((c, i) => (
          <article
            key={`${c.sha}-${i}`}
            className="rounded-lg border border-terminal-border/70 border-l-[3px] border-l-terminal-accent/70 bg-terminal-surface/40 px-3 py-2.5"
          >
            <div className="flex flex-wrap gap-x-2 items-baseline mb-1">
              <span className="text-terminal-warn font-mono text-xs">{c.sha}</span>
              {c.head ? (
                <span className="text-terminal-accent text-[10px] uppercase tracking-widest font-semibold">
                  HEAD → main
                </span>
              ) : null}
            </div>
            <p className="text-terminal-muted text-[11px] font-mono m-0 mb-2 break-all">{c.author}</p>
            <p className="text-terminal-muted text-[11px] m-0 mb-2">{c.dateRange}</p>
            <p className="text-terminal-text text-sm m-0 whitespace-pre-wrap break-words">{c.subject}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function buildGitCommitsFromExperience(experience: Role[]): GitCommitRow[] {
  function hashStr(s: string): number {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return h;
  }

  return experience.map((r, i) => ({
    sha: (Math.abs(hashStr(r.title + r.company)) >>> 0).toString(16).slice(0, 7),
    head: i === 0,
    author: `Tony Romo <tony@portfolio>`,
    dateRange: `${r.start} → ${r.end}`,
    subject: `${r.title} @ ${r.company}`,
  }));
}

export function gitLogSearchableMirror(experience: Role[]): string {
  return experience.flatMap((r) => [r.title, r.company, r.start, String(r.end)]).join('\n');
}

export function NpmCareerOutput({ stages }: { stages: string[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>npm run career</CmdSectionTitle>
      <CmdInsetPanel className="mb-3 border-terminal-muted/50">
        <p className="text-terminal-muted font-mono text-[11px] sm:text-xs m-0 mb-2">
          &gt; tony-romo@1.0.0 career
        </p>
        <p className="text-terminal-muted font-mono text-[11px] sm:text-xs m-0">
          &gt; tsc -b && vite build && deploy --prod
        </p>
      </CmdInsetPanel>
      <CmdInsetPanel className="border-terminal-accent/35">
        <ul className="list-none m-0 p-0 space-y-2 font-mono text-[11px] sm:text-xs">
          {stages.map((s, i) => (
            <li key={i} className="text-terminal-accent flex gap-2">
              <span className="text-terminal-muted shrink-0">✓</span>
              <span className="break-words">{s}</span>
            </li>
          ))}
          <li className="text-terminal-muted pt-1 border-t border-terminal-border/60 mt-2">
            ✓ all stages green. ready to deploy.
          </li>
        </ul>
      </CmdInsetPanel>
    </div>
  );
}

export function TracerouteOutput({ host, hops }: { host: string; hops: string[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Traceroute</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-muted text-xs m-0 mb-3 font-mono break-all">
          traceroute to {host}, 30 hops max, 60 byte packets
        </p>
        <pre className="text-terminal-text text-[11px] sm:text-xs font-mono m-0 whitespace-pre-wrap break-words leading-relaxed">
          {hops.join('\n')}
        </pre>
        <p className="text-terminal-accent text-xs mt-3 m-0 font-mono">✓ reached.</p>
      </CmdInsetPanel>
    </div>
  );
}

export function ShareCopiedOutput() {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-accent/35">
        <p className="text-terminal-accent text-sm font-medium m-0 crt-glow">
          ✓ Link copied to clipboard.
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function ShareFallbackOutput({ url }: { url: string }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel>
        <p className="text-terminal-muted text-xs m-0 mb-2">Clipboard unavailable — copy manually:</p>
        <code className="text-terminal-link text-[11px] sm:text-xs break-all">{url}</code>
      </CmdInsetPanel>
    </div>
  );
}

export function SudoDeniedOutput({ lines }: { lines: string[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-error/45">
        <pre className="text-terminal-error text-xs font-mono m-0 whitespace-pre-wrap break-words">
          {lines.join('\n')}
        </pre>
      </CmdInsetPanel>
    </div>
  );
}

export function SudoHireOutput({ lines }: { lines: string[] }) {
  return (
    <div className="min-w-0 w-full pb-1 space-y-3">
      <CmdInsetPanel className="border-terminal-accent/35">
        <p className="text-terminal-accent text-sm m-0 font-medium crt-glow">{lines[0]}</p>
      </CmdInsetPanel>
      <CmdInsetPanel>
        <p className="text-terminal-muted text-xs m-0">{lines[1]}</p>
      </CmdInsetPanel>
    </div>
  );
}
