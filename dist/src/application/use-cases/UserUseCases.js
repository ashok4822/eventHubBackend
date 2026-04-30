"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = exports.LoginUser = exports.RegisterUser = void 0;
const AppErrors_1 = require("../errors/AppErrors");
/**
 * Use case for registering a new user.
 */
class RegisterUser {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute({ name, email, password, role }) {
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new AppErrors_1.ConflictError('User already exists');
        }
        const hashedPassword = await this.passwordHasher.hash(password);
        const newUser = await this.userRepository.save({
            name,
            email,
            password: hashedPassword,
            role: role || 'user',
        });
        return newUser;
    }
}
exports.RegisterUser = RegisterUser;
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
            user: { id: user.id, name: user.name, email: user.email, role: user.role },
        };
    }
}
exports.LoginUser = LoginUser;
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
//# sourceMappingURL=UserUseCases.js.map