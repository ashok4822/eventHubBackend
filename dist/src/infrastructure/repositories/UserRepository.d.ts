import { IUserDocument } from '../database/models';
import { IUserRepository } from '../../application/ports/UserRepository';
import { IUser } from '../../domain/entities/User';
import { BaseRepository } from './BaseRepository';
/**
 * Implementation of the user repository.
 */
export declare class UserRepository extends BaseRepository<IUser, IUserDocument> implements IUserRepository {
    constructor();
    findByEmail(email: string): Promise<IUser | null>;
    findByResetToken(token: string): Promise<IUser | null>;
}
//# sourceMappingURL=UserRepository.d.ts.map