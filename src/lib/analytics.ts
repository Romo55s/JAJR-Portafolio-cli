import { track } from '@vercel/analytics';

/**
 * Privacy-friendly: we only emit command NAMES (never raw input or args)
 * plus a small set of well-known events. No PII.
 */
export type AnalyticsEvent =
  | { type: 'cmd_run'; name: string }
  | { type: 'cmd_unknown' }
  | { type: 'boot_complete' }
  | { type: 'hire_me_open' }
  | { type: 'email_copy' }
  | { type: 'secret_view' }
  | { type: 'resume_download' }
  | { type: 'theme_change'; name: string }
  | { type: 'sound_toggle'; on: boolean }
  | { type: 'session_end'; durationMs: number; cmdCount: number };

const isProd = import.meta.env.PROD;

export function emit(evt: AnalyticsEvent): void {
  try {
    if (!isProd) {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', evt);
      return;
    }
    const { type, ...rest } = evt;
    track(type, rest as Record<string, string | number | boolean | null>);
  } catch {
    // never let analytics break the app
  }
}

const sessionStart = typeof performance !== 'undefined' ? performance.now() : Date.now();
let cmdCount = 0;

export function bumpCmd(): void {
  cmdCount += 1;
}

export function bindSessionEnd(): void {
  if (typeof window === 'undefined') return;
  const onUnload = () => {
    const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
    emit({ type: 'session_end', durationMs: Math.round(now - sessionStart), cmdCount });
  };
  window.addEventListener('pagehide', onUnload, { once: true });
  window.addEventListener('beforeunload', onUnload, { once: true });
}
