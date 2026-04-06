import { STATUS_CODES } from '../constants/statusCodes.js';

/**
 * Controller for user authentication and authorization.
 */
class AuthController {
  constructor(registerUseCase, loginUseCase, userRepository, tokenService) {
    this.registerUseCase = registerUseCase;
    this.loginUseCase = loginUseCase;
    this.userRepository = userRepository;
    this.tokenService = tokenService;
  }

  /**
   * Registers a new user in the system.
   */
  async register(req, res) {
    try {
      const user = await this.registerUseCase.execute(req.body);
      res.status(STATUS_CODES.CREATED).json({ 
        message: 'User registered successfully', 
        user: { id: user._id, name: user.name, email: user.email, role: user.role } 
      });
    } catch (error) {
      res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.message });
    }
  }

  /**
   * Authenticates a user and sets a Refresh Token in an HttpOnly cookie.
   */
  async login(req, res) {
    try {
      const { accessToken, refreshToken, user } = await this.loginUseCase.execute(req.body);

      // Set Refresh Token in HttpOnly cookie
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({ accessToken, user });
    } catch (error) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ error: error.message });
    }
  }

  /**
   * Refreshes the Access Token using the Refresh Token from the cookie.
   */
  async refresh(req, res) {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ error: 'Refresh token missing' });
    }

    try {
      const decoded = this.tokenService.verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET || 'refresh_secret');
      const user = await this.userRepository.findById(decoded.id);

      if (!user) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({ error: 'User not found' });
      }

      const accessToken = this.tokenService.generateAccessToken({ id: user._id, role: user.role });

      res.json({ accessToken });
    } catch (error) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ error: 'Invalid refresh token' });
    }
  }

  /**
   * Logs out the user by clearing the Refresh Token cookie.
   */
  async logout(req, res) {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  }
}

export { AuthController };


