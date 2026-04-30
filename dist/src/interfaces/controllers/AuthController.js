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
    constructor(registerUseCase, loginUseCase, refreshTokenUseCase, config) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
        this.refreshTokenUseCase = refreshTokenUseCase;
        this.config = config;
    }
    async register(req, res, next) {
        try {
            const { name, email, password, role } = req.body;
            const user = await this.registerUseCase.execute({ name, email, password, role });
            res.status(statusCodes_1.STATUS_CODES.CREATED).json({
                success: true,
                message: messages_1.MESSAGES.AUTH.REGISTERED,
                data: user
            });
        }
        catch (error) {
            next(error);
        }
    }
    async login(req, res, next) {
        try {
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
        catch (error) {
            next(error);
        }
    }
    async refresh(req, res, next) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return next(new AppErrors_1.UnauthorizedError(messages_1.MESSAGES.AUTH.REFRESH_TOKEN_MISSING));
        }
        try {
            const { accessToken } = await this.refreshTokenUseCase.execute(refreshToken);
            res.json({
                success: true,
                data: { accessToken }
            });
        }
        catch (error) {
            next(error);
        }
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
}
exports.AuthController = AuthController;
//# sourceMappingURL=AuthController.js.map