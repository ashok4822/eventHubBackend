/**
 * Use case for registering a new user.
 */
class RegisterUser {
  constructor(userRepository, passwordHasher) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
  }

  /**
   * Executes the user registration logic.
   * 
   * @param {Object} userData - Data for the new user.
   * @param {string} userData.name - User's full name.
   * @param {string} userData.email - User's unique email.
   * @param {string} userData.password - User's plain text password.
   * @param {string} [userData.role='user'] - User's role (user or admin).
   * @returns {Promise<Object>} The registered user object.
   * @throws {Error} If validation fails or user already exists.
   */
  async execute({ name, email, password, role }) {
    if (!name || !email || !password) {
      throw new Error('Name, email, and password are required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.passwordHasher.hash(password);
    const newUser = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role
    });

    return newUser;
  }
}

/**
 * Use case for authenticating a user.
 */
class LoginUser {
  constructor(userRepository, passwordHasher, tokenService) {
    this.userRepository = userRepository;
    this.passwordHasher = passwordHasher;
    this.tokenService = tokenService;
  }

  /**
   * Executes the user login logic.
   * 
   * @param {Object} credentials - User credentials.
   * @param {string} credentials.email - User's email.
   * @param {string} credentials.password - User's password.
   * @returns {Promise<Object>} An object containing the JWT token and simplified user info.
   * @throws {Error} If credentials are invalid.
   */
  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await this.passwordHasher.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const accessToken = this.tokenService.generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = this.tokenService.generateRefreshToken({ id: user._id });

    return { accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  }
}

export { RegisterUser, LoginUser };

