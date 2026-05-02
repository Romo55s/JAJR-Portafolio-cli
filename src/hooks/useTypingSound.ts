import { useCallback } from 'react';
import { useTerminalStore } from '../store/terminalStore';
import { playKey, unlockSound } from '../lib/sound';

export function useTypingSound() {
  const soundOn = useTerminalStore((s) => s.soundOn);
  return useCallback(() => {
    if (!soundOn) return;
    unlockSound();
    playKey();
  }, [soundOn]);
}
