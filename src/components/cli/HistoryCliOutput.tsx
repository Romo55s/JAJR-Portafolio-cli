import { CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

export function HistoryOutput({ entries }: { entries: string[] }) {
  const w = String(entries.length).length;

  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Session history</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-muted text-xs m-0 mb-3 leading-relaxed">
          Lines replay with <kbd className="text-terminal-accent px-0.5">↑</kbd>{' '}
          <kbd className="text-terminal-accent px-0.5">↓</kbd> — nothing leaves your browser unless you paste it.
        </p>
        <div className="font-mono text-[11px] sm:text-xs space-y-1 overflow-x-auto">
          {entries.map((cmd, i) => (
            <div key={`${i}-${cmd.slice(0, 24)}`} className="flex gap-2 sm:gap-3 min-w-0">
              <span className="text-terminal-accent tabular-nums shrink-0 w-[2ch] sm:w-auto text-right">
                {String(i + 1).padStart(w)}
              </span>
              <span className="text-terminal-text break-all whitespace-pre-wrap min-w-0">{cmd}</span>
            </div>
          ))}
        </div>
      </CmdInsetPanel>
    </div>
  );
}

export function historySearchableMirror(entries: string[]): string {
  return entries.join('\n');
}
