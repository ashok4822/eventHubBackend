import { Model, Document } from 'mongoose';
import { IBaseRepository } from '../../application/ports/IBaseRepository';
/**
 * Generic base repository for Mongoose implementations.
 * @template TDomain The domain entity type.
 * @template TDoc The Mongoose document type.
 */
export declare abstract class BaseRepository<TDomain extends {
    id?: string;
}, TDoc extends Document> implements IBaseRepository<TDomain> {
    protected readonly model: Model<TDoc>;
    protected readonly mapper: {
        toDomain: (doc: TDoc) => TDomain;
    };
    constructor(model: Model<TDoc>, mapper: {
        toDomain: (doc: TDoc) => TDomain;
    });
    findById(id: string): Promise<TDomain | null>;
    save(data: TDomain): Promise<TDomain>;
    delete(id: string): Promise<boolean>;
}
//# sourceMappingURL=BaseRepository.d.ts.map