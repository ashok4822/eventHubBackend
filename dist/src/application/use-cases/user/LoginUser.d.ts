import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { ITokenService } from '../../ports/ITokenService';
import { IUserRepository } from '../../ports/IUserRepository';
import { ILoginUser } from '../../ports/IUseCases';
import { IAuthResponseDTO } from '../../dtos/IUserDTO';
/**
 * Use case for authenticating a user.
 */
export declare class LoginUser implements ILoginUser {
    private _userRepository;
    private _passwordHasher;
    private _tokenService;
    constructor(_userRepository: IUserRepository, _passwordHasher: IPasswordHasher, _tokenService: ITokenService);
    execute({ email, password }: Parameters<ILoginUser['execute']>[0]): Promise<IAuthResponseDTO>;
}
//# sourceMappingURL=LoginUser.d.ts.map