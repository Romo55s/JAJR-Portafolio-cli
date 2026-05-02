import { banners } from './asciiBanners';

/** Inner width between │ │ — matches `banners.envelope` frame. */
export const HIRE_ME_INNER_W = 35;

const GUTTER = '  ';
const TOP = `${GUTTER}┌${'─'.repeat(HIRE_ME_INNER_W)}┐`;
const BOT = `${GUTTER}└${'─'.repeat(HIRE_ME_INNER_W)}┘`;

function row(inner: string): string {
  const chars = Array.from(inner.normalize('NFC'));
  const core = chars.slice(0, HIRE_ME_INNER_W).join('').padEnd(HIRE_ME_INNER_W, ' ');
  return `${GUTTER}│${core}│`;
}

function box(lines: string[]): string {
  return [TOP, ...lines.map(row), BOT].join('\n');
}

const W = HIRE_ME_INNER_W;

/**
 * Montage frames: sealed → decrypt HUD → flap opening → final letter (same as envelope).
 */
export const hireMeAsciiStages: readonly string[] = [
  banners.envelopeClosed.trim(),
  box([
    '▓'.repeat(W),
    ' ░░ TLS v1.3 .................. OK ',
    ' ░░ CERT_CHAIN ................ OK ',
    ' ░░ DECRYPT_PAYLOAD.bin ...... RUN ',
    '░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░',
    '░░ [████████████░░░░░░░░░░░░] 62% ░',
  ]),
  box([
    '▒'.repeat(W),
    '         _________________         ',
    '       /                   \\       ',
    '      /     LET US BUILD    \\      ',
    '▒'.repeat(W),
    '      >> FLAP_RELEASE.unlock <<    ',
  ]),
  banners.envelope.trim(),
];

/** Split final envelope for line-by-line GSAP stagger. */
export const hireMeEnvelopeLines = banners.envelope.trim().split('\n');

/** Idle channel strip variants (same visual length in monospace). */
export const hireMeChannelStrip = [
  ' ═══ CHANNEL_OPEN :: AES-GCM :: READY ═══ ',
  ' ░░░ CHANNEL_OPEN :: AES-GCM :: READY ░░░ ',
  ' ─── CHANNEL_OPEN :: AES-GCM :: READY ─── ',
] as const;
