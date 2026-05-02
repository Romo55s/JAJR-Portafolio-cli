import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { profile } from '../content/profile';
import { copyToClipboard } from '../lib/clipboard';
import { emit } from '../lib/analytics';
import { playConfirm } from '../lib/sound';
import { HireMeAsciiAnimation } from './HireMeAsciiAnimation';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function HireMeOverlay({ open, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    const card = cardRef.current;
    if (!overlay || !card) return;

    const tl = gsap.timeline();
    tl.set(overlay, { opacity: 0, pointerEvents: 'auto' })
      .set(card, { y: 24, opacity: 0, scale: 0.97 })
      .to(overlay, { opacity: 1, duration: 0.18, ease: 'power2.out' })
      .to(card, { y: 0, opacity: 1, scale: 1, duration: 0.32, ease: 'power3.out' }, '<');

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      tl.kill();
    };
  }, [onClose, open]);

  if (!open) return null;

  const handleCopy = async () => {
    const ok = await copyToClipboard(profile.email);
    if (ok) {
      setCopied(true);
      playConfirm();
      emit({ type: 'email_copy' });
      window.setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]"
      role="dialog"
      aria-modal="true"
      aria-label="Hire me"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-xl max-h-[min(calc(100dvh-2rem),720px)] overflow-y-auto overscroll-contain bg-terminal-surface border border-terminal-border rounded-lg p-5 sm:p-8 shadow-terminal"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-terminal-muted hover:text-terminal-accent w-8 h-8 rounded border border-terminal-border"
          aria-label="Close"
        >
          ✕
        </button>

        <HireMeAsciiAnimation active={open} />

        <h2 className="font-mono text-terminal-accent text-lg mb-1">
          {'>'} let&apos;s build something.
        </h2>
        <p className="font-mono text-terminal-text text-sm mb-5">
          I&apos;m open to <strong className="text-terminal-accent">full-time SWE roles</strong>{' '}
          and <strong className="text-terminal-accent">freelance React/Node projects</strong>.
        </p>

        <div className="font-mono text-sm mb-5 break-all">
          <div className="text-terminal-muted">email:</div>
          <div className="text-terminal-text text-base">{profile.email}</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="chip flex-1 justify-center"
            aria-label="Copy email to clipboard"
          >
            {copied ? '✓ copied' : 'Copy email'}
          </button>
          <a
            href={`mailto:${profile.email}?subject=Let%27s%20work%20together`}
            className="chip flex-1 justify-center"
            onClick={() => emit({ type: 'email_copy' })}
          >
            Email me
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="chip flex-1 justify-center"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="chip">
            GitHub · Romo55s
          </a>
          <a
            href={profile.links.booking}
            target="_blank"
            rel="noopener noreferrer"
            className="chip"
          >
            Schedule a call
          </a>
          <a href={profile.links.resume} className="chip" download="JAJR-CSV.pdf">
            Download resume
          </a>
        </div>

        <p className="mt-5 font-mono text-xs text-terminal-muted">
          press <kbd className="px-1 border border-terminal-border rounded">Esc</kbd> to close ·
          tip: <code className="text-terminal-accent">git log</code>,{' '}
          <code className="text-terminal-accent">npm run career</code>,{' '}
          <code className="text-terminal-accent">theme matrix</code>
        </p>
      </div>
    </div>
  );
}
