import { UserModel, IUserDocument } from '../database/models';
import { IUserRepository } from '../../application/ports/UserRepository';
import { IUser } from '../../domain/entities/User';
import { UserMapper } from './Mappers';
import { BaseRepository } from './BaseRepository';

/**
 * Implementation of the user repository.
 */
export class UserRepository extends BaseRepository<IUser, IUserDocument> implements IUserRepository {
  constructor() {
    super(UserModel, UserMapper);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByResetToken(token: string): Promise<IUser | null> {
    const user = await UserModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    return user ? UserMapper.toDomain(user) : null;
  }
}
