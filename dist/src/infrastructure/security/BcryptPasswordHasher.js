"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BcryptPasswordHasher = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const PasswordHasher_1 = require("../../application/ports/PasswordHasher");
/**
 * Concrete implementation of PasswordHasher using bcryptjs.
 */
class BcryptPasswordHasher extends PasswordHasher_1.PasswordHasher {
    async hash(password) {
        const saltRounds = 10;
        return await bcryptjs_1.default.hash(password, saltRounds);
    }
    async compare(password, hash) {
        return await bcryptjs_1.default.compare(password, hash);
    }
}
exports.BcryptPasswordHasher = BcryptPasswordHasher;
//# sourceMappingURL=BcryptPasswordHasher.js.map