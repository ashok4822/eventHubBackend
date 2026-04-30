import { Logger } from '../../application/ports/Logger';

/**
 * Concrete implementation of Logger port using console.
 */
export class ConsoleLogger extends Logger {
  info(message: string, context?: any): void {
    console.log(`[INFO] ${message}`, context ? context : '');
  }

  error(message: string, error?: Error | unknown, context?: any): void {
    console.error(`[ERROR] ${message}`, error, context ? context : '');
  }

  warn(message: string, context?: any): void {
    console.warn(`[WARN] ${message}`, context ? context : '');
  }

  debug(message: string, context?: any): void {
    console.debug(`[DEBUG] ${message}`, context ? context : '');
  }
}
