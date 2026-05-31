import { IUserRepository } from '../../ports/IUserRepository';
import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { IResetPassword } from '../../ports/IUseCases';
/**
 * Use case for resetting a password using a token.
 */
export declare class ResetPassword implements IResetPassword {
    private _userRepository;
    private _passwordHasher;
    constructor(_userRepository: IUserRepository, _passwordHasher: IPasswordHasher);
    execute(token: string, password: string): Promise<void>;
}
//# sourceMappingURL=ResetPassword.d.ts.map