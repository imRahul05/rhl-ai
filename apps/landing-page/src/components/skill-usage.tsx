import * as React from 'react';
import { CopyCommand } from '@/components/copy-command';
import { CLAUDE_SKILLS_DIR, skillInstallCommand } from '@/lib/repo';

interface SkillUsageProps {
  readonly slug: string;
  readonly npmName?: string;
}

/** Install-and-use steps for one skill: Claude Code first, then other agents. */
export function SkillUsage({ slug, npmName }: SkillUsageProps): React.JSX.Element {
  return (
    <ol className="space-y-8">
      <li className="grid gap-3 sm:grid-cols-[3rem_1fr]">
        <span className="font-mono text-xs text-primary">01</span>
        <div className="space-y-3 min-w-0">
          <h3 className="text-base font-semibold text-foreground">Install it into Claude Code</h3>
          <CopyCommand command={skillInstallCommand(slug)} />
          <p className="text-sm text-muted-foreground leading-relaxed">
            Copies the skill folder to{' '}
            <code className="font-mono text-foreground">
              {CLAUDE_SKILLS_DIR}/{slug}
            </code>
            . Use <code className="font-mono text-foreground">--target .claude/skills</code> to add
            it to one repository for your whole team, or leave out{' '}
            <code className="font-mono text-foreground">--target</code> to install into{' '}
            <code className="font-mono text-foreground">~/.agents/skills</code> for agents that read
            that folder.
          </p>
        </div>
      </li>
      <li className="grid gap-3 sm:grid-cols-[3rem_1fr]">
        <span className="font-mono text-xs text-primary">02</span>
        <div className="space-y-3 min-w-0">
          <h3 className="text-base font-semibold text-foreground">
            Start a new session and call it
          </h3>
          <div className="font-mono text-sm bg-card border border-border px-3 py-2 rounded-md text-foreground w-fit">
            /{slug}
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Type the slash command (you can add instructions after it), or just describe the task:
            the agent loads the skill automatically when it matches. In other agents, name the skill
            in your prompt, e.g. “Use the {slug} skill to …”.
          </p>
        </div>
      </li>
      <li className="grid gap-3 sm:grid-cols-[3rem_1fr]">
        <span className="font-mono text-xs text-primary">03</span>
        <div className="space-y-3 min-w-0">
          <h3 className="text-base font-semibold text-foreground">Keep it up to date</h3>
          <CopyCommand
            command={`npx @rhl-ai/cli skill update ${slug} --target ${CLAUDE_SKILLS_DIR}`}
          />
          {npmName ? (
            <p className="text-sm text-muted-foreground leading-relaxed">
              Also published on npm as{' '}
              <a
                href={`https://www.npmjs.com/package/${npmName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-foreground underline underline-offset-4 hover:text-primary"
              >
                {npmName}
              </a>
              .
            </p>
          ) : null}
        </div>
      </li>
    </ol>
  );
}
