import { ITokenService } from '../../ports/ITokenService';
import { IUserRepository } from '../../ports/UserRepository';
import { IRefreshToken } from '../../ports/IUseCases';
/**
 * Use case for refreshing access tokens.
 */
export declare class RefreshToken implements IRefreshToken {
    private userRepository;
    private tokenService;
    constructor(userRepository: IUserRepository, tokenService: ITokenService);
    execute(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
//# sourceMappingURL=RefreshToken.d.ts.map