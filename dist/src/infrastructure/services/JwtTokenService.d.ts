import { ITokenService, ITokenPayload } from '../../application/ports/ITokenService';
/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
export declare class JwtTokenService extends ITokenService {
    private accessSecret;
    private refreshSecret;
    constructor(accessSecret: string, refreshSecret: string);
    generateAccessToken(payload: ITokenPayload): string;
    generateRefreshToken(payload: ITokenPayload): string;
    verifyAccessToken(token: string): ITokenPayload;
    verifyRefreshToken(token: string): ITokenPayload;
}
//# sourceMappingURL=JwtTokenService.d.ts.map