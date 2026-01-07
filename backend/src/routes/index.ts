import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.routes";
import { adminUserRoutes } from "../modules/users/users.routes";
import { adminStoreRoutes, ownerStoreRoutes, userStoreRoutes } from "../modules/stores/stores.routes";
import { ratingRoutes } from "../modules/ratings/ratings.routes";
import { dashboardHandler } from "../modules/admin/admin.controller";
import { authenticate, authorize } from "../middleware/authGuard";
import { Roles } from "../types/roles";

const router = Router();

router.use("/auth", authRoutes);
router.get("/admin/dashboard", authenticate, authorize([Roles.ADMIN]), dashboardHandler);
router.use("/admin/users", adminUserRoutes);
router.use("/admin/stores", adminStoreRoutes);
router.use("/stores", userStoreRoutes);
router.use("/owner/stores", ownerStoreRoutes);
router.use("/ratings", ratingRoutes);

export const apiRouter = router;
