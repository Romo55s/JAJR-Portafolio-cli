import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { banners } from '../content/asciiBanners';
import { profile } from '../content/profile';
import { emit } from '../lib/analytics';

interface Props {
  onDone: () => void;
}

/** Target wall-clock time for the full boot animation (before CLI unlock). */
const BOOT_TOTAL_SEC = 5;
/** Pause on the final frame so the boot doesn’t cut off abruptly. */
const BOOT_HOLD_SEC = 0.85;
/** Per-line fade/slide duration (stagger distributes the rest of reveal budget). */
const BOOT_LINE_DURATION_SEC = 0.48;

const BOOT_LOG = [
  '[ OK ] Mounting /home/tony ...',
  '[ OK ] Loading kernel: tony-curiosity 6.6.lts',
  '[ OK ] Initializing display: 80x24 monospace ...',
  '[ OK ] Scanning memory modules ...',
  '[ OK ] Importing skills/* ... 14 modules',
  '[ OK ] Linking Drupal toolchain ...',
  '[ OK ] Connecting to Insulet Drupal cluster ... ok',
  '[ OK ] Verifying TLS certificates ...',
  '[ OK ] Hydrating route manifest ...',
  '[ OK ] Prefetching critical glyphs ...',
  '[ OK ] Calibrating CRT phosphor timing ...',
  '[ OK ] Boot sequence complete.',
  '',
  '> Type `help` to begin · Click a chip if you prefer to browse.',
];

const MD_FULL_BANNER_MQ = '(min-width: 768px)';
const SM_SUBTLE_BREATH_MQ = '(max-width: 639px)';

function subscribeBannerMode(cb: () => void): () => void {
  const mql = window.matchMedia(MD_FULL_BANNER_MQ);
  mql.addEventListener('change', cb);
  return () => mql.removeEventListener('change', cb);
}

function getBannerModeSnapshot(): 'full' | 'compact' {
  return window.matchMedia(MD_FULL_BANNER_MQ).matches ? 'full' : 'compact';
}

function getBannerModeServerSnapshot(): 'full' | 'compact' {
  return 'compact';
}

function breathScaleMax(): number {
  if (typeof window === 'undefined') return 1.02;
  return window.matchMedia(SM_SUBTLE_BREATH_MQ).matches ? 1.006 : 1.02;
}

export function BootSequence({ onDone }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const [skipped, setSkipped] = useState(false);
  const bannerMode = useSyncExternalStore(
    subscribeBannerMode,
    getBannerModeSnapshot,
    getBannerModeServerSnapshot,
  );
  const bannerArt = bannerMode === 'full' ? banners.tonyRomo : banners.tonyRomoCompact;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const banner = container.querySelector<HTMLElement>('[data-boot-banner]');
    const lines = container.querySelectorAll<HTMLElement>('[data-boot-line]:not([data-boot-banner])');

    if (!banner || !lines.length) return;

    let breathTween: gsap.core.Animation | null = null;

    if (reduceMotion || skipped) {
      lines.forEach((l) => {
        l.style.opacity = '1';
        l.style.transform = 'none';
      });
      gsap.set(banner, { opacity: 1, y: 0, scale: 1 });
      const t = window.setTimeout(() => {
        emit({ type: 'boot_complete' });
        onDone();
      }, 200);
      return () => {
        window.clearTimeout(t);
      };
    }

    gsap.set(banner, { transformOrigin: '50% 0%', opacity: 0, y: 12, scale: 0.985 });

    const n = lines.length;
    const revealBudget = Math.max(0.5, BOOT_TOTAL_SEC - BOOT_HOLD_SEC);
    const stagger =
      n > 1
        ? Math.max(0.06, (revealBudget - BOOT_LINE_DURATION_SEC) / (n - 1))
        : 0;

    const breathPeak = breathScaleMax();

    const tl = gsap.timeline({
      onComplete: () => {
        breathTween?.kill();
        breathTween = null;
        gsap.to(banner, {
          scale: 1,
          duration: 0.35,
          ease: 'power2.out',
        });
        emit({ type: 'boot_complete' });
        onDone();
      },
    });

    tl.fromTo(
      banner,
      { opacity: 0, y: 12, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.52,
        ease: 'power3.out',
        onComplete: () => {
          breathTween?.kill();
          breathTween = gsap.to(banner, {
            scale: breathPeak,
            duration: 1.85,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        },
      },
    );

    tl.fromTo(
      lines,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: BOOT_LINE_DURATION_SEC,
        stagger,
        ease: 'power3.out',
      },
      '-=0.28',
    );
    tl.to({}, { duration: BOOT_HOLD_SEC });

    return () => {
      breathTween?.kill();
      tl.kill();
    };
  }, [onDone, reduceMotion, skipped, bannerArt]);

  const bannerPreClass =
    bannerMode === 'compact'
      ? 'ascii crt-glow text-terminal-accent text-[6px] sm:text-[8px] leading-[1.05] tracking-tight whitespace-pre will-change-transform inline-block min-w-max max-w-none'
      : 'ascii crt-glow text-terminal-accent text-[9px] sm:text-xs md:text-sm lg:text-base leading-[1.05] whitespace-pre will-change-transform inline-block min-w-max max-w-none';

  return (
    <div
      ref={containerRef}
      className="font-mono select-none min-w-0 w-full max-w-full space-y-2"
      aria-busy="true"
    >
      <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch]">
        <pre data-boot-line data-boot-banner className={bannerPreClass}>
          {bannerArt}
        </pre>
      </div>

      <div
        data-boot-line
        className="text-terminal-muted text-[11px] leading-snug sm:text-sm mb-1 w-full min-w-0 max-w-full break-words hyphens-auto"
      >
        {profile.headline} · {profile.location}
      </div>

      <div className="w-full min-w-0 overflow-x-auto overscroll-x-contain touch-pan-x [-webkit-overflow-scrolling:touch] space-y-0.5 pb-0.5">
        {BOOT_LOG.map((l, i) => (
          <div
            key={i}
            data-boot-line
            className={
              l.startsWith('[ OK ]')
                ? 'text-terminal-text text-[10px] sm:text-xs leading-snug whitespace-pre'
                : l.startsWith('>')
                  ? 'text-terminal-accent text-[10px] sm:text-xs leading-snug whitespace-pre-wrap break-words'
                  : 'text-terminal-muted text-[10px] sm:text-xs whitespace-pre'
            }
          >
            {l || '\u00A0'}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setSkipped(true)}
        className="mt-2 touch-manipulation text-xs text-terminal-muted underline-offset-2 hover:underline py-2 sm:py-0"
        aria-label="Skip boot animation"
      >
        [skip]
      </button>
    </div>
  );
}

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduce(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduce(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);
  return reduce;
}
