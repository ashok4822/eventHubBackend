import { IHttpRequest, IHttpResponse, HttpNext } from '../types/IHttpTypes';
import { ICookieSettings } from '../../application/ports/IAppConfig';
import { IRegisterUser, ILoginUser, IRefreshToken, IRequestPasswordReset, IResetPassword } from '../../application/ports/IUseCases';
/**
 * Controller for user authentication and authorization.
 */
export declare class AuthController {
    private _registerUseCase;
    private _loginUseCase;
    private _refreshTokenUseCase;
    private _requestPasswordResetUseCase;
    private _resetPasswordUseCase;
    private _config;
    constructor(_registerUseCase: IRegisterUser, _loginUseCase: ILoginUser, _refreshTokenUseCase: IRefreshToken, _requestPasswordResetUseCase: IRequestPasswordReset, _resetPasswordUseCase: IResetPassword, _config: ICookieSettings);
    register(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    login(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    refresh(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void>;
    logout(req: IHttpRequest, res: IHttpResponse): Promise<void>;
    forgotPassword(req: IHttpRequest, res: IHttpResponse): Promise<void>;
    resetPassword(req: IHttpRequest, res: IHttpResponse): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map