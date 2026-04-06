import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import connectDB from './src/infrastructure/database/mongoose.js';
import apiRoutes from './src/interfaces/routes/api.js';
import { globalLimiter } from './src/infrastructure/middlewares/rateLimitMiddleware.js';
import { STATUS_CODES } from './src/interfaces/constants/statusCodes.js';

dotenv.config();

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com"],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

// Security Middlewares
app.use('/api', globalLimiter);


// Connect to Database
connectDB();

// Routes
app.use('/api', apiRoutes);

// Error Handling
app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err.stack || err.message || err);
  
  if (res.headersSent) {
    return next(err);
  }

  let status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  if (err.status && typeof err.status === 'number') {
    status = err.status;
  } else if (err.statusCode && typeof err.statusCode === 'number') {
    status = err.statusCode;
  }

  res.status(status).json({
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? 'Server Error' : err.message
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
