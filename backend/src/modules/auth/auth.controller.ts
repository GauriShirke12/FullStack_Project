import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { changePassword, loginUser, signUpUser, refreshTokens, adminCreateUser } from "./auth.service";
import { verifyRefreshToken } from "../../utils/jwt";
import { prisma } from "../../lib/prisma";
import { unauthorized } from "../../utils/errors";

export const signUp = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await signUpUser(req.body);
  res.status(201).json({ success: true, data: tokens });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const tokens = await loginUser(req.body);
  res.status(200).json({ success: true, data: tokens });
});

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  const payload = verifyRefreshToken(refreshToken);
  const tokens = await refreshTokens(payload);
  res.status(200).json({ success: true, data: tokens });
});

export const updatePassword = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw unauthorized("Unauthorized");
  }

  const { currentPassword, newPassword } = req.body;
  await changePassword(req.user.id, currentPassword, newPassword);
  res.status(204).send();
});

export const createUserAsAdmin = asyncHandler(async (req: Request, res: Response) => {
  const user = await adminCreateUser(req.body);
  res.status(201).json({ success: true, data: user });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  if (!req.user) {
    throw unauthorized("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      address: true,
      role: true,
      createdAt: true,
      updatedAt: true
    }
  });

  res.status(200).json({ success: true, data: user });
});
