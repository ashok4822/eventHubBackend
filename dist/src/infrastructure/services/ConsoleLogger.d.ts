import { Logger } from '../../application/ports/Logger';
/**
 * Concrete implementation of Logger port using console.
 */
export declare class ConsoleLogger extends Logger {
    info(message: string, context?: any): void;
    error(message: string, error?: Error | unknown, context?: any): void;
    warn(message: string, context?: any): void;
    debug(message: string, context?: any): void;
}
//# sourceMappingURL=ConsoleLogger.d.ts.map