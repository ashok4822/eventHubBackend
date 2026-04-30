"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUser = void 0;
const AppErrors_1 = require("../../errors/AppErrors");
const AppMapper_1 = require("../../mappers/AppMapper");
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
        return AppMapper_1.AppMapper.toUserDTO(newUser);
    }
}
exports.RegisterUser = RegisterUser;
//# sourceMappingURL=RegisterUser.js.map