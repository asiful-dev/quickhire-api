export class AppError extends Error {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly isOperational: boolean;
  public readonly details?: any;
  public readonly timestamp: string;

  constructor(
    statusCode: number,
    message: string,
    isOperational: boolean = true,
    details?: unknown
  ) {
    super(message);

    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = isOperational;
    this.details = details;
    this.timestamp = new Date().toISOString();

    // Maintains proper stack trace for where error was thrown
    Error.captureStackTrace(this, this.constructor);
  }

  // Static factory methods for common errors
  static badRequest(message: string = "Bad Request", details?: any): AppError {
    return new AppError(400, message, true, details);
  }

  static unauthorized(
    message: string = "Unauthorized",
    details?: any
  ): AppError {
    return new AppError(401, message, true, details);
  }

  static forbidden(message: string = "Forbidden", details?: any): AppError {
    return new AppError(403, message, true, details);
  }

  static notFound(
    message: string = "Resource not found",
    details?: any
  ): AppError {
    return new AppError(404, message, true, details);
  }

  static conflict(message: string = "Conflict", details?: any): AppError {
    return new AppError(409, message, true, details);
  }

  static unprocessableEntity(
    message: string = "Validation failed",
    details?: any
  ): AppError {
    return new AppError(422, message, true, details);
  }

  static internal(
    message: string = "Internal server error",
    details?: any
  ): AppError {
    return new AppError(500, message, false, details);
  }
}
