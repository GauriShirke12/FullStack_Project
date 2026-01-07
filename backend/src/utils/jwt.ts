import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../config/env";
import { unauthorized } from "./errors";
import { Role, roleValues } from "../types/roles";

interface TokenPayload {
  sub: number;
  role: Role;
  email: string;
}

export const signAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: `${env.accessTokenExpiresInMinutes}m`
  });
};

export const signRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, env.jwtRefreshSecret, {
    expiresIn: `${env.refreshTokenExpiresInDays}d`
  });
};

const parseToken = (token: string, secret: string): TokenPayload => {
  const decoded = jwt.verify(token, secret);

  if (!decoded || typeof decoded === "string") {
    throw unauthorized("Invalid token payload");
  }

  const payload = decoded as JwtPayload;

  if (
    typeof payload.sub !== "number" ||
    typeof payload.email !== "string" ||
    typeof payload.role !== "string" ||
    !roleValues.includes(payload.role as Role)
  ) {
    throw unauthorized("Invalid token payload");
  }

  return {
    sub: payload.sub,
    email: payload.email,
    role: payload.role as Role
  };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return parseToken(token, env.jwtSecret);
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return parseToken(token, env.jwtRefreshSecret);
};
