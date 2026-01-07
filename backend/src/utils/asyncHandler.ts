import { NextFunction, Request, Response } from "express";

export const asyncHandler = <T extends (req: Request, res: Response, next: NextFunction) => Promise<unknown>>(
  handler: T
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch(next);
  };
};
