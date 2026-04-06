import jwt from 'jsonwebtoken';
import { STATUS_CODES } from '../../interfaces/constants/statusCodes.js';

/**
 * Middleware to protect routes by verifying the JWT token.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET || 'access_secret');
      req.user = decoded;
      next();
    } catch (error) {
      res.status(STATUS_CODES.UNAUTHORIZED).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(STATUS_CODES.UNAUTHORIZED).json({ error: 'Not authorized, no token' });
  }
};

/**
 * Middleware to restrict access to admin users only.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(STATUS_CODES.FORBIDDEN).json({ error: 'Not authorized as an admin' });
  }
};

export { protect, admin };
