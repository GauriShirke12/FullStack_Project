import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { UserListFilters, listUsers, getUserDetail } from "./users.service";
import { isRole } from "../../types/roles";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const filters: Partial<UserListFilters> = {};

  if (typeof req.query.name === "string") {
    filters.name = req.query.name;
  }

  if (typeof req.query.email === "string") {
    filters.email = req.query.email;
  }

  if (typeof req.query.address === "string") {
    filters.address = req.query.address;
  }

  if (typeof req.query.role === "string" && isRole(req.query.role)) {
    filters.role = req.query.role;
  }

  if (typeof req.query.sortBy === "string") {
    filters.sortBy = req.query.sortBy as "name" | "email" | "address" | "role" | "createdAt";
  }

  if (req.query.sortOrder === "asc" || req.query.sortOrder === "desc") {
    filters.sortOrder = req.query.sortOrder;
  }

  const users = await listUsers(filters);
  res.status(200).json({ success: true, data: users });
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const user = await getUserDetail(userId);
  res.status(200).json({ success: true, data: user });
});
