import { IApiResponse } from './ApiResponse';
export interface IHttpRequest {
    body: any;
    query: any;
    params: any;
    headers: any;
    cookies: any;
    user?: {
        id: string;
        role: string;
        [key: string]: any;
    };
}
export interface IHttpResponse {
    status: (code: number) => IHttpResponse;
    json: <T>(data: IApiResponse<T>) => IHttpResponse;
    cookie: (name: string, value: string, options?: Record<string, unknown> | object) => IHttpResponse;
    clearCookie: (name: string, options?: Record<string, unknown>) => IHttpResponse;
}
export type HttpNext = (error?: unknown) => void;
//# sourceMappingURL=HttpTypes.d.ts.map