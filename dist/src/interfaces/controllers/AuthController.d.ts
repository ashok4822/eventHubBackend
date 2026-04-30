import { HttpRequest, HttpResponse, HttpNext } from '../types/HttpTypes';
import { ICookieSettings } from '../../application/ports/IAppConfig';
import { IRegisterUser, ILoginUser, IRefreshToken } from '../../application/ports/IUseCases';
/**
 * Controller for user authentication and authorization.
 */
export declare class AuthController {
    private registerUseCase;
    private loginUseCase;
    private refreshTokenUseCase;
    private config;
    constructor(registerUseCase: IRegisterUser, loginUseCase: ILoginUser, refreshTokenUseCase: IRefreshToken, config: ICookieSettings);
    register(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    login(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    refresh(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void>;
    logout(req: HttpRequest, res: HttpResponse): Promise<void>;
}
//# sourceMappingURL=AuthController.d.ts.map