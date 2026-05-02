# Tony Romo — Terminal Portfolio

An interactive CLI portfolio built with **Vite + React + TypeScript + Tailwind + GSAP**.
Real command parsing, history, autocomplete, pipes, themes, and an ASCII boot sequence.

> Live demo: _add Vercel URL after first deploy_

## Features

- Real CLI engine (parser → registry → executor)
- Autocomplete on `Tab`, history with `↑/↓`, `Ctrl+L` to clear
- Pipes: `projects | grep react`
- Themes: `green` (default), `amber`, `mono`, `matrix` (lazy ASCII rain)
- Subtle WebAudio keystroke FX, toggleable with `sound on|off`
- ASCII boot animation driven by GSAP
- `hire me` overlay with email copy + mailto + LinkedIn + Calendly + résumé
- Click-to-run suggestion chips for non-technical visitors
- Vercel Web Analytics with privacy-friendly custom events
- Easter eggs: `secret`, `git log`, `npm run career`, `traceroute`, `ls`, `cat`, Konami code (↑↑↓↓←→←→ B A)
- Mobile-friendly · `prefers-reduced-motion` honored · keyboard-first

## Commands

```text
help · about · whoami · projects · experience · skills
contact · resume · clear · history · grep · theme · sound
hire me · secret · man
```

Hidden: `sudo · ls · pwd · date · cat · git log · npm run career · traceroute · share`

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build
npm run preview
```

> Node ≥ 18.18 required.

## Project layout

```
src/
  cli/           # parser, executor, registry, command implementations
  components/    # Terminal shell + Prompt + OutputLine + overlay
  hooks/         # useTerminal, useCommandHistory, useAutocomplete, ...
  store/         # zustand store (output, history, theme, sound)
  content/       # profile, projects, experience, skills, secret, ASCII banners
  lib/           # analytics, sound (WebAudio), storage, levenshtein, clipboard
  three/         # lazy matrix ASCII bg (canvas-based)
  styles/globals.css
```

## Deploy on Vercel

1. Push to GitHub.
2. Import the repo on Vercel — defaults work (`vite` framework auto-detected).
3. (Optional) Set env vars later if needed; analytics works zero-config.

## Customizing

- **Identity / email / links** → `src/content/profile.ts`
- **Projects** → `src/content/projects.ts`
- **Experience** → `src/content/experience.ts`
- **Skills** → `src/content/skills.ts`
- **Secret story** → `src/content/secret.ts`
- **ASCII banners** → `src/content/asciiBanners.ts`
- **Themes** → `src/styles/globals.css` (CSS variables per `[data-theme]`)

Add a new command:

```ts
// src/cli/commands/coffee.ts
import type { Command } from '../types';
export const coffeeCmd: Command = {
  name: 'coffee',
  summary: 'Brew a virtual ☕.',
  run: ({ print }) => print({ kind: 'text', lines: ['☕ done.'] }),
};
```

Then register it in `src/cli/commands/index.ts`.

## License

MIT — content (bio, projects, story) © Tony Romo.
