"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("./src/infrastructure/database/mongoose"));
const expressRoutes_1 = __importDefault(require("./src/infrastructure/routes/expressRoutes"));
const rateLimitMiddleware_1 = require("./src/infrastructure/middlewares/rateLimitMiddleware");
const errorMiddleware_1 = require("./src/infrastructure/middlewares/errorMiddleware");
const AppConfig_1 = require("./src/infrastructure/config/AppConfig");
const dependencyInjection_1 = require("./src/infrastructure/config/dependencyInjection");
const app = (0, express_1.default)();
// Trust proxy (required for Render/Vercel rate limiting)
app.set('trust proxy', 1);
// Security Middleware
app.use((0, helmet_1.default)({
    contentSecurityPolicy: {
        directives: {
            ...helmet_1.default.contentSecurityPolicy.getDefaultDirectives(),
            'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            'font-src': ["'self'", 'https://fonts.gstatic.com'],
        },
    },
}));
const allowedOrigins = [
    AppConfig_1.AppConfig.FRONTEND_URL,
    AppConfig_1.AppConfig.FRONTEND_URL.replace(/\/$/, ''),
    AppConfig_1.AppConfig.FRONTEND_URL.replace(/\/$/, '') + '/',
];
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Set-Cookie'],
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// Rate limiting
app.use('/api', rateLimitMiddleware_1.globalLimiter);
// Routes
app.use('/api', expressRoutes_1.default);
// Global Error Handler
app.use(errorMiddleware_1.errorMiddleware);
// Startup Sequence
const startServer = async () => {
    try {
        // 1. Connect to Database
        await (0, mongoose_1.default)(AppConfig_1.AppConfig.MONGO_URI);
        // 2. Initialize asynchronous handlers/listeners
        (0, dependencyInjection_1.initializeHandlers)();
        // 3. Start Listening
        app.listen(AppConfig_1.AppConfig.PORT, () => {
            console.log(`Server running in ${AppConfig_1.AppConfig.NODE_ENV} mode on port ${AppConfig_1.AppConfig.PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=index.js.map