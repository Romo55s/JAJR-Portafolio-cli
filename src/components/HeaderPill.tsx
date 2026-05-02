import { profile } from '../content/profile';
import { useTerminalStore } from '../store/terminalStore';

interface Props {
  onHireMe: () => void;
}

export function HeaderPill({ onHireMe }: Props) {
  const theme = useTerminalStore((s) => s.theme);
  return (
    <div className="flex flex-row flex-wrap items-center justify-between gap-x-2 gap-y-2 mb-3 select-none">
      <div className="flex items-center gap-2 min-w-0 flex-1 basis-[min(100%,16rem)]">
        <span className="inline-flex h-2 w-2 rounded-full bg-terminal-error shrink-0" />
        <span className="inline-flex h-2 w-2 rounded-full bg-terminal-warn shrink-0" />
        <span className="inline-flex h-2 w-2 rounded-full bg-terminal-accent shrink-0" />
        <span className="font-mono text-[10px] sm:text-xs text-terminal-muted truncate ml-1 min-w-0">
          {profile.handle}@{profile.hostname}: ~ — zsh — {theme}
        </span>
      </div>
      <button
        type="button"
        onClick={onHireMe}
        className="chip text-terminal-accent border-terminal-accent/40 hover:border-terminal-accent shrink-0"
        aria-label="Open hire me"
      >
        [ hire me ]
      </button>
    </div>
  );
}
