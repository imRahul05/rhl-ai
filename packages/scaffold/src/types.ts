export interface TemplateInfo {
  readonly name: string;
  readonly path: string;
  readonly description: string;
}

export interface ScaffoldOptions {
  readonly template: string;
  readonly projectName: string;
  readonly targetDir?: string;
  readonly overwrite?: boolean;
  readonly templatesDir?: string;
}

export interface ScaffoldResult {
  readonly success: boolean;
  readonly template: string;
  readonly projectName: string;
  readonly targetPath: string;
  readonly message: string;
}
