"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
const Logger_1 = require("../../application/ports/Logger");
/**
 * Concrete implementation of Logger port using console.
 */
class ConsoleLogger extends Logger_1.Logger {
    info(message, context) {
        console.log(`[INFO] ${message}`, context ? context : '');
    }
    error(message, error, context) {
        console.error(`[ERROR] ${message}`, error, context ? context : '');
    }
    warn(message, context) {
        console.warn(`[WARN] ${message}`, context ? context : '');
    }
    debug(message, context) {
        console.debug(`[DEBUG] ${message}`, context ? context : '');
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map