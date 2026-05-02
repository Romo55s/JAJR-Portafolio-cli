import { useCallback } from 'react';
import { useTerminalStore } from '../store/terminalStore';

export function useCommandHistory(setInput: (s: string) => void) {
  const { history, historyIndex, setHistoryIndex, draft, setDraft } = useTerminalStore();

  const up = useCallback(() => {
    if (!history.length) return;
    if (historyIndex === -1) {
      // Save current draft so we can restore it.
      // The caller passes input so we know what's there.
      setHistoryIndex(history.length - 1);
      setInput(history[history.length - 1]);
      return;
    }
    if (historyIndex > 0) {
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(history[next]);
    }
  }, [history, historyIndex, setHistoryIndex, setInput]);

  const down = useCallback(() => {
    if (historyIndex === -1) return;
    if (historyIndex >= history.length - 1) {
      setHistoryIndex(-1);
      setInput(draft);
      return;
    }
    const next = historyIndex + 1;
    setHistoryIndex(next);
    setInput(history[next]);
  }, [draft, history, historyIndex, setHistoryIndex, setInput]);

  const beginNavigation = useCallback(
    (currentInput: string) => {
      if (historyIndex === -1) setDraft(currentInput);
    },
    [historyIndex, setDraft],
  );

  const reset = useCallback(() => {
    setHistoryIndex(-1);
    setDraft('');
  }, [setDraft, setHistoryIndex]);

  return { up, down, beginNavigation, reset };
}
