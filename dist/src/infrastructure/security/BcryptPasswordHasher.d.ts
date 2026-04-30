import { PasswordHasher } from '../../application/ports/PasswordHasher';
/**
 * Concrete implementation of PasswordHasher using bcryptjs.
 */
export declare class BcryptPasswordHasher extends PasswordHasher {
    hash(password: string): Promise<string>;
    compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=BcryptPasswordHasher.d.ts.map