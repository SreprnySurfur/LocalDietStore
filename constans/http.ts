import { ObjectValuesAsType } from "../models/common";

export const STATUS_CODES = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  CREATED: 201,
  FAILED_DEPENDENCY: 424,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  NO_CONTENT: 204,
  NOT_FOUND: 404,
  OK: 200,
  TOO_MANY_REQUESTS: 429,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_CONTENT: 422,
} as const;

/***
 *  This type contain list of response status codes and its reason phrases.
 */
export type ResponseStatusCodes = ObjectValuesAsType<typeof STATUS_CODES>;

export const METHODS = {
  DELETE: "DELETE",
  GET: "GET",
  PATCH: "PATCH",
  POST: "POST",
  PUT: "PUT",
} as const;

export type RequestMethods = ObjectValuesAsType<typeof METHODS>;
