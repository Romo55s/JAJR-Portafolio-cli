import type { Command } from './types';
import { nearest } from '../lib/levenshtein';

class Registry {
  private byName = new Map<string, Command>();
  private aliasToName = new Map<string, string>();

  register(cmd: Command): void {
    if (this.byName.has(cmd.name)) {
      // eslint-disable-next-line no-console
      console.warn(`Command "${cmd.name}" already registered.`);
    }
    this.byName.set(cmd.name, cmd);
    cmd.aliases?.forEach((a) => this.aliasToName.set(a.toLowerCase(), cmd.name));
  }

  resolve(name: string): Command | null {
    const lower = name.toLowerCase();
    return this.byName.get(lower) ?? this.byName.get(this.aliasToName.get(lower) ?? '') ?? null;
  }

  all(): Command[] {
    return [...this.byName.values()];
  }

  visible(): Command[] {
    return this.all().filter((c) => !c.hidden);
  }

  /** All canonical names + aliases. Useful for tab-complete. */
  vocabulary(includeHidden = false): string[] {
    const list = includeHidden ? this.all() : this.visible();
    const v = new Set<string>();
    for (const c of list) {
      v.add(c.name);
      c.aliases?.forEach((a) => v.add(a));
    }
    return [...v].sort();
  }

  suggest(name: string): string | null {
    return nearest(name, this.vocabulary(true), 3);
  }
}

export const registry = new Registry();
