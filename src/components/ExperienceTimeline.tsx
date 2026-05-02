import { education, experience, type Role } from '../content/experience';
import { DrupalLogoAscii, EXPERIENCE_HEADER_GREP_SNIPPET } from './DrupalLogoAscii';

function fmtPeriod(start: string, end: string | 'present'): string {
  return `${start} → ${end === 'present' ? 'present' : end}`;
}

function pushRoleMirror(parts: string[], r: Role): void {
  parts.push(`${r.title} ${r.company}`);
  parts.push(fmtPeriod(r.start, r.end));
  parts.push(`${r.type} ${r.location}`);
  r.bullets.forEach((b) => parts.push(b));
  if (r.stack?.length) parts.push(r.stack.join(', '));
}

/** Plain-text mirror for `experience | grep` over rendered roles + education. */
export function experienceSearchableMirror(): string {
  const parts: string[] = [EXPERIENCE_HEADER_GREP_SNIPPET];
  experience.forEach((r) => pushRoleMirror(parts, r));
  parts.push('Education');
  education.forEach((e) => parts.push(`${e.degree}, ${e.school} (${e.period})`));
  return parts.join('\n');
}

function RoleBulletsStack({ role }: { role: Role }) {
  return (
    <>
      <ul className="mt-0 space-y-2.5 list-none m-0 p-0">
        {role.bullets.map((b, i) => (
          <li key={i} className="text-terminal-text text-sm leading-relaxed pl-0 flex gap-2">
            <span className="text-terminal-accent shrink-0 mt-0.5 opacity-80 select-none" aria-hidden>
              ›
            </span>
            <span className="min-w-0">{b}</span>
          </li>
        ))}
      </ul>
      {role.stack?.length ? (
        <div className="mt-4 pt-3 border-t border-terminal-border/60 flex flex-wrap items-baseline gap-x-2 gap-y-1">
          <span className="text-terminal-muted text-[10px] uppercase tracking-[0.14em] font-semibold shrink-0">
            stack
          </span>
          <span className="text-terminal-muted/70 hidden sm:inline">│</span>
          <div className="text-xs sm:text-sm leading-relaxed">
            {role.stack.map((t, i) => (
              <span key={`${t}-${i}`}>
                {i > 0 ? <span className="text-terminal-muted">, </span> : null}
                <span className="text-terminal-link">{t}</span>
              </span>
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

function SecondaryRoleCard({ role }: { role: Role }) {
  const present = role.end === 'present';
  return (
    <article className="relative mt-6 pt-5 pl-3 sm:pl-4 border-l-[3px] border-terminal-accent/80 border-t border-dashed border-terminal-border">
      <header className="space-y-1.5">
        <div className="text-sm sm:text-base leading-snug break-words">
          <span className="text-terminal-accent" aria-hidden>
            ▌
          </span>{' '}
          <span className="text-terminal-text font-semibold">{role.title}</span>
          <span className="text-terminal-muted"> — </span>
          <span className="text-terminal-link">{role.company}</span>
          {present ? (
            <>
              <span className="text-terminal-muted"> · </span>
              <span className="text-terminal-warn text-[10px] uppercase tracking-widest font-semibold">
                current
              </span>
            </>
          ) : null}
        </div>
        <div className="text-[11px] sm:text-sm leading-relaxed">
          <span className="text-terminal-link tabular-nums font-medium">{fmtPeriod(role.start, role.end)}</span>
          <span className="text-terminal-muted">
            {' '}
            · {role.type} · {role.location}
          </span>
        </div>
      </header>
      <RoleBulletsStack role={role} />
    </article>
  );
}

export function ExperienceTimeline() {
  const [r0, ...rest] = experience;

  return (
    <div className="experience-timeline select-text cursor-text pb-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-5 px-0.5">
        <span
          className="hidden sm:block h-px w-12 shrink-0 bg-gradient-to-r from-transparent to-terminal-accent/35"
          aria-hidden
        />
        <h2 className="text-terminal-accent text-xs sm:text-sm font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em] m-0 text-left px-0.5 sm:px-1">
          Experience timeline
        </h2>
        <span
          className="hidden sm:block flex-1 min-w-[4rem] h-px bg-gradient-to-r from-terminal-accent/25 via-terminal-border to-transparent max-w-xs"
          aria-hidden
        />
      </div>

      <DrupalLogoAscii
        roleTitle={r0.title}
        company={r0.company}
        periodMeta={{
          range: fmtPeriod(r0.start, r0.end),
          type: r0.type,
          location: r0.location,
        }}
      />

      <div className="mt-3 mb-8 rounded-lg bg-terminal-surface/55 border border-terminal-border/90 px-3 py-3.5 sm:px-5 sm:py-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
        <RoleBulletsStack role={r0} />
      </div>

      {rest.map((r, i) => (
        <SecondaryRoleCard key={`${r.company}-${r.start}-${i}`} role={r} />
      ))}

      <section className="mt-10 pt-6 border-t border-terminal-border">
        <h3 className="text-terminal-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 m-0">
          Education
        </h3>
        <ul className="space-y-3 list-none m-0 p-0">
          {education.map((e, i) => (
            <li key={i} className="text-sm leading-relaxed">
              <span className="text-terminal-link font-medium">{e.degree}</span>
              <span className="text-terminal-muted"> · </span>
              <span className="text-terminal-text">{e.school}</span>
              <span className="block sm:inline text-terminal-muted text-xs mt-1 sm:mt-0 sm:ml-2 tabular-nums">
                ({e.period})
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
