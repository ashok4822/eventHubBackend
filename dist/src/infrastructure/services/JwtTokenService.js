"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtTokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ITokenService_1 = require("../../application/ports/ITokenService");
/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
class JwtTokenService extends ITokenService_1.ITokenService {
    constructor(accessSecret, refreshSecret) {
        super();
        this.accessSecret = accessSecret;
        this.refreshSecret = refreshSecret;
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.accessSecret, { expiresIn: '15m' });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this.refreshSecret, { expiresIn: '7d' });
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this.accessSecret);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this.refreshSecret);
    }
}
exports.JwtTokenService = JwtTokenService;
//# sourceMappingURL=JwtTokenService.js.map