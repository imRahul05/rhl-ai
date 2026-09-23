import pc from 'picocolors';

export interface LoggerConfig {
  readonly isVerbose: boolean;
  readonly isSilent: boolean;
}

let activeConfig: LoggerConfig = {
  isVerbose: false,
  isSilent: false,
};

export function configureLogger(config: Partial<LoggerConfig>): void {
  activeConfig = {
    isVerbose: config.isVerbose ?? activeConfig.isVerbose,
    isSilent: config.isSilent ?? activeConfig.isSilent,
  };
}

export function logInfo(message: string): void {
  if (activeConfig.isSilent) return;
  console.log(`${pc.cyan('ℹ')} ${message}`);
}

export function logSuccess(message: string): void {
  if (activeConfig.isSilent) return;
  console.log(`${pc.green('✔')} ${message}`);
}

export function logWarn(message: string): void {
  if (activeConfig.isSilent) return;
  console.warn(`${pc.yellow('⚠')} ${message}`);
}

export function logError(message: string): void {
  if (activeConfig.isSilent) return;
  console.error(`${pc.red('✖')} ${message}`);
}

export function logDebug(message: string): void {
  if (activeConfig.isSilent || !activeConfig.isVerbose) return;
  console.debug(`${pc.gray('⚙')} ${pc.gray(message)}`);
}

export function logStep(step: number, total: number, message: string): void {
  if (activeConfig.isSilent) return;
  console.log(`${pc.magenta(`[${step}/${total}]`)} ${message}`);
}
