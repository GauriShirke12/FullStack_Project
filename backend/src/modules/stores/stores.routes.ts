import { Router } from "express";
import { authenticate, authorize } from "../../middleware/authGuard";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createStoreHandler,
  listStoresForAdminHandler,
  listStoresForUserHandler,
  ownerDashboardHandler,
  updateStoreHandler
} from "./stores.controller";
import { createStoreSchema, updateStoreSchema } from "./stores.schemas";
import { Roles } from "../../types/roles";

const adminRouter = Router();
adminRouter.use(authenticate, authorize([Roles.ADMIN]));
adminRouter.get("/", listStoresForAdminHandler);
adminRouter.post("/", validateRequest(createStoreSchema), createStoreHandler);
adminRouter.patch("/:id", validateRequest(updateStoreSchema), updateStoreHandler);

const userRouter = Router();
userRouter.use(authenticate, authorize([Roles.USER, Roles.ADMIN, Roles.OWNER]));
userRouter.get("/", listStoresForUserHandler);

const ownerRouter = Router();
ownerRouter.use(authenticate, authorize([Roles.OWNER]));
ownerRouter.get("/dashboard", ownerDashboardHandler);

export const adminStoreRoutes = adminRouter;
export const userStoreRoutes = userRouter;
export const ownerStoreRoutes = ownerRouter;
