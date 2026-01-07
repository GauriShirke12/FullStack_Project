import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { StoreFilters, createStore, getOwnerDashboard, listStoresForAdmin, listStoresForUser, updateStore } from "./stores.service";

export const createStoreHandler = asyncHandler(async (req: Request, res: Response) => {
  const store = await createStore(req.body);
  res.status(201).json({ success: true, data: store });
});

export const updateStoreHandler = asyncHandler(async (req: Request, res: Response) => {
  const storeId = Number(req.params.id);
  const store = await updateStore(storeId, req.body);
  res.status(200).json({ success: true, data: store });
});

export const listStoresForAdminHandler = asyncHandler(async (req: Request, res: Response) => {
  const filters: Partial<StoreFilters> = {};

  if (typeof req.query.name === "string") {
    filters.name = req.query.name;
  }

  if (typeof req.query.email === "string") {
    filters.email = req.query.email;
  }

  if (typeof req.query.address === "string") {
    filters.address = req.query.address;
  }

  if (typeof req.query.sortBy === "string") {
    filters.sortBy = req.query.sortBy as "name" | "email" | "address" | "createdAt";
  }

  if (req.query.sortOrder === "asc" || req.query.sortOrder === "desc") {
    filters.sortOrder = req.query.sortOrder;
  }

  const stores = await listStoresForAdmin(filters);
  res.status(200).json({ success: true, data: stores });
});

export const listStoresForUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const filters: Partial<StoreFilters> = {};

  if (typeof req.query.name === "string") {
    filters.name = req.query.name;
  }

  if (typeof req.query.address === "string") {
    filters.address = req.query.address;
  }

  if (typeof req.query.sortBy === "string") {
    filters.sortBy = req.query.sortBy as "name" | "email" | "address" | "createdAt";
  }

  if (req.query.sortOrder === "asc" || req.query.sortOrder === "desc") {
    filters.sortOrder = req.query.sortOrder;
  }

  const stores = await listStoresForUser(filters, req.user!.id);
  res.status(200).json({ success: true, data: stores });
});

export const ownerDashboardHandler = asyncHandler(async (req: Request, res: Response) => {
  const ownerId = req.user!.id;
  const dashboards = await getOwnerDashboard(ownerId);
  res.status(200).json({ success: true, data: dashboards });
});
