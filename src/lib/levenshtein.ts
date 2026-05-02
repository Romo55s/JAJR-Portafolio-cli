/**
 * Classic Levenshtein distance for "did you mean" suggestions.
 * Iterative two-row DP, O(n*m) time, O(min(n,m)) space.
 */
export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  if (a.length < b.length) {
    [a, b] = [b, a];
  }

  let prev: number[] = new Array<number>(b.length + 1);
  let curr: number[] = new Array<number>(b.length + 1);

  for (let j = 0; j <= b.length; j++) prev[j] = j;

  for (let i = 1; i <= a.length; i++) {
    curr[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a.charCodeAt(i - 1) === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost,
      );
    }
    [prev, curr] = [curr, prev];
  }

  return prev[b.length];
}

export function nearest(input: string, candidates: string[], maxDistance = 3): string | null {
  let best: { name: string; d: number } | null = null;
  const lower = input.toLowerCase();
  for (const c of candidates) {
    const d = levenshtein(lower, c.toLowerCase());
    if (d <= maxDistance && (!best || d < best.d)) best = { name: c, d };
  }
  return best?.name ?? null;
}
