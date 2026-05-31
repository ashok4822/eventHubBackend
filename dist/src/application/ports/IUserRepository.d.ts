import { IUser } from '../../domain/entities/User';
import { IBaseRepository } from './IBaseRepository';
export interface IUserRepository extends IBaseRepository<IUser> {
    findByEmail(email: string): Promise<IUser | null>;
    findByResetToken(token: string): Promise<IUser | null>;
}
//# sourceMappingURL=IUserRepository.d.ts.map