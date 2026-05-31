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
    constructor(_accessSecret, _refreshSecret) {
        super();
        this._accessSecret = _accessSecret;
        this._refreshSecret = _refreshSecret;
    }
    generateAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this._accessSecret, { expiresIn: '15m' });
    }
    generateRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, this._refreshSecret, { expiresIn: '7d' });
    }
    verifyAccessToken(token) {
        return jsonwebtoken_1.default.verify(token, this._accessSecret);
    }
    verifyRefreshToken(token) {
        return jsonwebtoken_1.default.verify(token, this._refreshSecret);
    }
}
exports.JwtTokenService = JwtTokenService;
//# sourceMappingURL=JwtTokenService.js.map