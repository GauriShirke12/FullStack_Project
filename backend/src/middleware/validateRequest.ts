import { NextFunction, Request, Response } from "express";
import type { ZodTypeAny } from "zod";
import { badRequest } from "../utils/errors";

export const validateRequest = (schema: ZodTypeAny) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query
      });
      next();
    } catch (err) {
      if (err instanceof Error) {
        next(badRequest(err.message));
        return;
      }
      next(err);
    }
  };
};
