import { ITokenService, ITokenPayload } from '../../application/ports/ITokenService';
/**
 * Concrete implementation of TokenService using jsonwebtoken.
 */
export declare class JwtTokenService extends ITokenService {
    private _accessSecret;
    private _refreshSecret;
    constructor(_accessSecret: string, _refreshSecret: string);
    generateAccessToken(payload: ITokenPayload): string;
    generateRefreshToken(payload: ITokenPayload): string;
    verifyAccessToken(token: string): ITokenPayload;
    verifyRefreshToken(token: string): ITokenPayload;
}
//# sourceMappingURL=JwtTokenService.d.ts.map