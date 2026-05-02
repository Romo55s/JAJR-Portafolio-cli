import type { Command } from '../../cli/types';
import { CmdInsetPanel, CmdSectionTitle, CmdBulletList } from './CommandChrome';

export interface HelpRow {
  name: string;
  summary: string;
}

export function HelpIndexOutput({ commands, tips }: { commands: HelpRow[]; tips: string[] }) {
  const w = Math.max(...commands.map((c) => c.name.length), 6) + 2;

  return (
    <div className="min-w-0 w-full max-w-full pb-1">
      <CmdSectionTitle>Command index</CmdSectionTitle>
      <CmdInsetPanel className="mb-4">
        <p className="text-terminal-text text-sm leading-relaxed m-0 mb-3">
          You&apos;re inside a real CLI shell — pipes, history, and autocomplete included. Pick a command
          below or mash <kbd className="text-terminal-accent px-1">Tab</kbd> for completions.
        </p>
        <div className="font-mono text-[11px] sm:text-xs space-y-1.5 overflow-x-auto">
          {commands.map((c) => (
            <div key={c.name} className="flex gap-x-2 min-w-0 whitespace-nowrap sm:whitespace-normal">
              <span className="text-terminal-accent font-semibold shrink-0">{c.name.padEnd(w)}</span>
              <span className="text-terminal-muted min-w-0 break-words whitespace-normal">{c.summary}</span>
            </div>
          ))}
        </div>
      </CmdInsetPanel>
      <div className="relative pl-3 sm:pl-4 border-l-[3px] border-terminal-accent/70">
        <p className="text-terminal-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-2 m-0">
          Tips
        </p>
        <CmdBulletList items={tips} />
      </div>
    </div>
  );
}

export function ManualPageOutput({ cmd }: { cmd: Command }) {
  const aliases = cmd.aliases?.length ? cmd.aliases.join(', ') : null;

  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>{cmd.name} · manual</CmdSectionTitle>
      <CmdInsetPanel>
        <pre className="text-terminal-muted text-[10px] sm:text-xs m-0 mb-3 whitespace-pre-wrap break-all leading-snug">
          {`${cmd.name.toUpperCase()}(1)`}{' '.repeat(Math.max(1, 24 - cmd.name.length))}
          User Commands — Tony Portfolio CLI
        </pre>
        <div className="space-y-3 text-sm">
          <div>
            <CmdInsetPanel className="mb-0 !bg-terminal-bg/30 border-terminal-border/60">
              <span className="text-terminal-muted text-[10px] uppercase tracking-widest font-semibold block mb-1">
                Name
              </span>
              <span className="text-terminal-text font-medium">{cmd.name}</span>
              <span className="text-terminal-muted"> — </span>
              <span className="text-terminal-muted">{cmd.summary}</span>
            </CmdInsetPanel>
          </div>
          {cmd.usage ? (
            <div className="pl-2 border-l-2 border-terminal-border">
              <span className="text-terminal-accent text-[10px] uppercase tracking-widest font-semibold block mb-1">
                Usage
              </span>
              <code className="text-terminal-link text-xs sm:text-sm break-all">{cmd.usage}</code>
            </div>
          ) : null}
          {aliases ? (
            <div className="pl-2 border-l-2 border-terminal-border">
              <span className="text-terminal-warn text-[10px] uppercase tracking-widest font-semibold block mb-1">
                Aliases
              </span>
              <span className="text-terminal-text text-xs sm:text-sm break-words">{aliases}</span>
            </div>
          ) : null}
        </div>
      </CmdInsetPanel>
    </div>
  );
}

export function helpSearchableMirror(commands: HelpRow[]): string {
  return ['Command index', ...commands.map((c) => `${c.name} ${c.summary}`)].join('\n');
}

export function manualSearchableMirror(cmd: Command): string {
  const parts = [cmd.name, cmd.summary];
  if (cmd.usage) parts.push(cmd.usage);
  if (cmd.aliases?.length) parts.push(...cmd.aliases);
  return parts.join('\n');
}
