import { profile } from '../../content/profile';
import { CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

export function WhoamiOutput() {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Identity</CmdSectionTitle>
      <CmdInsetPanel>
        <p className="text-terminal-accent text-sm sm:text-base font-semibold m-0 mb-2 crt-glow">
          {profile.name}
        </p>
        <p className="text-terminal-text text-xs sm:text-sm leading-snug m-0 mb-2 font-medium">
          {profile.headline}
        </p>
        <p className="text-terminal-muted text-[11px] sm:text-xs m-0">
          <span className="text-terminal-link">{profile.location}</span>
          <span className="text-terminal-muted"> · </span>
          <span>{profile.status}</span>
        </p>
      </CmdInsetPanel>
    </div>
  );
}

export function whoamiSearchableMirror(): string {
  return [profile.name, profile.headline, profile.location, profile.status].join('\n');
}

export function ContactOutput() {
  const rows: { label: string; value: string; href?: string }[] = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'LinkedIn', value: profile.links.linkedin, href: profile.links.linkedin },
    { label: 'GitHub', value: profile.links.github, href: profile.links.github },
    { label: 'Schedule', value: profile.links.booking, href: profile.links.booking },
    {
      label: 'Résumé',
      value: `${profile.links.resume} (PDF)`,
      href: profile.links.resume,
    },
  ];

  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Contact</CmdSectionTitle>
      <CmdInsetPanel className="mb-3">
        <p className="text-terminal-text text-xs sm:text-sm m-0 mb-3 leading-relaxed">
          Fastest path to collaboration: email or grab time on my calendar. Prefer terminal vibes?
          <span className="text-terminal-accent font-semibold"> hire me </span>
          opens the action drawer with copy-to-clipboard.
        </p>
        <div className="space-y-3">
          {rows.map((row) => (
            <div key={row.label} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 border-b border-terminal-border/50 pb-2 last:border-0 last:pb-0">
              <span className="text-terminal-muted text-[10px] uppercase tracking-[0.12em] font-semibold w-28 shrink-0">
                {row.label}
              </span>
              {row.href ? (
                <a
                  href={row.href}
                  target={row.href.startsWith('mailto') ? undefined : '_blank'}
                  rel={row.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  className="text-terminal-link text-[11px] sm:text-xs break-all hover:text-terminal-accent transition-colors"
                >
                  {row.value}
                </a>
              ) : (
                <span className="text-terminal-text text-[11px] sm:text-xs break-all">{row.value}</span>
              )}
            </div>
          ))}
        </div>
      </CmdInsetPanel>
      <p className="text-terminal-muted text-[11px] sm:text-xs m-0 pl-1">
        <span className="text-terminal-accent mr-1">&gt;</span>
        Résumé file downloads as <span className="text-terminal-text">JAJR-CSV.pdf</span>.
      </p>
    </div>
  );
}

export function contactSearchableMirror(): string {
  return [
    profile.email,
    profile.links.linkedin,
    profile.links.github,
    profile.links.booking,
    profile.links.resume,
  ].join('\n');
}
