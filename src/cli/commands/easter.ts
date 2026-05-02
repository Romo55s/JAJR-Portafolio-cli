import type { Command } from '../types';
import { profile } from '../../content/profile';
import { experience } from '../../content/experience';

export const sudoCmd: Command = {
  name: 'sudo',
  hidden: true,
  summary: 'You are not in the sudoers file. This incident will be reported.',
  run: ({ args, print }) => {
    if (args[0] === 'hire' && args[1] === 'me') {
      print({ kind: 'text', lines: ['# escalating to root... access granted.'], tone: 'accent' });
      print({ kind: 'text', lines: ['Just kidding — try `hire me` (no sudo needed).'] });
      return;
    }
    print({
      kind: 'text',
      lines: [
        `[sudo] password for tony: `,
        `${profile.handle} is not in the sudoers file. This incident will be reported.`,
      ],
      tone: 'error',
    });
  },
};

export const lsCmd: Command = {
  name: 'ls',
  hidden: true,
  summary: 'List directory.',
  run: ({ print }) => {
    print({
      kind: 'text',
      lines: [
        'about/      contact/    experience/   projects/   secret/',
        'resume.pdf  skills/     theme/        whoami      hire-me/',
      ],
    });
  },
};

export const pwdCmd: Command = {
  name: 'pwd',
  hidden: true,
  summary: 'Print working directory.',
  run: ({ print }) => {
    print({ kind: 'text', lines: [`/home/${profile.handle}`] });
  },
};

export const dateCmd: Command = {
  name: 'date',
  hidden: true,
  summary: 'Show current date.',
  run: ({ print }) => {
    print({ kind: 'text', lines: [new Date().toString()] });
  },
};

export const catCmd: Command = {
  name: 'cat',
  hidden: true,
  summary: 'Concatenate and print files.',
  usage: 'cat <file>',
  run: ({ args, print }) => {
    const f = (args[0] || '').toLowerCase();
    const map: Record<string, string[]> = {
      '/etc/passwd': [
        'root:x:0:0:root:/root:/bin/bash',
        `${profile.handle}:x:1000:1000:${profile.name}:/home/${profile.handle}:/bin/zsh`,
        'curiosity:x:1337:1337::/var/lib/curiosity:/bin/bash',
      ],
      '/etc/motd': [
        '',
        `welcome to ${profile.hostname}.`,
        `kernel: tony-curiosity 6.6.${new Date().getFullYear() % 100}-prod`,
        `up since: 2020 (formal training) · shipping since: 2023`,
        `tip: type \`help\` to see what's possible`,
        '',
      ],
      'readme.md': [
        '# Tony Romo',
        '',
        '> Build it. Ship it. Maintain it. Mentor on it.',
      ],
    };
    if (!f) {
      print({ kind: 'text', lines: ['cat: missing file operand'], tone: 'error' });
      return;
    }
    if (!map[f]) {
      print({ kind: 'text', lines: [`cat: ${f}: No such file or directory`], tone: 'error' });
      return;
    }
    print({ kind: 'text', lines: map[f] });
  },
  complete: () => ['/etc/passwd', '/etc/motd', 'readme.md'],
};

export const gitCmd: Command = {
  name: 'git',
  hidden: true,
  summary: 'Pretty git output.',
  usage: 'git log',
  run: ({ args, print }) => {
    if (args[0] !== 'log') {
      print({ kind: 'text', lines: [`usage: git log`] });
      return;
    }
    const lines: string[] = [];
    experience.forEach((r, i) => {
      const sha = (Math.abs(hashStr(r.title + r.company)) >>> 0).toString(16).slice(0, 7);
      lines.push(`commit ${sha}${i === 0 ? ' (HEAD -> main)' : ''}`);
      lines.push(`Author: Tony Romo <tony@portfolio>`);
      lines.push(`Date:   ${r.start} → ${r.end}`);
      lines.push('');
      lines.push(`    ${r.title} @ ${r.company}`);
      lines.push('');
    });
    print({ kind: 'text', lines });
  },
  complete: (args) => (args.length === 1 ? ['log'] : []),
};

function hashStr(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

export const npmCmd: Command = {
  name: 'npm',
  hidden: true,
  summary: 'npm <run> career',
  usage: 'npm run career',
  run: async ({ args, print }) => {
    if (args[0] !== 'run' || args[1] !== 'career') {
      print({ kind: 'text', lines: [`usage: npm run career`] });
      return;
    }
    print({
      kind: 'text',
      tone: 'dim',
      lines: [
        '> tony-romo@1.0.0 career',
        '> tsc -b && vite build && deploy --prod',
        '',
      ],
    });
    const log: string[] = [];
    experience
      .slice()
      .reverse()
      .forEach((r) => {
        log.push(`✓ build  ${r.title} · ${r.company} (${r.start})`);
      });
    log.push('');
    log.push('✓ all stages green. ready to deploy.');
    print({ kind: 'text', tone: 'accent', lines: log });
  },
  complete: (args) =>
    args.length === 1 ? ['run'] : args.length === 2 ? ['career'] : [],
};

export const tracerouteCmd: Command = {
  name: 'traceroute',
  hidden: true,
  summary: 'Fake hops to a host.',
  usage: 'traceroute <host>',
  run: ({ args, print }) => {
    const host = args[0] || 'insulet.com';
    const hops = [
      'router.lan',
      'isp-edge.mx',
      'cloudflare-pop',
      'acquia-edge',
      `${host} (drupal-prod)`,
    ];
    const lines = [`traceroute to ${host}, 30 hops max, 60 byte packets`];
    hops.forEach((h, i) => {
      const ms = (5 + Math.random() * 25).toFixed(1);
      lines.push(`  ${String(i + 1).padStart(2)}  ${h.padEnd(28)} ${ms} ms`);
    });
    lines.push('  ✓ reached.');
    print({ kind: 'text', lines });
  },
};

export const shareCmd: Command = {
  name: 'share',
  hidden: true,
  summary: 'Copy a deep-link to current view.',
  run: async ({ print }) => {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      print({ kind: 'text', lines: ['✓ link copied to clipboard.'], tone: 'accent' });
    } catch {
      print({ kind: 'text', lines: [`copy this: ${window.location.href}`] });
    }
  },
};
