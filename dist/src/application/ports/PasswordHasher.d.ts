/**
 * Abstract interface for password hashing and verification.
 */
export declare abstract class PasswordHasher {
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=PasswordHasher.d.ts.map