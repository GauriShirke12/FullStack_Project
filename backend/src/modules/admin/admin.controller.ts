import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { getDashboardStats } from "./admin.service";
import { prisma } from "../../lib/prisma";
import { unauthorized } from "../../utils/errors";

export const dashboardHandler = asyncHandler(async (_req: Request, res: Response) => {
  if (!_req.user) {
    throw unauthorized("Unauthorized");
  }

  const stats = await getDashboardStats();
  const currentUser = await prisma.user.findUnique({
    where: { id: _req.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      address: true
    }
  });

  res.status(200).json({ success: true, data: { stats, currentUser } });
});
