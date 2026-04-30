export interface TokenPayload {
    id: string;
    role?: string;
    [key: string]: unknown;
}
/**
 * Abstract interface for token generation and verification.
 */
export declare abstract class TokenService {
    abstract generateAccessToken(payload: TokenPayload): string;
    abstract generateRefreshToken(payload: TokenPayload): string;
    abstract verifyAccessToken(token: string): TokenPayload;
    abstract verifyRefreshToken(token: string): TokenPayload;
}
//# sourceMappingURL=TokenService.d.ts.map