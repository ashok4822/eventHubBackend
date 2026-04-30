import { IUser } from '../../domain/entities/User';

export interface UserRepository {
  findById(id: string): Promise<IUser | null>;
  findByEmail(email: string): Promise<IUser | null>;
  save(user: IUser): Promise<IUser>;
  findByResetToken(token: string): Promise<IUser | null>;
}
