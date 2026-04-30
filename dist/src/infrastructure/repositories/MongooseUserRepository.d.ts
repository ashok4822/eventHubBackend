import { UserRepository } from '../../application/ports/UserRepository';
import { IUser } from '../../domain/entities/User';
/**
 * Mongoose implementation of the user repository.
 */
export declare class MongooseUserRepository implements UserRepository {
    save(user: IUser): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findById(id: string): Promise<IUser | null>;
}
//# sourceMappingURL=MongooseUserRepository.d.ts.map