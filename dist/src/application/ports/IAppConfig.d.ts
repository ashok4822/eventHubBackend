/**
 * Interface for application configuration to decouple infrastructure from application logic.
 */
export interface IJwtConfig {
    ACCESS_SECRET: string;
    REFRESH_SECRET: string;
}
export interface ICookieSettings {
    httpOnly: boolean;
    secure: boolean;
    sameSite: 'none' | 'lax' | 'strict';
    maxAge: number;
}
export interface IEmailConfig {
    service: string;
    auth: {
        user: string | undefined;
        pass: string | undefined;
    };
}
export interface IServerConfig {
    NODE_ENV: string;
    PORT: string | number;
    MONGO_URI: string;
}
export interface IAppConfig extends IServerConfig {
    JWT: IJwtConfig;
    COOKIE_SETTINGS: ICookieSettings;
    EMAIL: IEmailConfig;
    FRONTEND_URL: string;
}
//# sourceMappingURL=IAppConfig.d.ts.map