import rawRepoContent from '@/generated/repo-content.json';

export interface RawSkillSnapshot {
  readonly slug: string;
  readonly raw: string;
  readonly npmName: string | null;
  readonly packageVersion: string | null;
}

export interface TemplateSnapshot {
  readonly name: string;
  readonly description: string;
}

export interface RepoContentSnapshot {
  readonly skills: readonly RawSkillSnapshot[];
  readonly packages: readonly string[];
  readonly packageVersions: Readonly<Record<string, string>>;
  readonly templates: readonly TemplateSnapshot[];
  readonly docs: Readonly<Record<string, string>>;
}

export const REPO_CONTENT: RepoContentSnapshot = rawRepoContent;
