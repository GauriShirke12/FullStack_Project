import { Role } from "./roles";

export interface AuthenticatedUser {
  id: number;
  role: Role;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;
    }
  }
}

export {};
