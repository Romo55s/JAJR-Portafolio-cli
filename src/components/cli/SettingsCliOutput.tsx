import type { ThemeName } from '../../store/terminalStore';
import { profile } from '../../content/profile';
import { CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

const THEMES: ThemeName[] = ['green', 'amber', 'mono', 'matrix'];

export function ThemeListOutput({ current }: { current: ThemeName }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Theme</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-text text-xs sm:text-sm m-0 mb-3">
          Active palette:{' '}
          <span className="text-terminal-accent font-semibold">{current}</span>
        </p>
        <p className="text-terminal-muted text-[10px] sm:text-[11px] uppercase tracking-widest mb-2 m-0">Available</p>
        <div className="flex flex-wrap gap-2">
          {THEMES.map((t) => (
            <span
              key={t}
              className={`rounded-md border px-2 py-1 text-xs capitalize ${
                t === current
                  ? 'border-terminal-accent text-terminal-accent bg-terminal-surface/80'
                  : 'border-terminal-border text-terminal-muted bg-terminal-bg/30'
              }`}
            >
              {t}
            </span>
          ))}
        </div>
        <p className="text-terminal-muted text-[10px] sm:text-[11px] mt-3 m-0">
          <span className="text-terminal-accent">&gt;</span> Run{' '}
          <code className="text-terminal-text">theme &lt;name&gt;</code> — matrix adds ASCII ambience.
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function ThemeResultOutput({ next }: { next: ThemeName }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-accent/40">
        <p className="text-terminal-accent text-xs sm:text-sm font-semibold m-0 mb-1 crt-glow">Palette swapped</p>
        <p className="text-terminal-muted text-[11px] sm:text-xs m-0">
          Theme is now <span className="text-terminal-text font-medium">{next}</span>.
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function ThemeErrorOutput({ name, available }: { name: string; available: string }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-error/40 bg-terminal-surface/30">
        <p className="text-terminal-error text-xs sm:text-sm font-semibold m-0 mb-1">Unknown theme</p>
        <p className="text-terminal-muted text-[11px] sm:text-xs m-0 mb-2">
          <span className="text-terminal-text">{name}</span> isn&apos;t installed on this shell.
        </p>
        <p className="text-terminal-muted text-[10px] sm:text-[11px] m-0">
          Pick one: <span className="text-terminal-link break-words">{available}</span>
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function SoundStatusOutput({ on }: { on: boolean }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Sound FX</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-text text-xs sm:text-sm m-0 mb-2">
          Keystroke samples are{' '}
          <span className={on ? 'text-terminal-accent font-semibold' : 'text-terminal-muted font-semibold'}>
            {on ? 'armed' : 'muted'}
          </span>
          .
        </p>
        <p className="text-terminal-muted text-[10px] sm:text-[11px] m-0">
          Toggle with <code className="text-terminal-link">sound on</code> ·{' '}
          <code className="text-terminal-link">sound off</code>.
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function SoundResultOutput({ on }: { on: boolean }) {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-accent/30">
        <p className="text-terminal-accent text-xs sm:text-sm font-medium m-0 crt-glow">
          Sound → {on ? 'on (listen close)' : 'off (quiet mode)'}
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function SoundUsageErrorOutput() {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdInsetPanel className="border-terminal-error/40">
        <p className="text-terminal-error text-xs sm:text-sm m-0">
          Usage: <code className="text-terminal-text">sound &lt;on|off|status&gt;</code>
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function ResumeIntroOutput() {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Résumé</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-text text-xs sm:text-sm m-0 mb-2 leading-relaxed">
          Pulling <span className="text-terminal-link break-all">{profile.links.resume}</span> — your browser should
          save it as <span className="text-terminal-accent font-semibold">JAJR-CSV.pdf</span>.
        </p>
        <p className="text-terminal-muted text-[11px] sm:text-xs m-0">
          No auto-download? Open the URL manually — some mobile browsers gate downloads behind a tap.
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function themeSearchableMirror(): string {
  return ['theme', ...THEMES].join('\n');
}
