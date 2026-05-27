/**
 * Abstract interface for logging to decouple business logic from specific logging implementations.
 */
export abstract class ILogger {
  abstract info(message: string, context?: Record<string, unknown>): void;
  abstract error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void;
  abstract warn(message: string, context?: Record<string, unknown>): void;
  abstract debug(message: string, context?: Record<string, unknown>): void;
}
