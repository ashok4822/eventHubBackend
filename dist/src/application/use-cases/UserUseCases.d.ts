import { PasswordHasher } from '../ports/PasswordHasher';
import { TokenService } from '../ports/TokenService';
import { UserRepository } from '../ports/UserRepository';
import { IUser } from '../../domain/entities/User';
interface RegisterUserData {
    name: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
}
/**
 * Use case for registering a new user.
 */
export declare class RegisterUser {
    private userRepository;
    private passwordHasher;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher);
    execute({ name, email, password, role }: RegisterUserData): Promise<IUser>;
}
interface LoginCredentials {
    email: string;
    password: string;
}
/**
 * Use case for authenticating a user.
 */
export declare class LoginUser {
    private userRepository;
    private passwordHasher;
    private tokenService;
    constructor(userRepository: UserRepository, passwordHasher: PasswordHasher, tokenService: TokenService);
    execute({ email, password }: LoginCredentials): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: string;
        };
    }>;
}
/**
 * Use case for refreshing access tokens.
 */
export declare class RefreshToken {
    private userRepository;
    private tokenService;
    constructor(userRepository: UserRepository, tokenService: TokenService);
    execute(refreshToken: string): Promise<{
        accessToken: string;
    }>;
}
export {};
//# sourceMappingURL=UserUseCases.d.ts.map