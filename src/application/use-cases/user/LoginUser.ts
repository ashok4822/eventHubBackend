import { PasswordHasher } from '../../ports/PasswordHasher';
import { TokenService } from '../../ports/TokenService';
import { UserRepository } from '../../ports/UserRepository';
import { UnauthorizedError } from '../../errors/AppErrors';
import { ILoginUser } from '../../ports/IUseCases';
import { AuthResponseDTO } from '../../dtos/UserDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for authenticating a user.
 */
export class LoginUser implements ILoginUser {
  constructor(
    private userRepository: UserRepository,
    private passwordHasher: PasswordHasher,
    private tokenService: TokenService
  ) {}

  async execute({ email, password }: Parameters<ILoginUser['execute']>[0]): Promise<AuthResponseDTO> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user || !user.id) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await this.passwordHasher.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = this.tokenService.generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = this.tokenService.generateRefreshToken({ id: user.id });

    return {
      accessToken,
      refreshToken,
      user: AppMapper.toUserDTO(user),
    };
  }
}

