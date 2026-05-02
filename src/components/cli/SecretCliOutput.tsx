import { secret } from '../../content/secret';
import { CmdInsetPanel, CmdSectionTitle } from './CommandChrome';

const PRELUDE = [
  `> decrypting ${secret.title}...`,
  '> bypassing /etc/responsibility/policy.d/*',
  '> rendering memory dump...',
];

export function SecretStoryOutput() {
  return (
    <div className="min-w-0 w-full pb-1">
      <CmdSectionTitle>Confidential</CmdSectionTitle>
      <CmdInsetPanel className="mb-4 border-terminal-muted/40 bg-terminal-bg/20">
        <ul className="list-none m-0 p-0 space-y-1 font-mono text-terminal-muted text-[11px] sm:text-xs">
          {PRELUDE.map((line, i) => (
            <li key={i} className="break-all whitespace-pre-wrap">
              {line}
            </li>
          ))}
        </ul>
      </CmdInsetPanel>
      <CmdInsetPanel className="border-terminal-accent/35 crt-glow">
        <pre className="text-terminal-accent text-[11px] sm:text-xs font-mono m-0 whitespace-pre-wrap break-words leading-relaxed select-text">
          {secret.body.join('\n')}
        </pre>
      </CmdInsetPanel>
    </div>
  );
}

export function secretSearchableMirror(): string {
  return [secret.title, ...secret.body].join('\n');
}
