/**
 * Lightweight matrix-style ASCII rain rendered to a <canvas>.
 * Note: despite the folder name, this stays canvas-only by default to keep
 * the bundle thin. Three.js is listed as a peer for future ASCIIEffect work
 * but we don't depend on it at runtime.
 */
import { useEffect, useRef } from 'react';

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    const fontSize = 14;
    ctx.font = `${fontSize}px "JetBrains Mono", monospace`;
    let columns = Math.floor(width / fontSize);
    let drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -50);
    const charset =
      'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎ0123456789ABCDEF$#@%&*+-=<>'.split('');

    let last = 0;
    const FPS = 30;
    const interval = 1000 / FPS;

    function tick(now: number) {
      const elapsed = now - last;
      if (elapsed >= interval) {
        last = now - (elapsed % interval);
        ctx!.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx!.fillRect(0, 0, width, height);

        ctx!.fillStyle = 'rgba(0, 255, 65, 0.55)';
        for (let i = 0; i < drops.length; i++) {
          const ch = charset[Math.floor(Math.random() * charset.length)];
          ctx!.fillText(ch, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i] += 1;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    }

    function onResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
      ctx!.font = `${fontSize}px "JetBrains Mono", monospace`;
      columns = Math.floor(width / fontSize);
      drops = new Array(columns).fill(1).map(() => Math.random() * -50);
    }

    window.addEventListener('resize', onResize);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 opacity-25 pointer-events-none"
    />
  );
}
