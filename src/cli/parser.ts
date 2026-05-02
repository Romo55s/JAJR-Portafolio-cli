import type { Pipeline, ParsedSegment } from './types';

/**
 * Tokenize a single segment respecting double-quoted strings.
 *   foo "bar baz"   -> ['foo', 'bar baz']
 */
function tokenize(segment: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(segment)) !== null) {
    out.push(m[1] !== undefined ? m[1] : m[2]);
  }
  return out;
}

/**
 * Multi-word command map. We resolve commands by *longest match first*
 * so two-word commands like "hire me" win over ambiguous tokens.
 */
const MULTI_WORD = new Set<string>(['hire me']);

function resolveSegment(rawTokens: string[]): ParsedSegment | null {
  if (!rawTokens.length) return null;
  // try 3-, 2-, 1-token commands
  for (let take = Math.min(3, rawTokens.length); take >= 1; take--) {
    const candidate = rawTokens.slice(0, take).join(' ').toLowerCase();
    if (MULTI_WORD.has(candidate) || take === 1) {
      return { name: candidate, args: rawTokens.slice(take) };
    }
  }
  return { name: rawTokens[0].toLowerCase(), args: rawTokens.slice(1) };
}

export function parse(input: string): Pipeline {
  const trimmed = input.trim();
  if (!trimmed) return [];
  // Split on bare ` | ` to allow filenames with pipes inside quotes? KISS.
  const segments = trimmed
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);
  const pipeline: Pipeline = [];
  for (const seg of segments) {
    const tokens = tokenize(seg);
    const resolved = resolveSegment(tokens);
    if (resolved) pipeline.push(resolved);
  }
  return pipeline;
}
