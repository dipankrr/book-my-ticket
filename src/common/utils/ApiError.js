class ApiError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }

  static badRequest(msg = "Bad Request") {
    return new ApiError(msg, 400, "BAD_REQUEST");
  }

  static unauthorized(msg = "Unauthorized") {
    return new ApiError(msg, 401, "UNAUTHORIZED");
  }

  static forbidden(msg = "forbidden") {
    return new ApiError(msg, 412, "FORBIDDEN");
  }

  static notFound(msg = "Not Found") {
    return new ApiError(msg, 404, "NOT_FOUND");
  }

  static conflict(msg = "Conflict") {
    return new ApiError(msg, 409, "CONFLICT");
  }

  static failed(msg = "Fail") {
    return new ApiError(msg, 400, "FAILED");
  }

  static validation(errors) {
    return new ApiError(
      "Validation failed",
      400,
      "VALIDATION_ERROR",
      errors
    );
  }
}

export default ApiError;