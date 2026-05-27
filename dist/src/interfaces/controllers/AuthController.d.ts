import { IHttpRequest, IHttpResponse, HttpNext } from '../types/HttpTypes';
import { ICookieSettings } from '../../application/ports/IAppConfig';
import { IRegisterUser, ILoginUser, IRefreshToken, IRequestPasswordReset, IResetPassword } from '../../application/ports/IUseCases';
/**
 * Controller for user authentication and authorization.
 */
export declare class AuthController {
    private registerUseCase;
    private loginUseCase;
    private refreshTokenUseCase;
    private requestPasswordResetUseCase;
    private resetPasswordUseCase;
    private config;
    constructor(registerUseCase: IRegisterUser, loginUseCase: ILoginUser, refreshTokenUseCase: IRefreshToken, requestPasswordResetUseCase: IRequestPasswordReset, resetPasswordUseCase: IResetPassword, config: ICookieSettings);
    register(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    login(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    refresh(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    logout(req: IHttpRequest, res: IHttpResponse): Promise<void>;
    forgotPassword(req: IHttpRequest, res: IHttpResponse): Promise<void>;
    resetPassword(req: IHttpRequest, res: IHttpResponse): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map