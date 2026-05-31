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
    constructor(_registerUseCase, _loginUseCase, _refreshTokenUseCase, _requestPasswordResetUseCase, _resetPasswordUseCase, _config) {
        this._registerUseCase = _registerUseCase;
        this._loginUseCase = _loginUseCase;
        this._refreshTokenUseCase = _refreshTokenUseCase;
        this._requestPasswordResetUseCase = _requestPasswordResetUseCase;
        this._resetPasswordUseCase = _resetPasswordUseCase;
        this._config = _config;
    }
    async register(req, res, _next) {
        const { name, email, password, role } = req.body;
        const user = await this._registerUseCase.execute({ name, email, password, role });
        res.status(statusCodes_1.STATUS_CODES.CREATED).json({
            success: true,
            message: messages_1.MESSAGES.AUTH.REGISTERED,
            data: user
        });
    }
    async login(req, res, _next) {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await this._loginUseCase.execute({ email, password });
        if (refreshToken) {
            res.cookie('refreshToken', refreshToken, this._config);
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
        const { accessToken } = await this._refreshTokenUseCase.execute(refreshToken);
        res.json({
            success: true,
            data: { accessToken }
        });
    }
    async logout(req, res) {
        res.clearCookie('refreshToken', {
            httpOnly: this._config.httpOnly,
            secure: this._config.secure,
            sameSite: this._config.sameSite,
        });
        res.json({
            success: true,
            message: messages_1.MESSAGES.AUTH.LOGGED_OUT
        });
    }
    async forgotPassword(req, res) {
        const { email } = req.body;
        await this._requestPasswordResetUseCase.execute(email);
        res.json({
            success: true,
            message: 'If an account exists with that email, a password reset link has been sent.'
        });
    }
    async resetPassword(req, res) {
        const { token } = req.params;
        const { password } = req.body;
        await this._resetPasswordUseCase.execute(token, password);
        res.json({
            success: true,
            message: 'Password has been reset successfully.'
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map