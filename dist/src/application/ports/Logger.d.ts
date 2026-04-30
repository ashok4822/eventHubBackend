/**
 * Abstract interface for logging to decouple business logic from specific logging implementations.
 */
export declare abstract class Logger {
    abstract info(message: string, context?: any): void;
    abstract error(message: string, error?: Error | unknown, context?: any): void;
    abstract warn(message: string, context?: any): void;
    abstract debug(message: string, context?: any): void;
}
//# sourceMappingURL=Logger.d.ts.map