import { IPasswordHasher } from '../../application/ports/IPasswordHasher';
/**
 * Concrete implementation of PasswordHasher using bcryptjs.
 */
export declare class BcryptPasswordHasher extends IPasswordHasher {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=BcryptPasswordHasher.d.ts.map