import { TokenService } from '../../ports/TokenService';
import { UserRepository } from '../../ports/UserRepository';
import { NotFoundError } from '../../errors/AppErrors';

import { IRefreshToken } from '../../ports/IUseCases';

/**
 * Use case for refreshing access tokens.
 */
export class RefreshToken implements IRefreshToken {
  constructor(
    private userRepository: UserRepository,
    private tokenService: TokenService
  ) {}

  async execute(refreshToken: string): Promise<{ accessToken: string }> {
    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    const decoded = this.tokenService.verifyRefreshToken(refreshToken);
    
    const user = await this.userRepository.findById(decoded.id);

    if (!user || !user.id) {
      throw new NotFoundError('User not found');
    }

    const accessToken = this.tokenService.generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return { accessToken };
  }
}
