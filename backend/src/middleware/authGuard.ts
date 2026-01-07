import { NextFunction, Request, Response } from "express";
import { unauthorized, forbidden } from "../utils/errors";
import { verifyAccessToken } from "../utils/jwt";
import { Role } from "../types/roles";

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next(unauthorized("Missing authorization header"));
    return;
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    next(unauthorized("Missing bearer token"));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
      email: payload.email
    };
    next();
  } catch (error) {
    next(unauthorized("Invalid or expired token"));
  }
};

export const authorize = (roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(unauthorized("Authentication required"));
      return;
    }

    if (!roles.includes(req.user.role)) {
      next(forbidden("Insufficient permissions"));
      return;
    }

    next();
  };
};
