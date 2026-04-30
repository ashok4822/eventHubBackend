import { PasswordHasher } from '../../ports/PasswordHasher';
import { TokenService } from '../../ports/TokenService';
import { UserRepository } from '../../ports/UserRepository';
import { ILoginUser } from '../../ports/IUseCases';
import { AuthResponseDTO } from '../../dtos/UserDTO';
/**
 * Use case for authenticating a user.
 */
export declare class LoginUser implements ILoginUser {
    private userRepository;
    private passwordHasher;
    private tokenService;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, tokenService: TokenService);
    execute({ email, password }: Parameters<ILoginUser['execute']>[0]): Promise<AuthResponseDTO>;
}
//# sourceMappingURL=LoginUser.d.ts.map