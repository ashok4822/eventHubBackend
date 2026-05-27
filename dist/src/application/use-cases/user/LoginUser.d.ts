import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { ITokenService } from '../../ports/ITokenService';
import { IUserRepository } from '../../ports/UserRepository';
import { ILoginUser } from '../../ports/IUseCases';
import { IAuthResponseDTO } from '../../dtos/UserDTO';
/**
 * Use case for authenticating a user.
 */
export declare class LoginUser implements ILoginUser {
    private userRepository;
    private passwordHasher;
    private tokenService;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher, tokenService: ITokenService);
    execute({ email, password }: Parameters<ILoginUser['execute']>[0]): Promise<IAuthResponseDTO>;
}
//# sourceMappingURL=LoginUser.d.ts.map