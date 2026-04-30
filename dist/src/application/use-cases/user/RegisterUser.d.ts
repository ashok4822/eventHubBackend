import { PasswordHasher } from '../../ports/PasswordHasher';
import { UserRepository } from '../../ports/UserRepository';
import { IRegisterUser } from '../../ports/IUseCases';
import { UserDTO } from '../../dtos/UserDTO';
/**
 * Use case for registering a new user.
 */
export declare class RegisterUser implements IRegisterUser {
    private userRepository;
    private passwordHasher;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher);
    execute({ name, email, password, role }: Parameters<IRegisterUser['execute']>[0]): Promise<UserDTO>;
}
//# sourceMappingURL=RegisterUser.d.ts.map