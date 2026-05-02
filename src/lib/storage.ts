const NS = 'tonyromo:cli:v1';

export const storage = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const raw = window.localStorage.getItem(`${NS}:${key}`);
      return raw == null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
    } catch {
      // quota exceeded or disabled — silently ignore
    }
  },
  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(`${NS}:${key}`);
    } catch {
      // ignore
    }
  },
};
