import { CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

export function GrepMatchesOutput({ pattern, lines }: { pattern: string; lines: string[] }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Piped grep</CmdSectionTitle>
      <CmdInsetPanel className="mb-3">
        <p className="text-terminal-muted text-[11px] uppercase tracking-widest m-0 mb-2">
          Pattern
        </p>
        <code className="text-terminal-accent text-xs sm:text-sm font-mono break-all">{pattern}</code>
      </CmdInsetPanel>
      <div className="rounded-lg border border-terminal-border/70 bg-terminal-surface/40 px-2 py-2 sm:px-3 font-mono text-[11px] sm:text-xs overflow-x-auto">
        <ul className="list-none m-0 p-0 space-y-1">
          {lines.map((line, i) => (
            <li key={`${i}-${line.slice(0, 40)}`} className="text-terminal-text whitespace-pre-wrap break-words">
              <span className="text-terminal-muted mr-2 select-none">{String(i + 1).padStart(3)}│</span>
              {line}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
