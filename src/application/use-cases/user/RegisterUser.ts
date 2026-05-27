import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { IUserRepository } from '../../ports/UserRepository';
import { ConflictError } from '../../errors/AppErrors';
import { IRegisterUser } from '../../ports/IUseCases';
import { IUserDTO } from '../../dtos/UserDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for registering a new user.
 */
export class RegisterUser implements IRegisterUser {
  constructor(
    private userRepository: IUserRepository,
    private passwordHasher: IPasswordHasher
  ) {}

  async execute({ name, email, password, role }: Parameters<IRegisterUser['execute']>[0]): Promise<IUserDTO> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictError('User already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const newUser = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    return AppMapper.toUserDTO(newUser);
  }
}

