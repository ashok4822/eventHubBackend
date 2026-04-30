import { HttpRequest, HttpResponse, HttpNext } from '../types/HttpTypes';
import { UnauthorizedError } from '../../application/errors/AppErrors';
import { STATUS_CODES } from '../constants/statusCodes';
import { MESSAGES } from '../constants/messages';
import { ICookieSettings } from '../../application/ports/IAppConfig';
import { IRegisterUser, ILoginUser, IRefreshToken } from '../../application/ports/IUseCases';

/**
 * Controller for user authentication and authorization.
 */
export class AuthController {
  constructor(
    private registerUseCase: IRegisterUser,
    private loginUseCase: ILoginUser,
    private refreshTokenUseCase: IRefreshToken,
    private requestPasswordResetUseCase: IRequestPasswordReset,
    private resetPasswordUseCase: IResetPassword,
    private config: ICookieSettings,
  ) { }


  async register(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const { name, email, password, role } = req.body;
    const user = await this.registerUseCase.execute({ name, email, password, role });
    res.status(STATUS_CODES.CREATED).json({
      success: true,
      message: MESSAGES.AUTH.REGISTERED,
      data: user
    });
  }

  async login(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await this.loginUseCase.execute({ email, password });

    if (refreshToken) {
      res.cookie('refreshToken', refreshToken, this.config);
    }

    res.json({ 
      success: true, 
      message: MESSAGES.AUTH.LOGGED_IN, // I'll check if this exists or just use a generic one
      data: { accessToken, user } 
    });
  }

  async refresh(req: HttpRequest, res: HttpResponse, next: HttpNext): Promise<void> {
    const refreshToken: string | undefined = req.cookies.refreshToken;

    if (!refreshToken) {
      throw new UnauthorizedError(MESSAGES.AUTH.REFRESH_TOKEN_MISSING);
    }

    const { accessToken } = await this.refreshTokenUseCase.execute(refreshToken);
    res.json({ 
      success: true, 
      data: { accessToken } 
    });
  }

  async logout(req: HttpRequest, res: HttpResponse): Promise<void> {
    res.clearCookie('refreshToken', {
      httpOnly: this.config.httpOnly,
      secure: this.config.secure,
      sameSite: this.config.sameSite,
    });
    res.json({ 
      success: true, 
      message: MESSAGES.AUTH.LOGGED_OUT 
    });
  }

  async forgotPassword(req: HttpRequest, res: HttpResponse): Promise<void> {
    const { email } = req.body;
    await this.requestPasswordResetUseCase.execute(email);
    res.json({
      success: true,
      message: 'If an account exists with that email, a password reset link has been sent.'
    });
  }

  async resetPassword(req: HttpRequest, res: HttpResponse): Promise<void> {
    const { token } = req.params;
    const { password } = req.body;
    await this.resetPasswordUseCase.execute(token, password);
    res.json({
      success: true,
      message: 'Password has been reset successfully.'
    });
  }
}


