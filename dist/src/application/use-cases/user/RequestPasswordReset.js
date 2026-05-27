"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestPasswordReset = void 0;
const crypto_1 = __importDefault(require("crypto"));
/**
 * Use case for requesting a password reset.
 */
class RequestPasswordReset {
    constructor(userRepository, emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
    }
    async execute(email) {
        if (!email) {
            throw new Error('Email is required');
        }
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            // We don't want to reveal if a user exists or not for security reasons
            // but in this case we just return.
            return;
        }
        const resetToken = crypto_1.default.randomBytes(32).toString('hex');
        const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetPasswordExpires;
        await this.userRepository.save(user);
        await this.emailService.sendPasswordResetEmail(user, resetToken);
    }
}
exports.RequestPasswordReset = RequestPasswordReset;
//# sourceMappingURL=RequestPasswordReset.js.map