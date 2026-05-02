import { memo, useMemo } from 'react';

interface Chip {
  label: string;
  command: string;
  hint?: string;
}

interface Props {
  chips?: Chip[];
  onRun: (command: string) => void;
}

const DEFAULT_CHIPS: Chip[] = [
  { label: 'about', command: 'about' },
  { label: 'projects', command: 'projects' },
  { label: 'experience', command: 'experience' },
  { label: 'skills', command: 'skills' },
  { label: 'hire me', command: 'hire me', hint: '★' },
  { label: 'secret', command: 'secret', hint: '?' },
  { label: 'theme matrix', command: 'theme matrix' },
  { label: 'sound on', command: 'sound on' },
  { label: 'help', command: 'help' },
];

export const SuggestionChips = memo(function SuggestionChips({ chips, onRun }: Props) {
  const list = useMemo(() => chips ?? DEFAULT_CHIPS, [chips]);
  return (
    <div
      className="flex flex-nowrap sm:flex-wrap gap-2 py-2 overflow-x-auto sm:overflow-visible overscroll-x-contain touch-pan-x pb-2 sm:pb-2 -mx-1 px-1 sm:mx-0 sm:px-0 [scrollbar-width:thin]"
      role="toolbar"
      aria-label="Suggested commands"
    >
      <span className="text-terminal-muted text-xs self-center mr-1 shrink-0 select-none pt-1 sm:pt-0">
        try:
      </span>
      {list.map((c) => (
        <button
          key={c.command}
          type="button"
          className="chip shrink-0"
          onClick={() => onRun(c.command)}
          aria-label={`Run command: ${c.command}`}
        >
          <span>{c.label}</span>
          {c.hint && <kbd>{c.hint}</kbd>}
        </button>
      ))}
    </div>
  );
});
