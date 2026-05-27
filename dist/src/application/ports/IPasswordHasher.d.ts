/**
 * Abstract interface for password hashing and verification.
 */
export declare abstract class IPasswordHasher {
    abstract hash(password: string): Promise<string>;
    abstract compare(password: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=IPasswordHasher.d.ts.map