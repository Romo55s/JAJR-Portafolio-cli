import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  hireMeAsciiStages,
  hireMeEnvelopeLines,
  hireMeChannelStrip,
} from '../content/hireMeAscii';

interface Props {
  /** Overlay is open — run sequence when true. */
  active: boolean;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function HireMeAsciiAnimation({ active }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const montageRef = useRef<HTMLPreElement>(null);
  const finalRef = useRef<HTMLPreElement>(null);
  const channelRef = useRef<HTMLPreElement>(null);
  const pulseRef = useRef<gsap.core.Tween | null>(null);
  const stripRef = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    if (!active) return;

    const montage = montageRef.current;
    const finalPre = finalRef.current;
    const channel = channelRef.current;
    const root = wrapRef.current;
    if (!montage || !finalPre || !channel || !root) return;

    const reduced = prefersReducedMotion();
    const stages = hireMeAsciiStages;

    gsap.killTweensOf([montage, finalPre, channel, '.hire-line-inner']);
    pulseRef.current?.kill();
    stripRef.current?.kill();
    pulseRef.current = null;
    stripRef.current = null;

    let stripCancelled = false;

    if (reduced) {
      montage.textContent = stages[stages.length - 1];
      gsap.set(montage, { opacity: 1, display: 'block', x: 0, skewX: 0, scale: 1 });
      gsap.set(finalPre, { opacity: 0, display: 'none' });
      channel.textContent = hireMeChannelStrip[0];
      gsap.set(channel, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      montage.textContent = stages[0];
      montage.style.display = 'block';
      finalPre.style.display = 'none';

      gsap.set(montage, { opacity: 1, x: 0, skewX: 0, scale: 1 });
      gsap.set(finalPre, { opacity: 0 });
      gsap.set(channel, { opacity: 0 });

      const inners = finalPre.querySelectorAll<HTMLElement>('.hire-line-inner');
      gsap.set(inners, { yPercent: 110, opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: () => {
          pulseRef.current?.kill();
          pulseRef.current = gsap.fromTo(
            finalPre,
            { textShadow: '0 0 0 transparent' },
            {
              textShadow: '0 0 14px var(--term-accent)',
              duration: 1.15,
              yoyo: true,
              repeat: -1,
              ease: 'sine.inOut',
            },
          );

          let i = 0;
          const cycle = () => {
            if (stripCancelled) return;
            channel.textContent = hireMeChannelStrip[i % hireMeChannelStrip.length];
            i += 1;
            stripRef.current?.kill();
            stripRef.current = gsap.delayedCall(0.48, cycle);
          };

          gsap.to(channel, {
            opacity: 1,
            duration: 0.22,
            onComplete: () => cycle(),
          });
        },
      });

      tl.to(montage, { x: 5, duration: 0.04, repeat: 9, yoyo: true, ease: 'none' }).to(
        montage,
        { x: 0, duration: 0.05 },
      );

      for (let s = 1; s < stages.length - 1; s++) {
        tl.call(() => {
          montage.textContent = stages[s];
        })
          .fromTo(
            montage,
            { skewX: -6, opacity: 0.15 },
            { skewX: 0, opacity: 1, duration: 0.11, ease: 'power3.out' },
          )
          .to({}, { duration: s === 1 ? 0.36 : 0.26 });
      }

      tl.to(montage, {
        scale: 1.04,
        duration: 0.07,
        yoyo: true,
        repeat: 5,
        ease: 'power1.inOut',
      })
        .to(montage, {
          opacity: 0,
          scale: 0.94,
          duration: 0.18,
          ease: 'power2.in',
          onComplete: () => {
            montage.style.display = 'none';
          },
        })
        .set(finalPre, { display: 'block', opacity: 1 })
        .fromTo(
          inners,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.32,
            stagger: 0.055,
            ease: 'power4.out',
          },
        );
    }, root);

    return () => {
      stripCancelled = true;
      stripRef.current?.kill();
      stripRef.current = null;
      pulseRef.current?.kill();
      pulseRef.current = null;
      ctx.revert();
    };
  }, [active]);

  return (
    <div ref={wrapRef} className="mb-4 select-text cursor-text">
      <div className="relative min-h-[11.25rem] sm:min-h-[12rem]">
        <pre
          ref={montageRef}
          className="ascii text-terminal-accent crt-glow text-[10px] sm:text-xs md:text-sm absolute left-0 right-0 top-0 z-10 whitespace-pre leading-tight"
          aria-hidden="true"
        >
          {hireMeAsciiStages[0]}
        </pre>
        <pre
          ref={finalRef}
          className="ascii text-terminal-accent crt-glow text-[10px] sm:text-xs md:text-sm absolute left-0 right-0 top-0 z-20 whitespace-pre leading-tight opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          {hireMeEnvelopeLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span className="hire-line-inner inline-block">{line || '\u00A0'}</span>
            </span>
          ))}
        </pre>
      </div>
      <pre
        ref={channelRef}
        className="ascii text-terminal-muted text-[9px] sm:text-[10px] mt-2 text-center whitespace-pre overflow-x-auto min-h-[1.25em]"
        aria-hidden="true"
      >
        {' '}
      </pre>
    </div>
  );
}
