import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { IUserRepository } from '../../ports/IUserRepository';
import { IRegisterUser } from '../../ports/IUseCases';
import { IUserDTO } from '../../dtos/IUserDTO';
/**
 * Use case for registering a new user.
 */
export declare class RegisterUser implements IRegisterUser {
    private _userRepository;
    private _passwordHasher;
    constructor(_userRepository: IUserRepository, _passwordHasher: IPasswordHasher);
    execute({ name, email, password, role }: Parameters<IRegisterUser['execute']>[0]): Promise<IUserDTO>;
}
//# sourceMappingURL=RegisterUser.d.ts.map