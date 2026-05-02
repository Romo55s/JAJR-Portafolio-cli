import { interests, skills, skillsManifestCopy } from '../content/skills';

/** Plain-text mirror for `skills | grep`. */
export function skillsSearchableMirror(): string {
  const parts: string[] = [
    'Skills manifest',
    skillsManifestCopy.lead,
    skillsManifestCopy.kicker,
  ];
  Object.entries(skills).forEach(([group, list]) => {
    parts.push(group);
    list.forEach((s) => parts.push(s));
  });
  parts.push('Beyond the terminal');
  interests.forEach((i) => parts.push(i));
  return parts.join('\n');
}

export function SkillsOutput() {
  return (
    <div className="skills-output select-text cursor-text font-mono pb-1">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-4 px-0.5">
        <span
          className="hidden sm:block h-px w-10 shrink-0 bg-gradient-to-r from-transparent to-terminal-accent/35"
          aria-hidden
        />
        <h2 className="text-terminal-accent text-[11px] sm:text-xs font-bold uppercase tracking-[0.14em] sm:tracking-[0.22em] m-0">
          Skills manifest
        </h2>
        <span
          className="hidden sm:block flex-1 min-w-[4rem] h-px bg-gradient-to-r from-terminal-accent/25 via-terminal-border to-transparent max-w-xs"
          aria-hidden
        />
      </div>

      <div className="rounded-lg border border-terminal-border/90 bg-terminal-surface/55 px-3 py-3 sm:px-4 sm:py-3.5 mb-5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03)]">
        <p className="text-terminal-muted text-[10px] sm:text-[11px] uppercase tracking-[0.12em] font-semibold mb-2 m-0">
          {skillsManifestCopy.kicker}
        </p>
        <p className="text-terminal-text text-xs sm:text-sm leading-relaxed m-0 mb-2">{skillsManifestCopy.lead}</p>
        <p className="text-terminal-link/90 text-[11px] sm:text-xs leading-snug m-0 opacity-90">
          <span className="text-terminal-accent mr-1 font-semibold">&gt;</span>
          {skillsManifestCopy.aside}
        </p>
      </div>

      <div className="space-y-5">
        {Object.entries(skills).map(([group, list]) => (
          <section key={group} className="relative pl-3 sm:pl-4 border-l-[3px] border-terminal-accent/70">
            <h3 className="text-terminal-accent text-[11px] font-bold uppercase tracking-[0.18em] mb-2.5 m-0">
              {group}
            </h3>
            <div className="flex flex-wrap gap-1.5 gap-y-2">
              {list.map((item) => (
                <span
                  key={`${group}-${item}`}
                  className="inline-flex items-center rounded-md border border-terminal-border/90 bg-terminal-bg/40 px-2 py-1 text-[11px] sm:text-xs text-terminal-link leading-none hover:border-terminal-accent/50 hover:bg-terminal-surface/60 transition-colors duration-150"
                >
                  {item}
                </span>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-8 pt-5 border-t border-dashed border-terminal-border">
        <h3 className="text-terminal-accent text-[11px] font-bold uppercase tracking-[0.2em] mb-3 m-0">
          Beyond the terminal
        </h3>
        <ul className="space-y-2.5 list-none m-0 p-0">
          {interests.map((item, i) => (
            <li key={i} className="text-terminal-text text-xs sm:text-sm leading-relaxed flex gap-2">
              <span className="text-terminal-accent shrink-0 mt-0.5 opacity-80 select-none" aria-hidden>
                ›
              </span>
              <span className="min-w-0">{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
