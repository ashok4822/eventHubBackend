"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
const AppMapper_1 = require("../../mappers/AppMapper");
/**
 * Use case for authenticating a user.
 */
class LoginUser {
    constructor(_userRepository, _passwordHasher, _tokenService) {
        this._userRepository = _userRepository;
        this._passwordHasher = _passwordHasher;
        this._tokenService = _tokenService;
    }
    async execute({ email, password }) {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        const user = await this._userRepository.findByEmail(email);
        if (!user || !user.id) {
            throw new AppErrors_1.UnauthorizedError('Invalid credentials');
        }
        const isMatch = await this._passwordHasher.compare(password, user.password);
        if (!isMatch) {
            throw new AppErrors_1.UnauthorizedError('Invalid credentials');
        }
        const accessToken = this._tokenService.generateAccessToken({ id: user.id, role: user.role });
        const refreshToken = this._tokenService.generateRefreshToken({ id: user.id });
        return {
            accessToken,
            refreshToken,
            user: AppMapper_1.AppMapper.toUserDTO(user),
        };
    }
}
exports.LoginUser = LoginUser;
//# sourceMappingURL=LoginUser.js.map