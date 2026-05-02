import { useLayoutEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';

/** Plain-text hook for `experience | grep` (Drupal mark). */
export const DRUPAL_EXPERIENCE_GREP_SNIPPET = [
  'Experience timeline',
  'Drupal Druplicon',
  'Software Engineer',
  'Insulet Corporation',
  '0678be',
  'drupal-blue',
  '∞',
  '· current',
].join('\n');

export const EXPERIENCE_HEADER_GREP_SNIPPET = DRUPAL_EXPERIENCE_GREP_SNIPPET;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export interface DrupalLogoAsciiProps {
  roleTitle: string;
  company: string;
  periodMeta: { range: string; type: string; location: string };
}

const blue = 'text-[color:var(--drupal-blue)]';
const dk = 'text-[color:var(--drupal-blue-dark)]';
const face = 'text-[color:var(--drupal-face)]';

function AnimLine({
  lineRef,
  compact,
  children,
}: {
  lineRef: (el: HTMLDivElement | null) => void;
  compact: boolean;
  children: ReactNode;
}) {
  return (
    <div
      ref={lineRef}
      className={
        compact
          ? 'leading-[1.05] whitespace-pre text-[7px] sm:text-[9px] md:text-[10px] tracking-tight'
          : 'leading-[1.06] whitespace-pre text-[9px] sm:text-[11px] md:text-xs tracking-tight'
      }
    >
      {children}
    </div>
  );
}

/**
 * Druplicon ASCII beside the current role title (Software Engineer — Insulet · current).
 * Text is selectable so users can copy/paste from the terminal.
 */
export function DrupalLogoAscii({ roleTitle, company, periodMeta }: DrupalLogoAsciiProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pulseRef = useRef<gsap.core.Tween | null>(null);

  const setLine =
    (i: number) =>
    (el: HTMLDivElement | null): void => {
      lineRefs.current[i] = el;
    };

  const compact = true;

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const logo = root.querySelector<HTMLElement>('[data-drupal-core]');
    const lines = lineRefs.current.filter(Boolean) as HTMLDivElement[];
    gsap.killTweensOf(lines);
    pulseRef.current?.kill();
    pulseRef.current = null;

    const reduced = prefersReducedMotion();
    if (reduced) {
      gsap.set(lines, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(lines, { opacity: 0, y: 6 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(lines, {
      opacity: 1,
      y: 0,
      duration: 0.32,
      stagger: { each: 0.055, from: 'edges' },
    });

    if (logo) {
      tl.to(
        logo,
        {
          scale: 1.03,
          duration: 0.5,
          ease: 'elastic.out(1, 0.42)',
          transformOrigin: '100% 0%',
        },
        '-=0.18',
      );
    }

    tl.add(() => {
      if (!logo || reduced) return;
      pulseRef.current = gsap.fromTo(
        logo,
        { filter: 'drop-shadow(0 0 0 transparent)' },
        {
          filter: 'drop-shadow(0 0 10px rgba(6, 120, 190, 0.65))',
          duration: 1.15,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        },
      );
    });

    return () => {
      pulseRef.current?.kill();
      pulseRef.current = null;
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full min-w-0 overflow-x-auto select-text cursor-text [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      <div className="flex min-w-0 w-full flex-col gap-5 items-stretch sm:flex-row sm:items-start sm:gap-8 sm:justify-between">
        <article className="relative order-1 min-w-0 w-full max-w-[min(100%,22rem)] sm:max-w-none sm:flex-1 sm:basis-[min(100%,18rem)] pt-5 pl-3 sm:pl-4 border-l-[3px] border-terminal-accent/80 border-t border-dashed border-terminal-border font-mono leading-6 select-text text-left">
          <header className="space-y-1.5">
            <div className="text-sm sm:text-base leading-snug break-words">
              <span className="text-terminal-accent" aria-hidden>
                ▌
              </span>{' '}
              <span className="text-terminal-text font-semibold">{roleTitle}</span>
              <span className="text-terminal-muted"> — </span>
              <span className="text-terminal-link">{company}</span>
              <span className="text-terminal-muted"> · </span>
              <span className="text-terminal-warn text-[10px] uppercase tracking-widest font-semibold">
                current
              </span>
            </div>
            <div className="text-[11px] sm:text-sm leading-relaxed">
              <span className="text-terminal-link tabular-nums font-medium">{periodMeta.range}</span>
              <span className="text-terminal-muted">
                {' '}
                · {periodMeta.type} · {periodMeta.location}
              </span>
            </div>
          </header>
          <div className="text-[color:var(--drupal-blue-light)] text-[10px] sm:text-[11px] opacity-95 pt-2">
            Drupal @ {company}
          </div>
        </article>

        <div
          data-drupal-core
          className="shrink-0 origin-top-right will-change-transform select-text self-end sm:self-auto order-2"
          aria-label="Drupal Druplicon ASCII art"
        >
          <AnimLine compact={compact} lineRef={setLine(0)}>
            <span className={dk}>{'                ░                '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(1)}>
            <span className={blue}>{'               ███               '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(2)}>
            <span className={blue}>{'              █████              '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(3)}>
            <span className={blue}>{'             ██▓▓▓██             '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(4)}>
            <span className={blue}>{'            ██▓▓▓▓▓██            '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(5)}>
            <span className={blue}>{'           ██░░░░░░░██           '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(6)}>
            <span className={blue}>{'          ██░'}</span>
            <span className={face}>{'∞'}</span>
            <span className={face}>{'∞'}</span>
            <span className={blue}>{'░░'}</span>
            <span className={face}>{'∞'}</span>
            <span className={face}>{'∞'}</span>
            <span className={blue}>{'░██        '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(7)}>
            <span className={blue}>{'          ██░'}</span>
            <span className={face}>{' · '}</span>
            <span className={face}>{'‿'}</span>
            <span className={face}>{' · '}</span>
            <span className={blue}>{'░░██          '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(8)}>
            <span className={blue}>{'           ██░░░░░░░██           '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(9)}>
            <span className={dk}>{'            ██████████           '}</span>
          </AnimLine>
          <AnimLine compact={compact} lineRef={setLine(10)}>
            <span className={blue}>{'             ████████             '}</span>
          </AnimLine>
        </div>
      </div>
    </div>
  );
}
