import { ITokenService } from '../../ports/ITokenService';
import { IUserRepository } from '../../ports/IUserRepository';
import { IRefreshToken } from '../../ports/IUseCases';
/**
 * Use case for refreshing access tokens.
 */
export declare class RefreshToken implements IRefreshToken {
    private _userRepository;
    private _tokenService;
    constructor(_userRepository: IUserRepository, _tokenService: ITokenService);
    execute(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
//# sourceMappingURL=RefreshToken.d.ts.map