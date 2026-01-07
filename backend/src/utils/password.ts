import bcrypt from "bcryptjs";
import { env } from "../config/env";

export const hashPassword = async (plain: string): Promise<string> => {
  return bcrypt.hash(plain, env.bcryptSaltRounds);
};

export const comparePassword = async (plain: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(plain, hash);
};
