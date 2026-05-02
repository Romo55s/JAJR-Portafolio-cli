import type { ReactNode } from 'react';
import type { TerminalActions, TerminalState } from '../store/terminalStore';

export type Tone = 'normal' | 'dim' | 'error' | 'accent' | 'warn' | 'link';

export type OutputBlock =
  | {
      id: string;
      kind: 'echo'; // user input echo, e.g. "tony@portfolio:~$ help"
      input: string;
    }
  | {
      id: string;
      kind: 'text';
      lines: string[];
      tone?: Tone;
      typed?: boolean;
    }
  | {
      id: string;
      kind: 'ascii';
      art: string;
      tone?: Tone;
    }
  | {
      id: string;
      kind: 'react';
      node: ReactNode;
      /** Plain-text mirror so `grep` can filter react blocks too. */
      searchable?: string;
    };

/** Blocks passed to `print` before an `id` is assigned. */
export type OutputBlockInput =
  | {
      kind: 'echo';
      input: string;
    }
  | {
      kind: 'text';
      lines: string[];
      tone?: Tone;
      typed?: boolean;
    }
  | {
      kind: 'ascii';
      art: string;
      tone?: Tone;
    }
  | {
      kind: 'react';
      node: ReactNode;
      /** Plain-text mirror so `grep` can filter react blocks too. */
      searchable?: string;
    };

export interface CommandCtx {
  raw: string;
  args: string[];
  /** Output coming from a previous segment of a `|` pipeline. */
  pipeIn?: OutputBlock[];
  /** Push a block to the output buffer. */
  print: (block: OutputBlockInput) => OutputBlock;
  /** State + actions snapshot. Reads are live via the store. */
  state: TerminalState;
  actions: TerminalActions;
  /** Triggers high-level UI events (e.g. open hire-me overlay). */
  emit: (event: UiEvent) => void;
}

export type UiEvent =
  | { kind: 'open-hire-me' }
  | { kind: 'theme'; name: 'green' | 'amber' | 'mono' | 'matrix' }
  | { kind: 'sound'; on: boolean }
  | { kind: 'clear' };

export interface Command {
  name: string;
  aliases?: string[];
  summary: string;
  usage?: string;
  hidden?: boolean;
  run: (ctx: CommandCtx) => void | Promise<void>;
  /** Tab-complete suggestions for arguments. */
  complete?: (args: string[]) => string[];
}

export interface ParsedSegment {
  name: string;
  args: string[];
}
export type Pipeline = ParsedSegment[];
