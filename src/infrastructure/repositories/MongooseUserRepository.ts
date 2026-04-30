import { UserModel } from '../database/models';
import { UserRepository } from '../../application/ports/UserRepository';
import { IUser } from '../../domain/entities/User';
import { UserMapper } from './Mappers';

/**
 * Mongoose implementation of the user repository.
 */
export class MongooseUserRepository implements UserRepository {
  async save(user: IUser): Promise<IUser> {
    if (user.id) {
      const updated = await UserModel.findByIdAndUpdate(
        user.id,
        { ...user },
        { new: true }
      );
      if (!updated) throw new Error('User not found');
      return UserMapper.toDomain(updated);
    }
    const newUser = new UserModel(user);
    const saved = await newUser.save();
    return UserMapper.toDomain(saved);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id);
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
