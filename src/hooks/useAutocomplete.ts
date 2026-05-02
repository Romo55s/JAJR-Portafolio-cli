import { useCallback } from 'react';
import { registry } from '../cli/registry';
import { parse } from '../cli/parser';

/**
 * Tab-complete:
 *  - if cursor is on the command word, complete from registry vocabulary
 *  - otherwise, ask the resolved command for arg suggestions
 *
 * Single match → autocompletes; multiple → returns list to render.
 */
export function useAutocomplete() {
  return useCallback((input: string): { replacement?: string; matches?: string[] } => {
    const trimmed = input.trimStart();
    if (!trimmed) {
      return { matches: registry.vocabulary().slice(0, 12) };
    }

    // Strip a trailing pipeline segment to operate on the last segment.
    const lastPipe = input.lastIndexOf('|');
    const head = lastPipe >= 0 ? input.slice(0, lastPipe + 1) + ' ' : '';
    const tail = lastPipe >= 0 ? input.slice(lastPipe + 1).trimStart() : input;

    const tokens = tail.split(/\s+/);
    const endsWithSpace = /\s$/.test(tail);

    if (tokens.length === 1 && !endsWithSpace) {
      // command word
      const prefix = tokens[0].toLowerCase();
      const matches = registry.vocabulary(true).filter((n) => n.startsWith(prefix));
      if (matches.length === 1) {
        return { replacement: head + matches[0] + ' ' };
      }
      if (matches.length > 1) return { matches };
      return {};
    }

    const pipeline = parse(tail);
    if (!pipeline.length) return {};
    const seg = pipeline[pipeline.length - 1];
    const cmd = registry.resolve(seg.name);
    const lastArg = endsWithSpace ? '' : (seg.args[seg.args.length - 1] ?? '');
    const candidates =
      cmd?.complete?.(endsWithSpace ? [...seg.args, ''] : seg.args.length ? seg.args : ['']) ?? [];
    const matches = candidates.filter((c) => c.toLowerCase().startsWith(lastArg.toLowerCase()));

    if (matches.length === 1) {
      const newArgs = [...seg.args];
      if (endsWithSpace) newArgs.push(matches[0]);
      else newArgs[newArgs.length - 1] = matches[0];
      const rebuilt = `${seg.name}${newArgs.length ? ' ' + newArgs.join(' ') : ''} `;
      return { replacement: head + rebuilt };
    }
    if (matches.length > 1) return { matches };
    return {};
  }, []);
}
