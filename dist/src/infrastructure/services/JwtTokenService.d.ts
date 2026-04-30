import { TokenService, TokenPayload } from '../../application/ports/TokenService';
/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
export declare class JwtTokenService extends TokenService {
    private accessSecret;
    private refreshSecret;
    constructor(accessSecret: string, refreshSecret: string);
    generateAccessToken(payload: TokenPayload): string;
    generateRefreshToken(payload: TokenPayload): string;
    verifyAccessToken(token: string): TokenPayload;
    verifyRefreshToken(token: string): TokenPayload;
}
//# sourceMappingURL=JwtTokenService.d.ts.map