"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for authenticating a user.
 */
class LoginUser {
    constructor(userRepository, passwordHasher, tokenService) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.tokenService = tokenService;
    }
    async execute({ email, password }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.id) {
            throw new AppErrors_1.UnauthorizedError('Invalid credentials');
        }
        const isMatch = await this.passwordHasher.compare(password, user.password);
        if (!isMatch) {
            throw new AppErrors_1.UnauthorizedError('Invalid credentials');
        }
        const accessToken = this.tokenService.generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = this.tokenService.generateRefreshToken({ id: user.id });
        return {
            accessToken,
            refreshToken,
            user: AppMapper_1.AppMapper.toUserDTO(user),
        };
    }
}
exports.LoginUser = LoginUser;
//# sourceMappingURL=LoginUser.js.map