"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
const BaseRepository_1 = require("./BaseRepository");
/**
 * Implementation of the user repository.
 */
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(models_1.UserModel, Mappers_1.UserMapper);
    }
    async findByEmail(email) {
        const user = await models_1.UserModel.findOne({ email });
        return user ? Mappers_1.UserMapper.toDomain(user) : null;
    }
    async findByResetToken(token) {
        const user = await models_1.UserModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });
        return user ? Mappers_1.UserMapper.toDomain(user) : null;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=UserRepository.js.map