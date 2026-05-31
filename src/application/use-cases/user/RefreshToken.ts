import { ITokenService } from '../../ports/ITokenService';
import { IUserRepository } from '../../ports/IUserRepository';
import { NotFoundError } from '../../errors/AppErrors';

import { IRefreshToken } from '../../ports/IUseCases';

/**
 * Use case for refreshing access tokens.
 */
export class RefreshToken implements IRefreshToken {
  constructor(
    private _userRepository: IUserRepository,
    private _tokenService: ITokenService
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    const decoded = this._tokenService.verifyRefreshToken(refreshToken);
    
    const user = await this._userRepository.findById(decoded.id);

    if (!user || !user.id) {
      throw new NotFoundError('User not found');
    }

    const accessToken = this._tokenService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return { accessToken };
  }
}
