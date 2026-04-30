import { PasswordHasher } from '../../ports/PasswordHasher';
import { UserRepository } from '../../ports/UserRepository';
import { ConflictError } from '../../errors/AppErrors';
import { IRegisterUser } from '../../ports/IUseCases';
import { UserDTO } from '../../dtos/UserDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for registering a new user.
 */
export class RegisterUser implements IRegisterUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher
  ) {}

  async execute({ name, email, password, role }: Parameters<IRegisterUser['execute']>[0]): Promise<UserDTO> {
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

