export interface ITokenPayload {
    id: string;
    role?: string;
    [key: string]: unknown;
}
/**
 * Abstract interface for token generation and verification.
 */
export declare abstract class ITokenService {
    abstract generateAccessToken(payload: ITokenPayload): string;
    abstract generateRefreshToken(payload: ITokenPayload): string;
    abstract verifyAccessToken(token: string): ITokenPayload;
    abstract verifyRefreshToken(token: string): ITokenPayload;
}
//# sourceMappingURL=ITokenService.d.ts.map