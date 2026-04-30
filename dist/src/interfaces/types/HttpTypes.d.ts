import { ApiResponse } from './ApiResponse';
export interface HttpRequest {
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
export interface HttpResponse {
    status: (code: number) => HttpResponse;
    json: <T>(data: ApiResponse<T>) => HttpResponse;
    cookie: (name: string, value: string, options?: any) => HttpResponse;
    clearCookie: (name: string, options?: any) => HttpResponse;
}
export type HttpNext = (error?: any) => void;
//# sourceMappingURL=HttpTypes.d.ts.map