"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseUserRepository = void 0;
const models_1 = require("../database/models");
const Mappers_1 = require("./Mappers");
/**
 * Mongoose implementation of the user repository.
 */
class MongooseUserRepository {
    async save(user) {
        const newUser = new models_1.UserModel(user);
        const saved = await newUser.save();
        return Mappers_1.UserMapper.toDomain(saved);
    }
    async findByEmail(email) {
        const user = await models_1.UserModel.findOne({ email });
        return user ? Mappers_1.UserMapper.toDomain(user) : null;
    }
    async findById(id) {
        const user = await models_1.UserModel.findById(id);
        return user ? Mappers_1.UserMapper.toDomain(user) : null;
    }
}
exports.MongooseUserRepository = MongooseUserRepository;
//# sourceMappingURL=MongooseUserRepository.js.map