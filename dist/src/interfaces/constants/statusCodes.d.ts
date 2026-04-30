/**
 * HTTP Status Codes constants for improved readability and maintainability.
 */
export declare const STATUS_CODES: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly NO_CONTENT: 204;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly CONFLICT: 409;
    readonly UNPROCESSABLE_ENTITY: 422;
    readonly INTERNAL_SERVER_ERROR: 500;
    readonly SERVICE_UNAVAILABLE: 503;
};
export type StatusCode = (typeof STATUS_CODES)[keyof typeof STATUS_CODES];
//# sourceMappingURL=statusCodes.d.ts.map