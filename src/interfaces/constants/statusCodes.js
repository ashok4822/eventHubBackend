/**
 * HTTP Status Codes constants for improved readability and maintainability.
 */
export const STATUS_CODES = {
  // Success Responses
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

  // Client Error Responses
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,

  // Server Error Responses
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};
