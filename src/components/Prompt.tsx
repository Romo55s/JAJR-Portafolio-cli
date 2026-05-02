import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { profile } from '../content/profile';
import { useCommandHistory } from '../hooks/useCommandHistory';
import { useAutocomplete } from '../hooks/useAutocomplete';
import { useTypingSound } from '../hooks/useTypingSound';

interface Props {
  onSubmit: (line: string) => void;
  onSuggestions?: (matches: string[]) => void;
  disabled?: boolean;
  /** Imperative input setter for click-to-run from chips. */
  registerSetInput?: (set: (s: string) => void) => void;
  /** Imperative focus method. */
  registerFocus?: (focus: () => void) => void;
}

export function Prompt({
  onSubmit,
  onSuggestions,
  disabled,
  registerSetInput,
  registerFocus,
}: Props) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const history = useCommandHistory(setValue);
  const autocomplete = useAutocomplete();
  const typingSound = useTypingSound();

  useEffect(() => {
    if (registerSetInput) registerSetInput(setValue);
    if (registerFocus) registerFocus(() => inputRef.current?.focus());
  }, [registerFocus, registerSetInput]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const line = value;
      setValue('');
      history.reset();
      onSubmit(line);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      history.beginNavigation(value);
      history.up();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      history.down();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      const r = autocomplete(value);
      if (r.replacement !== undefined) setValue(r.replacement);
      else if (r.matches?.length) onSuggestions?.(r.matches);
      return;
    }
    if (e.key === 'l' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onSubmit('clear');
      setValue('');
      return;
    }
    if (e.key === 'c' && e.ctrlKey) {
      e.preventDefault();
      onSubmit('');
      setValue('');
    }
  };

  return (
    <div
      className="flex flex-col gap-2 sm:flex-row sm:items-baseline font-mono leading-6 cursor-text touch-manipulation"
      onPointerUp={() => inputRef.current?.focus()}
    >
      <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 text-[11px] sm:text-sm shrink-0 max-w-full">
        <span className="text-terminal-accent truncate max-[380px]:max-w-[11rem]">
          {profile.handle}@{profile.hostname}
        </span>
        <span className="text-terminal-muted select-none">:</span>
        <span className="text-terminal-link select-none">~</span>
        <span className="text-terminal-muted select-none">$</span>
      </div>

      <div className="relative flex-1 min-w-0 w-full sm:w-auto min-h-[2.75rem] sm:min-h-0 flex items-center border-t border-terminal-border/40 pt-2 sm:border-t-0 sm:pt-0">
        {/* Hidden mirror to measure typed-text width for the block caret */}
        <span
          ref={measureRef}
          className="invisible whitespace-pre absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none text-base sm:text-sm leading-6"
          aria-hidden="true"
        >
          {value || ' '}
        </span>

        <input
          ref={inputRef}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            typingSound();
          }}
          onKeyDown={handleKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          disabled={disabled}
          autoFocus
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          inputMode="text"
          enterKeyHint="send"
          className="block w-full bg-transparent outline-none border-none text-terminal-text text-base sm:text-sm leading-6 py-1"
          aria-label="Terminal input"
        />

        {focused && !value && (
          <span
            className="term-cursor absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}
