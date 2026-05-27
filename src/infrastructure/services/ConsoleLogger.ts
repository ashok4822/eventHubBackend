import { ILogger } from '../../application/ports/ILogger';

/**
 * Concrete implementation of Logger port using console.
 */
export class ConsoleLogger extends ILogger {
  info(message: string, context?: Record<string, unknown>): void {
    console.log(`[INFO] ${message}`, context ? context : '');
  }

  error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void {
    console.error(`[ERROR] ${message}`, error, context ? context : '');
  }

  warn(message: string, context?: Record<string, unknown>): void {
    console.warn(`[WARN] ${message}`, context ? context : '');
  }

  debug(message: string, context?: Record<string, unknown>): void {
    console.debug(`[DEBUG] ${message}`, context ? context : '');
  }
}
