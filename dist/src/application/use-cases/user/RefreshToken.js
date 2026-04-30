"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
/**
 * Use case for refreshing access tokens.
 */
class RefreshToken {
    constructor(userRepository, tokenService) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
    }
    async execute(refreshToken) {
        if (!refreshToken) {
            throw new Error('Refresh token is required');
        }
        const decoded = this.tokenService.verifyRefreshToken(refreshToken);
        const user = await this.userRepository.findById(decoded.id);
        if (!user || !user.id) {
            throw new AppErrors_1.NotFoundError('User not found');
        }
        const accessToken = this.tokenService.generateAccessToken({
            id: user.id,
            role: user.role,
        });
        return { accessToken };
    }
}
exports.RefreshToken = RefreshToken;
//# sourceMappingURL=RefreshToken.js.map