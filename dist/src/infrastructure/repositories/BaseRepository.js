"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
/**
 * Generic base repository for Mongoose implementations.
 * @template TDomain The domain entity type.
 * @template TDoc The Mongoose document type.
 */
class BaseRepository {
    constructor(model, mapper) {
        this.model = model;
        this.mapper = mapper;
    }
    async findById(id) {
        const doc = await this.model.findById(id);
        return doc ? this.mapper.toDomain(doc) : null;
    }
    async save(data) {
        if (data.id) {
            const updated = await this.model.findByIdAndUpdate(data.id, { ...data }, { new: true });
            if (!updated) {
                throw new Error('Entity not found for update');
            }
            return this.mapper.toDomain(updated);
        }
        const newDoc = new this.model(data);
        const saved = await newDoc.save();
        return this.mapper.toDomain(saved);
    }
    async delete(id) {
        const result = await this.model.findByIdAndDelete(id);
        return !!result;
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map