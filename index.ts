import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './src/infrastructure/database/mongoose';
import apiRoutes from './src/infrastructure/routes/expressRoutes';
import { globalLimiter } from './src/infrastructure/middlewares/rateLimitMiddleware';
import { errorMiddleware } from './src/infrastructure/middlewares/errorMiddleware';
import { AppConfig } from './src/infrastructure/config/AppConfig';
import { initializeHandlers } from './src/infrastructure/config/dependencyInjection';


const app = express();

// Trust proxy (required for Render/Vercel rate limiting)
app.set('trust proxy', 1);

// Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
      },
    },
  })
);

const allowedOrigins: string[] = [
  AppConfig.FRONTEND_URL,
  AppConfig.FRONTEND_URL.replace(/\/$/, ''),
  AppConfig.FRONTEND_URL.replace(/\/$/, '') + '/',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
  })
);

app.use(express.json());
app.use(cookieParser());

// Rate limiting
app.use('/api', globalLimiter);

// Routes
app.use('/api', apiRoutes);

// Global Error Handler
app.use(errorMiddleware);

// Startup Sequence
const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB(AppConfig.MONGO_URI);
    
    // 2. Initialize asynchronous handlers/listeners
    initializeHandlers();

    // 3. Start Listening
    app.listen(AppConfig.PORT, () => {
      console.log(`Server running in ${AppConfig.NODE_ENV} mode on port ${AppConfig.PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
