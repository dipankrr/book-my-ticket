class AppError extends Error {
  constructor(message, statusCode, code, details = null) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }

  static badRequest(msg = "Bad Request") {
    return new AppError(msg, 400, "BAD_REQUEST");
  }

  static unauthorized(msg = "Unauthorized") {
    return new AppError(msg, 401, "UNAUTHORIZED");
  }

  static notFound(msg = "Not Found") {
    return new AppError(msg, 404, "NOT_FOUND");
  }

  static conflict(msg = "Conflict") {
    return new AppError(msg, 409, "CONFLICT");
  }

  static validation(errors) {
    return new AppError(
      "Validation failed",
      400,
      "VALIDATION_ERROR",
      errors
    );
  }
}