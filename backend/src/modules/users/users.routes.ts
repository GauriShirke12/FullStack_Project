import { Router } from "express";
import { authenticate, authorize } from "../../middleware/authGuard";
import { getUser, getUsers } from "./users.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { adminCreateUserSchema } from "../auth/auth.schemas";
import { createUserAsAdmin } from "../auth/auth.controller";
import { Roles } from "../../types/roles";

const router = Router();

router.use(authenticate, authorize([Roles.ADMIN]));

router.get("/", getUsers);
router.post("/", validateRequest(adminCreateUserSchema), createUserAsAdmin);
router.get("/:id", getUser);

export const adminUserRoutes = router;
