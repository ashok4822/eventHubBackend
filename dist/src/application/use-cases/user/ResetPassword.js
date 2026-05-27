"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetPassword = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
/**
 * Use case for resetting a password using a token.
 */
class ResetPassword {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
    async execute(token, password) {
        if (!token || !password) {
            throw new AppErrors_1.BadRequestError('Token and password are required');
        }
        const user = await this.userRepository.findByResetToken(token);
        if (!user) {
            throw new AppErrors_1.BadRequestError('Invalid or expired reset token');
        }
        user.password = await this.passwordHasher.hash(password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await this.userRepository.save(user);
    }
}
exports.ResetPassword = ResetPassword;
//# sourceMappingURL=ResetPassword.js.map