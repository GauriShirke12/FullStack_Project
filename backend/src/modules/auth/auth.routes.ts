import { Router } from "express";
import { authenticate } from "../../middleware/authGuard";
import { validateRequest } from "../../middleware/validateRequest";
import { loginSchema, refreshSchema, signUpSchema, updatePasswordSchema } from "./auth.schemas";
import { login, me, refresh, signUp, updatePassword } from "./auth.controller";

const router = Router();

router.post("/signup", validateRequest(signUpSchema), signUp);
router.post("/login", validateRequest(loginSchema), login);
router.post("/refresh", validateRequest(refreshSchema), refresh);
router.get("/me", authenticate, me);
router.patch("/password", authenticate, validateRequest(updatePasswordSchema), updatePassword);

export const authRoutes = router;
