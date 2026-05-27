import { ILogger } from '../../application/ports/ILogger';
/**
 * Concrete implementation of Logger port using console.
 */
export declare class ConsoleLogger extends ILogger {
    info(message: string, context?: Record<string, unknown>): void;
    error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void;
    warn(message: string, context?: Record<string, unknown>): void;
    debug(message: string, context?: Record<string, unknown>): void;
}
//# sourceMappingURL=ConsoleLogger.d.ts.map