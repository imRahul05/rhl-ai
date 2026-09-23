export interface SkillMetadata {
  readonly name: string;
  readonly description: string;
  readonly version?: string;
  readonly author?: string;
  readonly tags?: readonly string[];
}

export interface SkillFiles {
  readonly references: readonly string[];
  readonly examples: readonly string[];
  readonly scripts: readonly string[];
}

export interface Skill {
  readonly name: string;
  readonly path: string;
  readonly metadata: SkillMetadata;
  readonly instructions: string;
  readonly files: SkillFiles;
}

export interface ValidationIssue {
  readonly field: string;
  readonly message: string;
  readonly severity: 'error' | 'warning';
}

export interface ValidationResult {
  readonly isValid: boolean;
  readonly skillName: string;
  readonly issues: readonly ValidationIssue[];
}

export interface InstallResult {
  readonly success: boolean;
  readonly skillName: string;
  readonly sourcePath: string;
  readonly targetPath: string;
  readonly message: string;
}

export interface CreateSkillOptions {
  readonly skillsDir?: string;
  readonly description?: string;
  readonly author?: string;
}

export interface InstallSkillOptions {
  readonly sourceSkillsDir?: string;
  readonly targetDir?: string;
  readonly overwrite?: boolean;
}
