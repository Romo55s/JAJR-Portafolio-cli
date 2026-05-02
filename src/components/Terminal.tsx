import { useCallback, useEffect, useRef, useState, type ComponentType } from 'react';
import { useTerminalStore } from '../store/terminalStore';
import { useTerminal } from '../hooks/useTerminal';
import { useKonami } from '../hooks/useKonami';
import { OutputLine } from './OutputLine';
import { Prompt } from './Prompt';
import { SuggestionChips } from './SuggestionChips';
import { BootSequence } from './BootSequence';
import { HireMeOverlay } from './HireMeOverlay';
import { HeaderPill } from './HeaderPill';
import { profile } from '../content/profile';
import { unlockSound } from '../lib/sound';

export function Terminal() {
  const { executor } = useTerminal();
  const output = useTerminalStore((s) => s.output);
  const booted = useTerminalStore((s) => s.booted);
  const setBooted = useTerminalStore((s) => s.setBooted);
  const hireMeOpen = useTerminalStore((s) => s.hireMeOpen);
  const setHireMeOpen = useTerminalStore((s) => s.setHireMeOpen);
  const theme = useTerminalStore((s) => s.theme);

  const scrollerRef = useRef<HTMLDivElement>(null);
  const setInputRef = useRef<((s: string) => void) | null>(null);
  const focusRef = useRef<(() => void) | null>(null);
  const [chipMatches, setChipMatches] = useState<string[] | null>(null);

  // Auto-scroll to bottom when output grows.
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [output, booted]);

  // After boot, auto-run whoami once for the headline.
  useEffect(() => {
    if (!booted) return;
    let cancelled = false;
    const t = window.setTimeout(() => {
      if (cancelled) return;
      executor.runLine('whoami');
    }, 60);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [booted, executor]);

  const handleSubmit = useCallback(
    (line: string) => {
      void executor.runLine(line);
      setChipMatches(null);
    },
    [executor],
  );

  const runFromChip = useCallback(
    (cmd: string) => {
      unlockSound();
      setInputRef.current?.('');
      void executor.runLine(cmd);
      focusRef.current?.();
    },
    [executor],
  );

  useKonami(() => {
    void executor.runLine('secret');
  });

  const Matrix = useMatrixBackground(theme === 'matrix');

  return (
    <div className="min-h-dvh w-full text-terminal-text">
      {Matrix}
      <div className="scanlines" aria-hidden="true" />
      <main
        className="relative z-10 mx-auto max-w-5xl px-3 sm:px-6 md:px-8 pt-[max(0.75rem,env(safe-area-inset-top))] pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:py-6"
        aria-label="Terminal"
      >
        <HeaderPill onHireMe={() => setHireMeOpen(true)} />

        <div
          ref={scrollerRef}
          className="bg-terminal-surface/40 border border-terminal-border rounded-lg p-3 sm:p-6 min-h-[56dvh] sm:min-h-[70dvh] max-h-[calc(100svh-10rem)] sm:max-h-[82dvh] overflow-x-auto overflow-y-auto shadow-terminal overscroll-contain text-sm leading-snug"
          onClick={(e) => {
            const el = e.target as HTMLElement;
            if (el.closest('[data-terminal-output]')) return;
            focusRef.current?.();
          }}
        >
          {!booted ? (
            <BootSequence onDone={() => setBooted(true)} />
          ) : (
            <>
              <div
                data-terminal-output
                aria-live="polite"
                aria-atomic="false"
                className="space-y-1 select-text cursor-text"
              >
                {output.map((b) => (
                  <OutputLine key={b.id} block={b} />
                ))}
              </div>

              {chipMatches?.length ? (
                <div className="font-mono text-terminal-muted text-[11px] sm:text-xs mt-1 break-words">
                  → {chipMatches.join('  ')}
                </div>
              ) : null}

              <div className="mt-1">
                <Prompt
                  onSubmit={handleSubmit}
                  onSuggestions={setChipMatches}
                  registerSetInput={(fn) => (setInputRef.current = fn)}
                  registerFocus={(fn) => (focusRef.current = fn)}
                />
              </div>
            </>
          )}
        </div>

        {booted && <SuggestionChips onRun={runFromChip} />}

        <footer className="mt-3 sm:mt-4 font-mono text-[11px] sm:text-xs text-terminal-muted flex flex-col gap-y-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{profile.status}</span>
            <span className="hidden sm:inline">·</span>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin
            </a>
            <span>·</span>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer">
              github
            </a>
          </div>
          <span className="sm:ml-auto text-terminal-muted/90 leading-snug">
            tip: <kbd className="text-terminal-text/90">help</kbd> · <kbd className="text-terminal-text/90">hire me</kbd>
          </span>
        </footer>
      </main>

      <HireMeOverlay open={hireMeOpen} onClose={() => setHireMeOpen(false)} />
    </div>
  );
}

/** Lazy-load matrix ASCII bg ONLY when theme is matrix. */
function useMatrixBackground(active: boolean) {
  const [Comp, setComp] = useState<ComponentType | null>(null);
  useEffect(() => {
    let cancelled = false;
    if (!active) {
      setComp(null);
      return;
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    import('../three/AsciiBackground')
      .then((m) => {
        if (!cancelled) setComp(() => m.AsciiBackground);
      })
      .catch(() => {
        // module/dep missing — silently fall back
      });
    return () => {
      cancelled = true;
    };
  }, [active]);
  return Comp ? <Comp /> : null;
}
