import { Router } from "express";
import { authenticate, authorize } from "../../middleware/authGuard";
import { validateRequest } from "../../middleware/validateRequest";
import { submitRatingSchema } from "./ratings.schemas";
import { getMyRatingsHandler, submitRatingHandler } from "./ratings.controller";
import { Roles } from "../../types/roles";

const router = Router();

router.use(authenticate, authorize([Roles.USER]));
router.post("/", validateRequest(submitRatingSchema), submitRatingHandler);
router.get("/me", getMyRatingsHandler);

export const ratingRoutes = router;
