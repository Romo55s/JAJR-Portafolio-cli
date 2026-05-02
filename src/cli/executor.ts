import type { CommandCtx, OutputBlock, Pipeline, UiEvent } from './types';
import { registry } from './registry';
import { parse } from './parser';
import { useTerminalStore, type TerminalActions, type TerminalState } from '../store/terminalStore';
import { emit, bumpCmd } from '../lib/analytics';

let blockSeq = 0;
function nextId(): string {
  blockSeq += 1;
  return `b_${Date.now().toString(36)}_${blockSeq}`;
}

function makePrint(buffer: OutputBlock[]) {
  return (block: Omit<OutputBlock, 'id'>): OutputBlock => {
    const full = { ...block, id: nextId() } as OutputBlock;
    buffer.push(full);
    return full;
  };
}

interface ExecutorOpts {
  onUiEvent: (e: UiEvent) => void;
}

export class Executor {
  constructor(private opts: ExecutorOpts) {}

  /** Run a single user-typed line, push echo + outputs, update history. */
  async runLine(input: string): Promise<void> {
    const store = useTerminalStore.getState();
    const trimmed = input.trim();

    const echo: OutputBlock = {
      id: nextId(),
      kind: 'echo',
      input: trimmed || '',
    };
    store.appendOutput([echo]);

    if (!trimmed) return;

    store.pushHistory(trimmed);
    const pipeline: Pipeline = parse(trimmed);
    if (!pipeline.length) return;

    let pipeIn: OutputBlock[] | undefined;

    for (let i = 0; i < pipeline.length; i++) {
      const seg = pipeline[i];
      const cmd = registry.resolve(seg.name);
      const isLast = i === pipeline.length - 1;
      const localBuffer: OutputBlock[] = [];

      if (!cmd) {
        const suggestion = registry.suggest(seg.name);
        const lines = [
          `command not found: ${seg.name}`,
          ...(suggestion ? [`did you mean: \`${suggestion}\`?`] : ['type `help` to list commands.']),
        ];
        const block: OutputBlock = { id: nextId(), kind: 'text', lines, tone: 'error' };
        localBuffer.push(block);
        emit({ type: 'cmd_unknown' });
      } else {
        const stateSnapshot: TerminalState = useTerminalStore.getState();
        const actions: TerminalActions = useTerminalStore.getState();
        const ctx: CommandCtx = {
          raw: trimmed,
          args: seg.args,
          pipeIn,
          print: makePrint(localBuffer),
          state: stateSnapshot,
          actions,
          emit: this.opts.onUiEvent,
        };
        try {
          await cmd.run(ctx);
        } catch (err) {
          // Defensive: never let a command crash the terminal.
          // eslint-disable-next-line no-console
          console.error(`Command "${cmd.name}" threw`, err);
          localBuffer.push({
            id: nextId(),
            kind: 'text',
            lines: [`error: command "${cmd.name}" failed.`],
            tone: 'error',
          });
        }
        bumpCmd();
        emit({ type: 'cmd_run', name: cmd.name });
      }

      if (isLast) {
        if (localBuffer.length) store.appendOutput(localBuffer);
      } else {
        // Pipe forward only — don't render intermediate stages.
        pipeIn = localBuffer;
      }
    }
  }
}
