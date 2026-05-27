import { Model, Document, UpdateQuery } from 'mongoose';
import { IBaseRepository } from '../../application/ports/BaseRepository';

/**
 * Generic base repository for Mongoose implementations.
 * @template TDomain The domain entity type.
 * @template TDoc The Mongoose document type.
 */
export abstract class BaseRepository<TDomain extends { id?: string }, TDoc extends Document> 
  implements IBaseRepository<TDomain> {
  
  constructor(
    protected readonly model: Model<TDoc>,
    protected readonly mapper: { toDomain: (doc: TDoc) => TDomain }
  ) {}

  async findById(id: string): Promise<TDomain | null> {
    const doc = await this.model.findById(id);
    return doc ? this.mapper.toDomain(doc) : null;
  }

  async save(data: TDomain): Promise<TDomain> {
    if (data.id) {
      const updated = await this.model.findByIdAndUpdate(
        data.id,
        { ...data } as unknown as UpdateQuery<TDoc>,
        { new: true }
      );
      if (!updated) {
        throw new Error('Entity not found for update');
      }
      return this.mapper.toDomain(updated);
    }
    
    const newDoc = new this.model(data);
    const saved = await newDoc.save();
    return this.mapper.toDomain(saved);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(id);
    return !!result;
  }
}
