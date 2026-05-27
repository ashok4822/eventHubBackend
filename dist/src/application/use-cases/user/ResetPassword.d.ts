import { IUserRepository } from '../../ports/UserRepository';
import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { IResetPassword } from '../../ports/IUseCases';
/**
 * Use case for resetting a password using a token.
 */
export declare class ResetPassword implements IResetPassword {
    private userRepository;
    private passwordHasher;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher);
    execute(token: string, password: string): Promise<void>;
}
//# sourceMappingURL=ResetPassword.d.ts.map