import { prisma } from "../../lib/prisma";
import { badRequest, unauthorized } from "../../utils/errors";
import { hashPassword, comparePassword } from "../../utils/password";
import { signAccessToken, signRefreshToken } from "../../utils/jwt";
import { Role, Roles, toRole } from "../../types/roles";

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export const signUpUser = async (input: {
  name: string;
  email: string;
  address?: string;
  password: string;
}): Promise<AuthTokens> => {
  const email = input.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw badRequest("Email already exists");
  }

  const passwordHash = await hashPassword(input.password);

  const user = await prisma.user.create({
    data: {
      name: input.name.trim(),
      email,
      address: input.address?.trim() ?? null,
      passwordHash,
      role: Roles.USER
    }
  });

  const role = toRole(user.role);
  return issueTokens(user.id, user.email, role);
};

export const adminCreateUser = async (input: {
  name: string;
  email: string;
  address?: string;
  password: string;
  role: Role;
}) => {
  const email = input.email.toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw badRequest("Email already exists");
  }

  const passwordHash = await hashPassword(input.password);

  return prisma.user.create({
    data: {
      name: input.name.trim(),
      email,
      address: input.address?.trim() ?? null,
      passwordHash,
      role: input.role
    },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true
    }
  });
};

export const loginUser = async (input: { email: string; password: string }): Promise<AuthTokens> => {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user) {
    throw unauthorized("Invalid credentials");
  }

  const isValid = await comparePassword(input.password, user.passwordHash);
  if (!isValid) {
    throw unauthorized("Invalid credentials");
  }

  const role = toRole(user.role);
  return issueTokens(user.id, user.email, role);
};

export const refreshTokens = async (payload: { sub: number; email: string; role: Role }): Promise<AuthTokens> => {
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user || user.email !== payload.email) {
    throw unauthorized("Invalid refresh token");
  }

  const role = toRole(user.role);
  if (role !== payload.role) {
    throw unauthorized("Invalid refresh token");
  }

  return issueTokens(user.id, user.email, role);
};

export const changePassword = async (userId: number, currentPassword: string, newPassword: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw unauthorized("User not found");
  }

  const isValid = await comparePassword(currentPassword, user.passwordHash);
  if (!isValid) {
    throw unauthorized("Current password is incorrect");
  }

  const newHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash: newHash }
  });
};

const issueTokens = (userId: number, email: string, role: Role): AuthTokens => ({
  accessToken: signAccessToken({ sub: userId, email, role }),
  refreshToken: signRefreshToken({ sub: userId, email, role })
});
