/**
 * Subtle keystroke FX synthesized via WebAudio — no asset to fetch, no Howler.
 * 3 short noise blips with random pitch jitter to avoid robotic feel.
 */

let ctx: AudioContext | null = null;
let unlocked = false;
let lastPlay = 0;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  return ctx;
}

export function unlockSound(): void {
  const c = getCtx();
  if (!c) return;
  if (c.state === 'suspended') {
    c.resume().catch(() => {});
  }
  unlocked = true;
}

export function playKey(): void {
  if (!unlocked) return;
  const c = getCtx();
  if (!c) return;
  const now = c.currentTime;
  // throttle to ~30/s max
  if (now - lastPlay < 0.025) return;
  lastPlay = now;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'square';
  osc.frequency.value = 1100 + Math.random() * 600;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.025, now + 0.002);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.05);
}

export function playConfirm(): void {
  const c = getCtx();
  if (!c) return;
  unlockSound();
  const now = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(660, now);
  osc.frequency.linearRampToValueAtTime(990, now + 0.12);
  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.06, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(now);
  osc.stop(now + 0.22);
}
