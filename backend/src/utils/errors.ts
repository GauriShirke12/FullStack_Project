export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    const captureStack = (Error as ErrorConstructor & {
      captureStackTrace?: (target: unknown, constructorOpt?: Function) => void;
    }).captureStackTrace;
    if (typeof captureStack === "function") {
      captureStack(this, this.constructor);
    }
  }
}

export const notFound = (message: string): AppError => new AppError(message, 404);
export const unauthorized = (message: string): AppError => new AppError(message, 401);
export const forbidden = (message: string): AppError => new AppError(message, 403);
export const badRequest = (message: string): AppError => new AppError(message, 400);