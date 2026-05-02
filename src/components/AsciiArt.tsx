import { memo } from 'react';

interface Props {
  art: string;
  className?: string;
  ariaLabel?: string;
}

export const AsciiArt = memo(function AsciiArt({ art, className, ariaLabel }: Props) {
  return (
    <pre
      className={`ascii crt-glow text-terminal-accent ${className ?? ''}`}
      role="img"
      aria-label={ariaLabel ?? 'ASCII art'}
    >
      {art}
    </pre>
  );
});
