import { type Request, type Response,type NextFunction } from 'express';
import { AppError } from "@platform/errors"
import { logger } from '@platform/logger';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.warn(`[${req.method}] ${req.path} - ${err.statusCode}: ${err.message}`);
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  if (err.name === 'ZodError') {
    return res.status(400).json({
      status: 'fail',
      errors: (err as any).errors,
    });
  }
  logger.error(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};