import { registry } from '../registry';
import { helpCmd } from './help';
import { whoamiCmd } from './whoami';
import { aboutCmd } from './about';
import { projectsCmd } from './projects';
import { experienceCmd } from './experience';
import { skillsCmd } from './skills';
import { contactCmd } from './contact';
import { resumeCmd } from './resume';
import { clearCmd } from './clear';
import { historyCmd } from './history';
import { grepCmd } from './grep';
import { themeCmd } from './theme';
import { soundCmd } from './sound';
import { hireMeCmd } from './hireMe';
import { secretCmd } from './secret';
import { manCmd } from './man';
import {
  sudoCmd,
  lsCmd,
  pwdCmd,
  dateCmd,
  catCmd,
  gitCmd,
  npmCmd,
  tracerouteCmd,
  shareCmd,
} from './easter';

let registered = false;

export function registerCommands(): void {
  if (registered) return;
  registered = true;

  // visible
  registry.register(helpCmd);
  registry.register(whoamiCmd);
  registry.register(aboutCmd);
  registry.register(projectsCmd);
  registry.register(experienceCmd);
  registry.register(skillsCmd);
  registry.register(contactCmd);
  registry.register(resumeCmd);
  registry.register(clearCmd);
  registry.register(historyCmd);
  registry.register(grepCmd);
  registry.register(themeCmd);
  registry.register(soundCmd);
  registry.register(hireMeCmd);
  registry.register(secretCmd);
  registry.register(manCmd);

  // hidden / easter
  registry.register(sudoCmd);
  registry.register(lsCmd);
  registry.register(pwdCmd);
  registry.register(dateCmd);
  registry.register(catCmd);
  registry.register(gitCmd);
  registry.register(npmCmd);
  registry.register(tracerouteCmd);
  registry.register(shareCmd);
}
