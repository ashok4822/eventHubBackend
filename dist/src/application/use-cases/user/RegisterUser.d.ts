import { IPasswordHasher } from '../../ports/IPasswordHasher';
import { IUserRepository } from '../../ports/UserRepository';
import { IRegisterUser } from '../../ports/IUseCases';
import { IUserDTO } from '../../dtos/UserDTO';
/**
 * Use case for registering a new user.
 */
export declare class RegisterUser implements IRegisterUser {
    private userRepository;
    private passwordHasher;
    constructor(userRepository: IUserRepository, passwordHasher: IPasswordHasher);
    execute({ name, email, password, role }: Parameters<IRegisterUser['execute']>[0]): Promise<IUserDTO>;
}
//# sourceMappingURL=RegisterUser.d.ts.map