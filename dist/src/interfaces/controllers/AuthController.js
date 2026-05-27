"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AppErrors_1 = require("../../application/errors/AppErrors");
const statusCodes_1 = require("../constants/statusCodes");
const messages_1 = require("../constants/messages");
/**
 * Controller for user authentication and authorization.
 */
class AuthController {
    constructor(registerUseCase, loginUseCase, refreshTokenUseCase, requestPasswordResetUseCase, resetPasswordUseCase, config) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.requestPasswordResetUseCase = requestPasswordResetUseCase;
        this.resetPasswordUseCase = resetPasswordUseCase;
        this.config = config;
    }
    async register(req, res, _next) {
        const { name, email, password, role } = req.body;
        const user = await this.registerUseCase.execute({ name, email, password, role });
        res.status(statusCodes_1.STATUS_CODES.CREATED).json({
            success: true,
            message: messages_1.MESSAGES.AUTH.REGISTERED,
            data: user
        });
    }
    async login(req, res, _next) {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await this.loginUseCase.execute({ email, password });
        if (refreshToken) {
            res.cookie('refreshToken', refreshToken, this.config);
        }
        res.json({
            success: true,
            message: messages_1.MESSAGES.AUTH.LOGGED_IN, // I'll check if this exists or just use a generic one
            data: { accessToken, user }
        });
    }
    async refresh(req, res, _next) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppErrors_1.UnauthorizedError(messages_1.MESSAGES.AUTH.REFRESH_TOKEN_MISSING);
        }
        const { accessToken } = await this.refreshTokenUseCase.execute(refreshToken);
        res.json({
            success: true,
            data: { accessToken }
        });
    }
    async logout(req, res) {
        res.clearCookie('refreshToken', {
            httpOnly: this.config.httpOnly,
            secure: this.config.secure,
            sameSite: this.config.sameSite,
        });
        res.json({
            success: true,
            message: messages_1.MESSAGES.AUTH.LOGGED_OUT
        });
    }
    async forgotPassword(req, res) {
        const { email } = req.body;
        await this.requestPasswordResetUseCase.execute(email);
        res.json({
            success: true,
            message: 'If an account exists with that email, a password reset link has been sent.'
        });
    }
    async resetPassword(req, res) {
        const { token } = req.params;
        const { password } = req.body;
        await this.resetPasswordUseCase.execute(token, password);
        res.json({
            success: true,
            message: 'Password has been reset successfully.'
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map