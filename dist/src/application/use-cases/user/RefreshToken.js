"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
/**
 * Use case for refreshing access tokens.
 */
class RefreshToken {
    constructor(_userRepository, _tokenService) {
        this._userRepository = _userRepository;
        this._tokenService = _tokenService;
    }
    async execute(refreshToken) {
        if (!refreshToken) {
            throw new Error('Refresh token is required');
        }
        const decoded = this._tokenService.verifyRefreshToken(refreshToken);
        const user = await this._userRepository.findById(decoded.id);
        if (!user || !user.id) {
            throw new AppErrors_1.NotFoundError('User not found');
        }
        const accessToken = this._tokenService.generateAccessToken({
            id: user.id,
            role: user.role,
        });
        return { accessToken };
    }
}
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map