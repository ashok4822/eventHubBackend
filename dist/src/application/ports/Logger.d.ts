/**
 * Abstract interface for logging to decouple business logic from specific logging implementations.
 */
export declare abstract class Logger {
    abstract info(message: string, context?: Record<string, unknown>): void;
    abstract error(message: string, error?: Error | unknown, context?: Record<string, unknown>): void;
    abstract warn(message: string, context?: Record<string, unknown>): void;
    abstract debug(message: string, context?: Record<string, unknown>): void;
}
//# sourceMappingURL=Logger.d.ts.map