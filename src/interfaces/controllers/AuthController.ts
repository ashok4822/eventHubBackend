import { IHttpRequest, IHttpResponse, HttpNext } from '../types/IHttpTypes';
import { UnauthorizedError } from '../../application/errors/AppErrors';
import { STATUS_CODES } from '../constants/statusCodes';
import { MESSAGES } from '../constants/messages';
import { ICookieSettings } from '../../application/ports/IAppConfig';
import { 
  IRegisterUser, 
  ILoginUser, 
  IRefreshToken, 
  IRequestPasswordReset, 
  IResetPassword 
} from '../../application/ports/IUseCases';

/**
 * Controller for user authentication and authorization.
 */
export class AuthController {
  constructor(
    private _registerUseCase: IRegisterUser,
    private _loginUseCase: ILoginUser,
    private _refreshTokenUseCase: IRefreshToken,
    private _requestPasswordResetUseCase: IRequestPasswordReset,
    private _resetPasswordUseCase: IResetPassword,
    private _config: ICookieSettings,
  ) { }


  async register(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void> {
    const { name, email, password, role } = req.body;
    const user = await this._registerUseCase.execute({ name, email, password, role });
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTERED,
      data: user
    });
  }

  async login(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void> {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await this._loginUseCase.execute({ email, password });

    if (refreshToken) {
      res.cookie('refreshToken', refreshToken, this._config);
    }

    res.json({ 
      success: true, 
      message: MESSAGES.AUTH.LOGGED_IN, // I'll check if this exists or just use a generic one
      data: { accessToken, user } 
    });
  }

  async refresh(req: IHttpRequest, res: IHttpResponse, _next: HttpNext): Promise<void> {
    const refreshToken: string | undefined = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError(MESSAGES.AUTH.REFRESH_TOKEN_MISSING);
    }

    const { accessToken } = await this._refreshTokenUseCase.execute(refreshToken);
    res.json({ 
      success: true, 
      data: { accessToken } 
    });
  }

  async logout(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    res.clearCookie('refreshToken', {
      httpOnly: this._config.httpOnly,
      secure: this._config.secure,
      sameSite: this._config.sameSite,
    });
    res.json({ 
      success: true, 
      message: MESSAGES.AUTH.LOGGED_OUT 
    });
  }

  async forgotPassword(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    const { email } = req.body;
    await this._requestPasswordResetUseCase.execute(email);
    res.json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.'
    });
  }

  async resetPassword(req: IHttpRequest, res: IHttpResponse): Promise<void> {
    const { token } = req.params;
    const { password } = req.body;
    await this._resetPasswordUseCase.execute(token, password);
    res.json({
      success: true,
      message: 'Password has been reset successfully.'
    });
  }
}


