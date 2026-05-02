import { memo, type ReactNode } from 'react';
import type { OutputBlock, Tone } from '../cli/types';
import { profile } from '../content/profile';

const toneClass: Record<Tone, string> = {
  normal: 'text-terminal-text',
  dim: 'text-terminal-muted',
  error: 'text-terminal-error',
  accent: 'text-terminal-accent crt-glow',
  warn: 'text-terminal-warn',
  link: 'text-terminal-link',
};

const URL_RE = /\b(https?:\/\/[^\s)<>"']+)/g;

function renderText(line: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  URL_RE.lastIndex = 0;
  while ((m = URL_RE.exec(line)) !== null) {
    if (m.index > last) parts.push(line.slice(last, m.index));
    parts.push(
      <a
        key={`${m.index}-${m[0]}`}
        href={m[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-terminal-link"
      >
        {m[0]}
      </a>,
    );
    last = m.index + m[0].length;
  }
  if (last < line.length) parts.push(line.slice(last));
  return parts;
}

interface Props {
  block: OutputBlock;
}

export const OutputLine = memo(function OutputLine({ block }: Props) {
  switch (block.kind) {
    case 'echo':
      return (
        <div className="font-mono leading-6 break-words select-text">
          <span className="text-terminal-accent">
            {profile.handle}@{profile.hostname}
          </span>
          <span className="text-terminal-muted">:</span>
          <span className="text-terminal-link">~</span>
          <span className="text-terminal-muted">$ </span>
          <span className="text-terminal-text">{block.input}</span>
        </div>
      );
    case 'text': {
      const cls = toneClass[block.tone ?? 'normal'];
      return (
        <div className={`font-mono leading-6 ${cls} select-text`}>
          {block.lines.map((l, i) => {
            const rendered = renderText(l);
            return (
              <div key={i} className="whitespace-pre-wrap break-words">
                {rendered.length ? rendered : '\u00A0'}
              </div>
            );
          })}
        </div>
      );
    }
    case 'ascii':
      return (
        <pre
          className={`ascii crt-glow select-text ${toneClass[block.tone ?? 'accent']}`}
          aria-hidden="true"
        >
          {block.art}
        </pre>
      );
    case 'react':
      return <div className="font-mono select-text">{block.node}</div>;
  }
});
