import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class RegisterUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepository.save({
      name,
      email,
      password: hashedPassword,
      role
    });

    return newUser;
  }
}

class LoginUser {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } };
  }
}

export { RegisterUser, LoginUser };
