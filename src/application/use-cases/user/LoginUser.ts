import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { ITokenService } from '../../ports/ITokenService';
import { IUserRepository } from '../../ports/IUserRepository';
import { UnauthorizedError } from '../../errors/AppErrors';
import { ILoginUser } from '../../ports/IUseCases';
import { IAuthResponseDTO } from '../../dtos/IUserDTO';
import { AppMapper } from '../../mappers/AppMapper';

/**
 * Use case for authenticating a user.
 */
export class LoginUser implements ILoginUser {
  constructor(
    private _userRepository: IUserRepository,
    private _passwordHasher: IPasswordHasher,
    private _tokenService: ITokenService
  ) {}

  async execute({ email, password }: Parameters<ILoginUser['execute']>[0]): Promise<IAuthResponseDTO> {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this._userRepository.findByEmail(email);
    if (!user || !user.id) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const isMatch = await this._passwordHasher.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const accessToken = this._tokenService.generateAccessToken({ id: user.id, role: user.role });
    const refreshToken = this._tokenService.generateRefreshToken({ id: user.id });

    return {
      accessToken,
      refreshToken,
      user: AppMapper.toUserDTO(user),
    };
  }
}

