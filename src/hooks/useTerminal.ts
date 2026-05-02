import { useEffect, useMemo, useRef } from 'react';
import { Executor } from '../cli/executor';
import { useTerminalStore } from '../store/terminalStore';
import { registerCommands } from '../cli/commands';
import type { UiEvent } from '../cli/types';
import { bindSessionEnd } from '../lib/analytics';

export function useTerminal() {
  const setHireMeOpen = useTerminalStore((s) => s.setHireMeOpen);
  const clearOutput = useTerminalStore((s) => s.clearOutput);
  const setTheme = useTerminalStore((s) => s.setTheme);
  const setSound = useTerminalStore((s) => s.setSound);

  // register commands once
  const initRef = useRef(false);
  if (!initRef.current) {
    registerCommands();
    initRef.current = true;
  }

  useEffect(() => {
    bindSessionEnd();
  }, []);

  const onUiEvent = useMemo(
    () => (e: UiEvent) => {
      switch (e.kind) {
        case 'open-hire-me':
          setHireMeOpen(true);
          break;
        case 'clear':
          clearOutput();
          break;
        case 'theme':
          setTheme(e.name);
          break;
        case 'sound':
          setSound(e.on);
          break;
      }
    },
    [clearOutput, setHireMeOpen, setSound, setTheme],
  );

  const executor = useMemo(() => new Executor({ onUiEvent }), [onUiEvent]);

  return { executor };
}
