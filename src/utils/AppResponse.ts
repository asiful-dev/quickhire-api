export class AppResponse<T = unknown> {
  public readonly statusCode: number;
  public readonly success: boolean;
  public readonly message: string;
  public readonly data?: T;
  public readonly meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
  public readonly timestamp: string;

  constructor(
    statusCode: number,
    message: string = "Success",
    data?: T,
    meta?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    }
  ) {
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.timestamp = new Date().toISOString();
  }

  // Static factory methods for common responses
  static ok<T>(data?: T, message: string = "Success"): AppResponse<T> {
    return new AppResponse(200, message, data);
  }

  static created<T>(
    data?: T,
    message: string = "Resource created successfully"
  ): AppResponse<T> {
    return new AppResponse(201, message, data);
  }

  static paginated<T>(
    data: T,
    page: number,
    limit: number,
    total: number,
    message: string = "Success"
  ): AppResponse<T> {
    return new AppResponse(200, message, data, {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    });
  }
}
