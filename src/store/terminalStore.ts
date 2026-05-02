import { create } from 'zustand';
import type { OutputBlock } from '../cli/types';
import { storage } from '../lib/storage';

export type ThemeName = 'green' | 'amber' | 'mono' | 'matrix';

export interface TerminalState {
  output: OutputBlock[];
  history: string[];
  historyIndex: number; // -1 = not navigating
  draft: string; // saved current input while navigating history
  theme: ThemeName;
  soundOn: boolean;
  booted: boolean;
  hireMeOpen: boolean;
}

export interface TerminalActions {
  appendOutput: (blocks: OutputBlock[]) => void;
  clearOutput: () => void;
  pushHistory: (line: string) => void;
  setHistoryIndex: (idx: number) => void;
  setDraft: (s: string) => void;
  setTheme: (t: ThemeName) => void;
  setSound: (on: boolean) => void;
  setBooted: (b: boolean) => void;
  setHireMeOpen: (open: boolean) => void;
}

export type TerminalStore = TerminalState & TerminalActions;

const persistedTheme = storage.get<ThemeName>('theme', 'green');
const persistedSound = storage.get<boolean>('sound', false);
const persistedHistory = storage.get<string[]>('history', []);

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  output: [],
  history: persistedHistory,
  historyIndex: -1,
  draft: '',
  theme: persistedTheme,
  soundOn: persistedSound,
  booted: false,
  hireMeOpen: false,

  appendOutput: (blocks) => set({ output: [...get().output, ...blocks] }),
  clearOutput: () => set({ output: [] }),

  pushHistory: (line) => {
    const trimmed = line.trim();
    if (!trimmed) return;
    const prev = get().history;
    const last = prev[prev.length - 1];
    const next = last === trimmed ? prev : [...prev, trimmed].slice(-200);
    storage.set('history', next);
    set({ history: next, historyIndex: -1, draft: '' });
  },

  setHistoryIndex: (idx) => set({ historyIndex: idx }),
  setDraft: (s) => set({ draft: s }),
  setTheme: (t) => {
    storage.set('theme', t);
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', t);
    }
    set({ theme: t });
  },
  setSound: (on) => {
    storage.set('sound', on);
    set({ soundOn: on });
  },
  setBooted: (b) => set({ booted: b }),
  setHireMeOpen: (open) => set({ hireMeOpen: open }),
}));

// Apply persisted theme to <html data-theme> on module load (client only).
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', persistedTheme);
}
