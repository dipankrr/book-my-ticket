export const globalErrorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;

//   logger.error({
//     message: err.message,
//     code: err.code,
//     stack: err.stack,
//     requestId: req.requestId,
//   });

  const response = {
    success: false,
    message: err.isOperational
      ? err.message
      : "Internal Server Error",
    code: err.code || "INTERNAL_ERROR",
  };

  if (err.details) {
    response.errors = err.details;
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  res.status(status).json(response);
}