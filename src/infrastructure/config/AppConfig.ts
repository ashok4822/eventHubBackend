import { IAppConfig } from '../../application/ports/IAppConfig';

/**
 * Configuration for the application, centralizing environment variables.
 */
export const AppConfig: IAppConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || '',
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'access_secret',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_secret',
  },
  COOKIE_SETTINGS: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: (process.env.NODE_ENV === 'production' ? 'none' : 'lax') as 'none' | 'lax',
    maxAge: Number(process.env.COOKIE_MAX_AGE) || 7 * 24 * 60 * 60 * 1000,
  },
  EMAIL: {
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:5173'
};

