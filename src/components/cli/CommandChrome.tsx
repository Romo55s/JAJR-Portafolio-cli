import type { ReactNode } from 'react';

/** Matches experience/skills section headers; responsive gradient rules. */
export function CmdSectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3 sm:mb-4 px-0.5">
      <span
        className="hidden sm:block h-px w-8 shrink-0 bg-gradient-to-r from-transparent to-terminal-accent/35"
        aria-hidden
      />
      <h2 className="text-terminal-accent text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em] m-0 leading-snug">
        {children}
      </h2>
      <span
        className="hidden sm:block flex-1 min-w-[4rem] h-px bg-gradient-to-r from-terminal-accent/25 via-terminal-border to-transparent max-w-xs"
        aria-hidden
      />
    </div>
  );
}

export function CmdInsetPanel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-terminal-border/90 bg-terminal-surface/55 px-3 py-3 sm:px-4 sm:py-3.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)] ${className}`}
    >
      {children}
    </div>
  );
}

export function CmdGroupLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-terminal-muted text-[10px] sm:text-[11px] uppercase tracking-[0.14em] font-semibold mb-2 m-0">
      {children}
    </p>
  );
}

export function CmdBulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 sm:space-y-2.5 list-none m-0 p-0">
      {items.map((item, i) => (
        <li key={i} className="text-terminal-text text-xs sm:text-sm leading-relaxed flex gap-2 min-w-0">
          <span className="text-terminal-accent shrink-0 mt-0.5 opacity-80 select-none" aria-hidden>
            ›
          </span>
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}
